"use client";
import { useState } from "react";
import { Plus, TrendingUp, TrendingDown, Clock, DollarSign, X } from "lucide-react";
import { mockTransactions, mockAppointments, mockServices } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

const today = "2026-05-11";

export default function FinanceiroView() {
  const [showModal, setShowModal] = useState(false);

  const monthTx = mockTransactions.filter(t => t.date.startsWith("2026-05"));
  const monthRevenue = monthTx.filter(t => t.type === "Entrada" || t.type === "Sinal" || t.type === "Pagamento recebido").reduce((s, t) => s + t.value, 0);
  const monthExpenses = monthTx.filter(t => t.type === "Despesa").reduce((s, t) => s + t.value, 0);
  const pendingPayments = mockAppointments.filter(a => a.paymentStatus === "Pendente" && a.status === "Concluido").reduce((s, a) => s + a.value, 0);
  const signals = monthTx.filter(t => t.type === "Sinal").reduce((s, t) => s + t.value, 0);
  const todayRevenue = mockAppointments.filter(a => a.date === today && a.status === "Concluido").reduce((s, a) => s + a.value, 0);
  const profit = monthRevenue - monthExpenses;
  const completedAppointments = mockAppointments.filter(a => a.status === "Concluido");
  const averageTicket = completedAppointments.length
    ? completedAppointments.reduce((sum, item) => sum + item.value, 0) / completedAppointments.length
    : 0;
  const bestService = mockServices.reduce((best, service) => {
    const currentCount = mockAppointments.filter(item => item.serviceId === service.id).length;
    const bestCount = mockAppointments.filter(item => item.serviceId === best.id).length;
    return currentCount > bestCount ? service : best;
  }, mockServices[0]);

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
        <h1 className="text-xl font-bold">Financeiro</h1>
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
          <p className="text-zinc-400 text-xs mb-1">Pendentes a receber</p>
          <p className="text-amber-400 font-bold text-xl">{formatCurrency(pendingPayments)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs mb-1">Sinais recebidos</p>
          <p className="text-[#c084fc] font-bold text-xl">{formatCurrency(signals)}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#e91e8c]/20 to-purple-900/20 border border-[#e91e8c]/30 rounded-2xl p-4 mb-4">
        <p className="text-zinc-300 text-sm">Lucro estimado do mes</p>
        <p className="text-white font-bold text-2xl mt-0.5">{formatCurrency(profit)}</p>
        <p className="text-zinc-400 text-xs mt-1">Receita menos despesas</p>
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

      <h2 className="font-semibold text-sm mb-3">Lancamentos recentes</h2>
      <div className="space-y-2">
        {mockTransactions.map(tx => (
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
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">Novo lancamento</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-zinc-400" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Tipo</label>
                <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
                  <option>Entrada</option>
                  <option>Despesa</option>
                  <option>Sinal</option>
                  <option>Pagamento recebido</option>
                  <option>Pagamento pendente</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Categoria</label>
                <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
                  <option>Material</option><option>Aluguel/fixo</option><option>Marketing</option>
                  <option>Curso</option><option>Ferramenta</option><option>Servico</option><option>Outro</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Descricao</label>
                <input type="text" placeholder="Ex: Gel UV Rosa Nude" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Valor (R$)</label>
                <input type="number" placeholder="0,00" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              </div>
            </div>
            <button className="w-full bg-[#e91e8c] text-white py-3 rounded-xl font-semibold text-sm">
              Salvar lancamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
