"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { messageFlows, mockAppointments, mockClients, mockProducts, mockServices, mockTransactions } from "@/data/mockData";
import type { Appointment, AppointmentStatus, Client, PaymentStatus, Product, Service, Transaction } from "@/types";

interface AppDataState {
  clients: Client[];
  services: Service[];
  appointments: Appointment[];
  transactions: Transaction[];
  products: Product[];
  messages: typeof messageFlows;
}

interface AppDataContextValue extends AppDataState {
  addClient: (client: Omit<Client, "id" | "totalSpent" | "visits" | "lastVisit"> & Partial<Pick<Client, "totalSpent" | "visits" | "lastVisit">>) => Client;
  upsertService: (service: Omit<Service, "id" | "estimatedProfit" | "active"> & Partial<Pick<Service, "id" | "active">>) => Service;
  upsertAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (appointmentId: string, status: AppointmentStatus) => void;
  updatePaymentStatus: (appointmentId: string, paymentStatus: PaymentStatus) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => Transaction;
  addProduct: (product: Omit<Product, "id">) => Product;
  registerClientPayment: (clientId: string, value: number, description?: string) => void;
  resetDemoData: () => void;
}

const STORAGE_KEY = "nailfy.mvp.state";
const today = "2026-05-11";

const initialState: AppDataState = {
  clients: mockClients,
  services: mockServices,
  appointments: mockAppointments,
  transactions: mockTransactions,
  products: mockProducts,
  messages: messageFlows,
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function addDays(dateStr: string, days: number) {
  const date = new Date(`${dateStr}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function recalculateClient(client: Client, appointments: Appointment[]) {
  const completed = appointments
    .filter(item => item.clientId === client.id && item.status === "Concluido")
    .sort((a, b) => b.date.localeCompare(a.date));
  const totalSpent = completed
    .filter(item => item.paymentStatus === "Pago")
    .reduce((sum, item) => sum + item.value, 0);

  return {
    ...client,
    visits: completed.length,
    totalSpent,
    lastVisit: completed[0]?.date || client.lastVisit,
  };
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppDataState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setState({ ...initialState, ...JSON.parse(raw), messages: messageFlows });
      } catch {
        setState(initialState);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, messages: undefined }));
    }
  }, [hydrated, state]);

  function updateState(updater: (current: AppDataState) => AppDataState) {
    setState(current => updater(current));
  }

  const value = useMemo<AppDataContextValue>(() => ({
    ...state,
    addClient(input) {
      const client: Client = {
        id: makeId("client"),
        name: input.name,
        phone: input.phone,
        email: input.email,
        birthday: input.birthday,
        status: input.status || "Nova",
        totalSpent: input.totalSpent || 0,
        visits: input.visits || 0,
        lastVisit: input.lastVisit || today,
        nextReturn: input.nextReturn,
        preferences: input.preferences,
        allergies: input.allergies,
        instagram: input.instagram,
      };
      updateState(current => ({ ...current, clients: [client, ...current.clients] }));
      return client;
    },
    upsertService(input) {
      const service: Service = {
        id: input.id || makeId("service"),
        name: input.name,
        category: input.category,
        duration: Number(input.duration) || 60,
        price: Number(input.price) || 0,
        estimatedCost: Number(input.estimatedCost) || 0,
        estimatedProfit: (Number(input.price) || 0) - (Number(input.estimatedCost) || 0),
        suggestedReturn: Number(input.suggestedReturn) || 21,
        active: input.active ?? true,
      };
      updateState(current => ({
        ...current,
        services: current.services.some(item => item.id === service.id)
          ? current.services.map(item => item.id === service.id ? service : item)
          : [service, ...current.services],
      }));
      return service;
    },
    upsertAppointment(appointment) {
      updateState(current => ({
        ...current,
        appointments: current.appointments.some(item => item.id === appointment.id)
          ? current.appointments.map(item => item.id === appointment.id ? appointment : item)
          : [...current.appointments, appointment],
      }));
    },
    updateAppointmentStatus(appointmentId, status) {
      updateState(current => {
        const appointment = current.appointments.find(item => item.id === appointmentId);
        if (!appointment) return current;

        const updatedAppointment = { ...appointment, status };
        let nextAppointments = current.appointments.map(item => item.id === appointmentId ? updatedAppointment : item);
        let nextTransactions = current.transactions;
        let nextClients = current.clients;

        if (status === "Concluido") {
          const service = current.services.find(item => item.id === appointment.serviceId);
          const client = current.clients.find(item => item.id === appointment.clientId);
          if (service && client) {
            const returnDate = addDays(appointment.date, service.suggestedReturn);
            const alreadyHasReturn = nextAppointments.some(item => item.clientId === client.id && item.date === returnDate && item.status !== "Cancelado");
            if (!alreadyHasReturn) {
              nextAppointments = [...nextAppointments, {
                ...appointment,
                id: makeId("return"),
                date: returnDate,
                status: "Agendado",
                paymentStatus: "Pendente",
                signalStatus: "Nao solicitado",
                notes: "Retorno criado automaticamente",
              }];
            }
            nextClients = nextClients.map(item => item.id === client.id
              ? recalculateClient({ ...item, nextReturn: returnDate, status: "Ativa" }, nextAppointments)
              : item);
          }
          if (appointment.paymentStatus === "Pago" && !nextTransactions.some(item => item.appointmentId === appointment.id && item.type === "Pagamento recebido")) {
            nextTransactions = [...nextTransactions, {
              id: makeId("tx"),
              type: "Pagamento recebido",
              category: "Servico",
              description: `${appointment.serviceName} - ${appointment.clientName}`,
              value: appointment.value,
              date: appointment.date,
              clientId: appointment.clientId,
              clientName: appointment.clientName,
              appointmentId: appointment.id,
            }];
          }
        }

        return { ...current, appointments: nextAppointments, transactions: nextTransactions, clients: nextClients };
      });
    },
    updatePaymentStatus(appointmentId, paymentStatus) {
      updateState(current => {
        const appointment = current.appointments.find(item => item.id === appointmentId);
        if (!appointment) return current;
        const nextAppointment = { ...appointment, paymentStatus };
        let nextTransactions = current.transactions;
        if (paymentStatus === "Pago" && !nextTransactions.some(item => item.appointmentId === appointment.id && item.type === "Pagamento recebido")) {
          nextTransactions = [...nextTransactions, {
            id: makeId("tx"),
            type: "Pagamento recebido",
            category: "Servico",
            description: `${appointment.serviceName} - ${appointment.clientName}`,
            value: appointment.value,
            date: appointment.date,
            clientId: appointment.clientId,
            clientName: appointment.clientName,
            appointmentId: appointment.id,
          }];
        }
        const nextAppointments = current.appointments.map(item => item.id === appointmentId ? nextAppointment : item);
        const nextClients = current.clients.map(client => recalculateClient(client, nextAppointments));
        return { ...current, appointments: nextAppointments, transactions: nextTransactions, clients: nextClients };
      });
    },
    addTransaction(input) {
      const transaction = { ...input, id: makeId("tx") };
      updateState(current => ({ ...current, transactions: [transaction, ...current.transactions] }));
      return transaction;
    },
    addProduct(input) {
      const product = { ...input, id: makeId("product") };
      updateState(current => ({ ...current, products: [product, ...current.products] }));
      return product;
    },
    registerClientPayment(clientId, value, description = "Pagamento avulso") {
      const client = state.clients.find(item => item.id === clientId);
      if (!client) return;
      const tx: Transaction = {
        id: makeId("tx"),
        type: "Pagamento recebido",
        category: "Servico",
        description,
        value,
        date: today,
        clientId,
        clientName: client.name,
      };
      updateState(current => ({
        ...current,
        transactions: [tx, ...current.transactions],
        clients: current.clients.map(item => item.id === clientId ? { ...item, totalSpent: item.totalSpent + value } : item),
      }));
    },
    resetDemoData() {
      window.localStorage.removeItem(STORAGE_KEY);
      setState(initialState);
    },
  }), [state]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error("useAppData must be used inside AppDataProvider");
  return context;
}
