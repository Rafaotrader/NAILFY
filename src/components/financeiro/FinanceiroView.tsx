"use client";
import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, Clock, DollarSign, X } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAppData } from "@/context/AppDataContext";
import type { TransactionCategory, TransactionType } from "@/types";

const today = "2026-05-11";

export default function FinanceiroView() {
  const { transactions, appointments, services, clients, addTransaction } = useAppData();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    type: "Entrada" as TransactionType,
    category: "Servico" as TransactionCategory,
    description: "",
    value: 0,
    date: today,
    clientId: "",
  });

  const monthTx = transactions.filter(t => t.date.startsWith("2026-05"));
  const monthRevenue = monthTx.filter(t => t.type === "Entrada" || t.type === "Sinal" || t.type === "Pagamento recebido").reduce((s, t) => s + t.value, 0);
  const monthExpenses = monthTx.filter(t => t.type === "Despesa").reduce((s, t) => s + t.value, 0);
  const pendingPayments = appointments.filter(a => a.paymentStatus === "Pendente" && a.status !== "Cancelado").reduce((s, a) => s + a.value, 0);
  const signals = monthTx.filter(t => t.type === "Sinal").reduce((s, t) => s + t.value, 0);
  const todayRevenue = transactions.filter(t => t.date === today && t.type !== "Despesa" && t.type !== "Pagamento pendente").reduce((s, t) => s + t.value, 0);
  const profit = monthRevenue - monthExpenses;
  const completedAppointments = appointments.filter(a => a.status === "Concluido");
  const averageTicket = completedAppointments.length
    ? completedAppointments.reduce((sum, item) => sum + item.value, 0) / completedAppointments.length
    : 0;
  const bestService = services.reduce((best, service) => {
    const currentCount = appointments.filter(item => item.serviceId === service.id).length;
    const bestCount = appointments.filter(item => item.serviceId === best.id).length;
    return currentCount > bestCount ? service : best;
  }, services[0]);
  const topClient = [...clients].sort((a, b) => b.totalSpent - a.totalSpent)[0];

  const transactionIcons: Record<string, React.ReactNode> = {
    Entrada: <TrendingUp size={14} className="text-emerald-400" />,
    Despesa: <TrendingDown size={14} className="text-red-400" />,
    Sinal: <DollarSign size={14} className="text-amber-400" />,
    "Pagamento recebido": <TrendingUp size={14} className="text-emerald-400" />,
    "Pagamento pendente": <Clock size={14} className="text-yellow-400" />,
  };

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Financeiro</h1>
          <p className="text-zinc-400 text-sm">Uma visao simples do dinheiro que entra e sai do studio.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-[#e91e8c] text-white px-3 py-2 rounded-xl text-sm font-medium">
          <Plus size={16} /> Lancamento
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs mb-1">Receita do mes</p>
          <p className="text-emerald-400 font-bold text-xl">{formatCurrency(monthRevenue)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs mb-1">Despesas do mes</p>
          <p className="text-red-400 font-bold text-xl">{formatCurrency(monthExpenses)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs mb-1">Pendentes</p>
          <p className="text-amber-400 font-bold text-xl">{formatCurrency(pendingPayments)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs mb-1">Sinais</p>
          <p className="text-[#c084fc] font-bold text-xl">{formatCurrency(signals)}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#e91e8c]/20 to-purple-900/20 border border-[#e91e8c]/30 rounded-2xl p-4 mb-4">
        <p className="text-zinc-300 text-sm">Lucro estimado do mes</p>
        <p className="text-white font-bold text-2xl mt-0.5">{formatCurrency(profit)}</p>
        <p className="text-zinc-400 text-xs mt-1">Lucro estimado considera receitas e despesas cadastradas.</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
          <p className="text-[#e91e8c] font-bold">{formatCurrency(todayRevenue)}</p>
          <p className="text-zinc-500 text-xs">Hoje</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
          <p className="text-[#e91e8c] font-bold">{formatCurrency(averageTicket)}</p>
          <p className="text-zinc-500 text-xs">Ticket medio</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center">
          <p className="text-[#e91e8c] font-bold truncate">{bestService.category}</p>
          <p className="text-zinc-500 text-xs">Melhor servico</p>
        </div>
      </div>

      {topClient && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 mb-4">
          <p className="text-zinc-500 text-xs">Cliente que mais comprou</p>
          <p className="text-white font-semibold">{topClient.name}</p>
          <p className="text-[#e91e8c] text-sm">{formatCurrency(topClient.totalSpent)}</p>
        </div>
      )}

      <h2 className="font-semibold text-sm mb-3">Lancamentos recentes</h2>
      <div className="space-y-2">
        {transactions.map(tx => (
          <div key={tx.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
              {transactionIcons[tx.type] || <DollarSign size={14} className="text-zinc-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{tx.description}</p>
              <p className="text-zinc-500 text-xs">{tx.category} - {formatDate(tx.date)}</p>
            </div>
            <p className={`font-semibold text-sm flex-shrink-0 ${tx.type === "Despesa" ? "text-red-400" : "text-emerald-400"}`}>
              {tx.type === "Despesa" ? "-" : "+"}{formatCurrency(tx.value)}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <form
            onSubmit={event => {
              event.preventDefault();
              if (!form.description.trim()) {
                setMessage("Informe a descricao do lancamento.");
                return;
              }
              if (Number(form.value) <= 0) {
                setMessage("Informe um valor maior que zero.");
                return;
              }
              const client = clients.find(item => item.id === form.clientId);
              addTransaction({
                type: form.type,
                category: form.category,
                description: form.description || form.type,
                value: Number(form.value) || 0,
                date: form.date,
                clientId: client?.id,
                clientName: client?.name,
              });
              setMessage("Lancamento salvo.");
              setShowModal(false);
            }}
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">Novo lancamento</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-zinc-400" /></button>
            </div>
            <div className="space-y-3">
              {message && <p className="text-amber-400 text-xs">{message}</p>}
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Tipo</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as TransactionType })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
                  <option>Entrada</option>
                  <option>Despesa</option>
                  <option>Sinal</option>
                  <option>Pagamento recebido</option>
                  <option>Pagamento pendente</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Categoria</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as TransactionCategory })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
                  <option>Material</option><option>Aluguel/fixo</option><option>Marketing</option>
                  <option>Curso</option><option>Ferramenta</option><option>Servico</option><option>Outro</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Descricao</label>
                <input type="text" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Ex: Gel UV Rosa Nude" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Valor (R$)</label>
                <input type="number" value={form.value} onChange={e => setForm({ ...form, value: Number(e.target.value) })} placeholder="0,00" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Cliente</label>
                <select value={form.clientId} onChange={e => setForm({ ...form, clientId: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
                  <option value="">Sem cliente</option>
                  {clients.map(client => <option key={client.id} value={client.id}>{client.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Data</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              </div>
            </div>
            <button className="w-full bg-[#e91e8c] text-white py-3 rounded-xl font-semibold text-sm">
              Salvar lancamento
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
