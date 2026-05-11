export type ClientStatus = "Nova" | "Ativa" | "VIP" | "Lead" | "Sumida";

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  birthday?: string;
  status: ClientStatus;
  totalSpent: number;
  visits: number;
  lastVisit: string;
  nextReturn?: string;
  notes?: string;
  preferences?: string;
  allergies?: string;
  instagram?: string;
  avatar?: string;
}

export type AppointmentStatus = "Agendado" | "Confirmado" | "Concluido" | "Cancelado" | "Faltou" | "Pendente";
export type PaymentStatus = "Pago" | "Pendente";
export type SignalStatus = "Nao solicitado" | "Solicitado" | "Pago" | "Pendente";

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  value: number;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  signalStatus: SignalStatus;
  signalValue?: number;
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  estimatedCost: number;
  estimatedProfit: number;
  suggestedReturn: number;
  active: boolean;
}

export type TransactionType = "Entrada" | "Despesa" | "Sinal" | "Pagamento pendente" | "Pagamento recebido";
export type TransactionCategory = "Material" | "Aluguel/fixo" | "Marketing" | "Curso" | "Ferramenta" | "Servico" | "Outro";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  value: number;
  date: string;
  clientId?: string;
  clientName?: string;
  appointmentId?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: "un" | "ml" | "g" | "rolo";
  minStock: number;
  cost: number;
  supplier?: string;
}

export interface MessageFlow {
  id: string;
  name: string;
  description: string;
  icon: string;
  template: (data: { clientName?: string; date?: string; time?: string; service?: string; value?: string; days?: string }) => string;
}
