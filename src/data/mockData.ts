import { Client, Appointment, Service, Transaction, Product, MessageFlow } from "@/types";

export const mockClients: Client[] = [
  {
    id: "c1",
    name: "Juliana Souza",
    phone: "11999990001",
    email: "juliana@email.com",
    birthday: "1995-03-15",
    status: "VIP",
    totalSpent: 1850,
    visits: 18,
    lastVisit: "2026-04-28",
    nextReturn: "2026-05-26",
    preferences: "Prefere gel transparente, nao gosta de muito comprimento",
    allergies: "Sensivel a acetona",
    instagram: "@julianasouza",
  },
  {
    id: "c2",
    name: "Mariana Lima",
    phone: "11999990002",
    email: "mariana@email.com",
    birthday: "1998-07-22",
    status: "Ativa",
    totalSpent: 720,
    visits: 7,
    lastVisit: "2026-05-05",
    nextReturn: "2026-06-02",
    preferences: "Gosta de nail art floral",
    allergies: "",
    instagram: "@marianalima",
  },
  {
    id: "c3",
    name: "Ana Paula",
    phone: "11999990003",
    email: "anapaula@email.com",
    birthday: "1990-12-01",
    status: "Sumida",
    totalSpent: 450,
    visits: 4,
    lastVisit: "2026-02-10",
    preferences: "Esmaltacao simples, cores neutras",
    allergies: "",
  },
  {
    id: "c4",
    name: "Fernanda Costa",
    phone: "11999990004",
    email: "fernanda@email.com",
    birthday: "2000-05-18",
    status: "Nova",
    totalSpent: 120,
    visits: 1,
    lastVisit: "2026-05-08",
    nextReturn: "2026-06-05",
    preferences: "",
    allergies: "",
  },
  {
    id: "c5",
    name: "Bianca Rocha",
    phone: "11999990005",
    email: "bianca@email.com",
    birthday: "1993-09-30",
    status: "VIP",
    totalSpent: 2200,
    visits: 22,
    lastVisit: "2026-05-03",
    nextReturn: "2026-05-31",
    preferences: "Nail art elaborada, gosta de pedrinhas e cromado",
    allergies: "",
    instagram: "@biancarocha",
  },
  {
    id: "c6",
    name: "Camila Torres",
    phone: "11999990006",
    email: "camila@email.com",
    birthday: "1997-01-25",
    status: "Ativa",
    totalSpent: 680,
    visits: 6,
    lastVisit: "2026-04-15",
    nextReturn: "2026-05-13",
    preferences: "Prefere gel nude",
    allergies: "",
  },
];

export const mockServices: Service[] = [
  { id: "s1", name: "Gel alongamento", category: "Gel", duration: 120, price: 180, estimatedCost: 40, estimatedProfit: 140, suggestedReturn: 21, active: true },
  { id: "s2", name: "Nail art", category: "Arte", duration: 90, price: 150, estimatedCost: 30, estimatedProfit: 120, suggestedReturn: 28, active: true },
  { id: "s3", name: "Esmaltacao simples", category: "Esmaltacao", duration: 45, price: 60, estimatedCost: 10, estimatedProfit: 50, suggestedReturn: 14, active: true },
  { id: "s4", name: "Manutencao gel", category: "Gel", duration: 60, price: 120, estimatedCost: 25, estimatedProfit: 95, suggestedReturn: 21, active: true },
  { id: "s5", name: "Banho de gel", category: "Gel", duration: 75, price: 140, estimatedCost: 35, estimatedProfit: 105, suggestedReturn: 21, active: true },
  { id: "s6", name: "Fibra de vidro", category: "Fibra", duration: 105, price: 160, estimatedCost: 45, estimatedProfit: 115, suggestedReturn: 21, active: true },
];

const today = "2026-05-11";

export const mockAppointments: Appointment[] = [
  { id: "a1", clientId: "c1", clientName: "Juliana Souza", serviceId: "s1", serviceName: "Gel alongamento", date: today, time: "09:00", duration: 120, value: 180, status: "Confirmado", paymentStatus: "Pendente", signalStatus: "Pago", signalValue: 50 },
  { id: "a2", clientId: "c2", clientName: "Mariana Lima", serviceId: "s2", serviceName: "Nail art", date: today, time: "11:00", duration: 90, value: 150, status: "Agendado", paymentStatus: "Pendente", signalStatus: "Nao solicitado" },
  { id: "a3", clientId: "c5", clientName: "Bianca Rocha", serviceId: "s4", serviceName: "Manutencao gel", date: today, time: "14:00", duration: 60, value: 120, status: "Agendado", paymentStatus: "Pendente", signalStatus: "Nao solicitado" },
  { id: "a4", clientId: "c4", clientName: "Fernanda Costa", serviceId: "s3", serviceName: "Esmaltacao simples", date: today, time: "16:00", duration: 45, value: 60, status: "Agendado", paymentStatus: "Pendente", signalStatus: "Nao solicitado" },
  { id: "a5", clientId: "c6", clientName: "Camila Torres", serviceId: "s5", serviceName: "Banho de gel", date: "2026-05-12", time: "10:00", duration: 75, value: 140, status: "Agendado", paymentStatus: "Pendente", signalStatus: "Solicitado" },
  { id: "a6", clientId: "c1", clientName: "Juliana Souza", serviceId: "s4", serviceName: "Manutencao gel", date: "2026-05-13", time: "09:00", duration: 60, value: 120, status: "Agendado", paymentStatus: "Pendente", signalStatus: "Nao solicitado" },
  { id: "a7", clientId: "c2", clientName: "Mariana Lima", serviceId: "s1", serviceName: "Gel alongamento", date: "2026-05-08", time: "10:00", duration: 120, value: 180, status: "Concluido", paymentStatus: "Pago", signalStatus: "Pago", signalValue: 50 },
  { id: "a8", clientId: "c5", clientName: "Bianca Rocha", serviceId: "s2", serviceName: "Nail art", date: "2026-05-07", time: "14:00", duration: 90, value: 150, status: "Concluido", paymentStatus: "Pendente", signalStatus: "Pago", signalValue: 50 },
];

