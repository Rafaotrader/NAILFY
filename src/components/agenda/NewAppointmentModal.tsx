"use client";
import { FormEvent, useMemo, useState } from "react";
import { X } from "lucide-react";
import { mockClients, mockServices } from "@/data/mockData";
import type { Appointment } from "@/types";

type AppointmentForm = Omit<Appointment, "id" | "clientName" | "serviceName" | "duration">;

interface NewAppointmentModalProps {
  appointment?: Appointment;
  defaultDate: string;
  onClose: () => void;
  onSave: (appointment: Appointment) => void;
}

export default function NewAppointmentModal({ appointment, defaultDate, onClose, onSave }: NewAppointmentModalProps) {
  const firstClient = mockClients[0];
  const firstService = mockServices[0];
  const [form, setForm] = useState<AppointmentForm>({
    clientId: appointment?.clientId || firstClient.id,
    serviceId: appointment?.serviceId || firstService.id,
    date: appointment?.date || defaultDate,
    time: appointment?.time || "09:00",
    value: appointment?.value || firstService.price,
    status: appointment?.status || "Agendado",
    paymentStatus: appointment?.paymentStatus || "Pendente",
    signalStatus: appointment?.signalStatus || "Nao solicitado",
    signalValue: appointment?.signalValue,
    notes: appointment?.notes || "",
  });

  const selectedService = useMemo(
    () => mockServices.find(service => service.id === form.serviceId) || firstService,
    [form.serviceId, firstService]
  );

  function update<K extends keyof AppointmentForm>(key: K, value: AppointmentForm[K]) {
    setForm(current => ({ ...current, [key]: value }));
  }

  function handleServiceChange(serviceId: string) {
    const service = mockServices.find(item => item.id === serviceId) || firstService;
    setForm(current => ({
      ...current,
      serviceId,
      value: service.price,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = mockClients.find(item => item.id === form.clientId) || firstClient;
    const service = mockServices.find(item => item.id === form.serviceId) || firstService;

    onSave({
      id: appointment?.id || `apt-${Date.now()}`,
      clientId: client.id,
      clientName: client.name,
      serviceId: service.id,
      serviceName: service.name,
      date: form.date,
      time: form.time,
      duration: service.duration,
      value: Number(form.value) || service.price,
      status: form.status,
      paymentStatus: form.paymentStatus,
      signalStatus: form.signalStatus,
      signalValue: form.signalValue ? Number(form.signalValue) : undefined,
      notes: form.notes,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">{appointment ? "Editar agendamento" : "Novo agendamento"}</h2>
          <button type="button" onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Cliente</label>
            <select value={form.clientId} onChange={event => update("clientId", event.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
              {mockClients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Servico</label>
            <select value={form.serviceId} onChange={event => handleServiceChange(event.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
              {mockServices.map(s => <option key={s.id} value={s.id}>{s.name} - R${s.price}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Data</label>
              <input type="date" value={form.date} onChange={event => update("date", event.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Horario</label>
              <input type="time" value={form.time} onChange={event => update("time", event.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
            </div>
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Valor (R$)</label>
            <input type="number" value={form.value} onChange={event => update("value", Number(event.target.value))} min="0" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Status</label>
              <select value={form.status} onChange={event => update("status", event.target.value as Appointment["status"])} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
                <option>Agendado</option>
                <option>Confirmado</option>
                <option>Concluido</option>
                <option>Cancelado</option>
                <option>Faltou</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Pagamento</label>
              <select value={form.paymentStatus} onChange={event => update("paymentStatus", event.target.value as Appointment["paymentStatus"])} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
                <option>Pendente</option>
                <option>Pago</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Sinal</label>
            <select value={form.signalStatus} onChange={event => update("signalStatus", event.target.value as Appointment["signalStatus"])} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
              <option>Nao solicitado</option>
              <option>Solicitado</option>
              <option>Pago</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Observacoes</label>
            <textarea rows={2} value={form.notes} onChange={event => update("notes", event.target.value)} placeholder={`Ex: ${selectedService.name} com preferencia da cliente`} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c] resize-none" />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#e91e8c] text-white py-3 rounded-xl font-semibold text-sm active:scale-95 transition-transform">
          Salvar agendamento
        </button>
      </form>
    </div>
  );
}