export const mockTransactions: Transaction[] = [
  { id: "t1", type: "Entrada", category: "Servico", description: "Gel alongamento - Mariana Lima", value: 180, date: "2026-05-08", clientId: "c2", clientName: "Mariana Lima" },
  { id: "t2", type: "Despesa", category: "Material", description: "Gel UV Rosa Nude 30ml", value: 85, date: "2026-05-07" },
  { id: "t3", type: "Sinal", category: "Servico", description: "Sinal - Juliana Souza (Gel alongamento)", value: 50, date: "2026-05-06", clientId: "c1", clientName: "Juliana Souza" },
  { id: "t4", type: "Despesa", category: "Marketing", description: "Impulsionamento Instagram", value: 60, date: "2026-05-05" },
  { id: "t5", type: "Entrada", category: "Servico", description: "Nail art - Bianca Rocha", value: 150, date: "2026-05-03", clientId: "c5", clientName: "Bianca Rocha" },
  { id: "t6", type: "Despesa", category: "Aluguel/fixo", description: "Aluguel do espaco", value: 600, date: "2026-05-01" },
];

export const mockProducts: Product[] = [
  { id: "p1", name: "Esmalte Vermelho", category: "Esmalte", quantity: 8, unit: "un", minStock: 3, cost: 12 },
  { id: "p2", name: "Gel UV Rosa Nude 30ml", category: "Gel", quantity: 1, unit: "un", minStock: 2, cost: 85 },
  { id: "p3", name: "Base Coat", category: "Base", quantity: 5, unit: "un", minStock: 2, cost: 22 },
  { id: "p4", name: "Po Acrilico Natural", category: "Acrilico", quantity: 3, unit: "g", minStock: 10, cost: 45 },
  { id: "p5", name: "Fibra de Vidro", category: "Fibra", quantity: 2, unit: "rolo", minStock: 1, cost: 35 },
  { id: "p6", name: "Primer", category: "Base", quantity: 4, unit: "un", minStock: 2, cost: 28 },
];

export const messageFlows: MessageFlow[] = [
  {
    id: "m1",
    name: "Confirmacao de horario",
    description: "Confirmar agendamento com a cliente",
    icon: "CalendarCheck",
    template: ({ clientName, date, time, service }) =>
      `Oi ${clientName || "linda"}! Tudo bem? Passando para confirmar seu horario de ${service || "atendimento"} no dia ${date || "..."} as ${time || "..."}. Confirma?`,
  },
  {
    id: "m2",
    name: "Lembrete de manutencao",
    description: "Avisar que esta na hora de fazer a manutencao",
    icon: "Bell",
    template: ({ clientName, days }) =>
      `Oi ${clientName || "linda"}! Ja faz ${days || "21"} dias desde o seu ultimo atendimento. Esta na hora de fazer a manutencao das unhas! Quer agendar?`,
  },
  {
    id: "m3",
    name: "Saudade de voce",
    description: "Reativar cliente sumida",
    icon: "Heart",
    template: ({ clientName }) =>
      `Oi ${clientName || "linda"}! Saudade de voce por aqui! Que tal renovar as unhas? Tenho horarios disponiveis essa semana. Me chama!`,
  },
  {
    id: "m4",
    name: "Cobranca de sinal",
    description: "Solicitar pagamento do sinal para garantir o horario",
    icon: "DollarSign",
    template: ({ clientName, value, date }) =>
      `Oi ${clientName || "linda"}! Para garantir seu horario no dia ${date || "..."}, preciso do sinal de R$${value || "50,00"}. Pode ser via Pix! Chave: tradegenteboa@gmail.com`,
  },
  {
    id: "m5",
    name: "Agradecimento pos-atendimento",
    description: "Mensagem de carinho apos o atendimento",
    icon: "Star",
    template: ({ clientName }) =>
      `${clientName || "Linda"}, foi um prazer te atender! Espero que tenha amado suas unhas. Quando quiser, me chama. Qualquer duvida, estou aqui!`,
  },
  {
    id: "m6",
    name: "Feliz aniversario",
    description: "Parabenizar a cliente no dia do aniversario",
    icon: "Gift",
    template: ({ clientName }) =>
      `Feliz aniversario, ${clientName || "linda"}! Que seu dia seja incrivel! Como presente, tenho um desconto especial esperando por voce. Me chama e aproveita!`,
  },
  {
    id: "m7",
    name: "Follow-up de orcamento",
    description: "Retomar contato apos envio de orcamento",
    icon: "MessageCircle",
    template: ({ clientName, service }) =>
      `Oi ${clientName || "linda"}! Passando para ver se ficou alguma duvida sobre o orcamento de ${service || "nail art"} que te mandei. Quer agendar?`,
  },
  {
    id: "m8",
    name: "Oferta especial",
    description: "Divulgar promocao ou novidade",
    icon: "Sparkles",
    template: ({ clientName, service, value }) =>
      `Oi ${clientName || "linda"}! Tenho uma novidade: ${service || "nail art"} com condicao especial por R$${value || "..."} essa semana. Aproveita! Me chama`,
  },
];
