"use client";
import { Calendar, DollarSign, RefreshCw, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import { formatCurrency, daysSince } from "@/lib/utils";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import { useAppData } from "@/context/AppDataContext";

const today = "2026-05-11";

export default function Dashboard() {
  const { appointments, clients, transactions } = useAppData();
  const todayApts = appointments.filter(a => a.date === today);
  const todayRevenue = todayApts.reduce((sum, a) => sum + a.value, 0);
  const pendingPayments = appointments.filter(a => a.paymentStatus === "Pendente" && a.status !== "Cancelado").length;
  const clientsToCall = clients.filter(c => daysSince(c.lastVisit) >= 21 || (c.nextReturn && c.nextReturn <= today));
  const returnsNeeded = clientsToCall.length;
  const monthlyRevenue = transactions
    .filter(t => (t.type === "Entrada" || t.type === "Sinal" || t.type === "Pagamento recebido") && t.date.startsWith("2026-05"))
    .reduce((s, t) => s + t.value, 0);
  const completed = appointments.filter(a => a.status === "Concluido");
  const avgTicket = completed.length ? completed.reduce((sum, item) => sum + item.value, 0) / completed.length : 0;
  const monthAppointments = appointments.filter(item => item.date.startsWith("2026-05"));
  const returnRate = clients.length ? Math.round((clients.filter(client => client.visits > 1).length / clients.length) * 100) : 0;

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      <div>
        <p className="text-zinc-400 text-sm">Painel da Beatriz Nails</p>
        <h1 className="text-2xl font-bold">Hoje voce tem {todayApts.length} atendimentos e {formatCurrency(todayRevenue)} previstos.</h1>
        <p className="text-zinc-300 text-sm mt-1">
          Veja quem atender, quem chamar e quanto ainda tem para receber.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Calendar} label="Tenho hoje" value={todayApts.length} sub="atendimentos" />
        <StatCard icon={DollarSign} label="Previsto hoje" value={formatCurrency(todayRevenue)} sub="na agenda" color="text-emerald-400" />
        <StatCard icon={Clock} label="A receber" value={pendingPayments} sub="pagamentos" color="text-amber-400" />
        <StatCard icon={RefreshCw} label="Chamar hoje" value={returnsNeeded} sub="clientes" color="text-purple-400" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-center">
          <p className="text-[#e91e8c] font-bold text-lg">{formatCurrency(monthlyRevenue)}</p>
          <p className="text-zinc-400 text-xs">Receita do mes</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-center">
          <p className="text-[#e91e8c] font-bold text-lg">{formatCurrency(avgTicket)}</p>
          <p className="text-zinc-400 text-xs">Ticket medio</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-center">
          <p className="text-[#e91e8c] font-bold text-lg">{returnRate}%</p>
          <p className="text-zinc-400 text-xs">Taxa retorno</p>
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-center">
        <p className="text-[#e91e8c] font-bold text-lg">{monthAppointments.length}</p>
        <p className="text-zinc-400 text-xs">Atendimentos no mes</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white">Agenda de hoje</h2>
          <Link href="/agenda" className="text-[#e91e8c] text-xs">Ver tudo</Link>
        </div>
        <div className="space-y-2">
          {todayApts.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-6">Nenhum atendimento hoje</p>
          ) : (
            todayApts.map(apt => (
              <div key={apt.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-12 text-center">
                  <p className="text-[#e91e8c] font-bold text-base">{apt.time}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">{apt.clientName}</p>
                  <p className="text-zinc-400 text-xs truncate">{apt.serviceName}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{formatCurrency(apt.value)}</p>
                  <Badge label={apt.status} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-white">Clientes para chamar hoje</h2>
          <Link href="/clientes" className="text-[#e91e8c] text-xs">Ver todas</Link>
        </div>
        <div className="space-y-2">
          {clientsToCall
            .slice(0, 3)
            .map(client => (
              <div key={client.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e91e8c] to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {client.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-white truncate">{client.name}</p>
                  <p className="text-zinc-400 text-xs">{client.nextReturn && client.nextReturn <= today ? "Retorno vence hoje" : `${daysSince(client.lastVisit)} dias sem visita`}</p>
                </div>
                <a
                  href={`https://wa.me/55${client.phone}?text=${encodeURIComponent(`Oi ${client.name.split(" ")[0]}! Saudade de voce por aqui! Que tal renovar as unhas?`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-xl font-medium"
                >
                  <span className="inline-flex items-center gap-1"><MessageCircle size={12} /> Chamar</span>
                </a>
              </div>
            ))}
          {clientsToCall.length === 0 && <p className="text-zinc-500 text-sm text-center py-6">Nenhuma cliente pendente de retorno hoje</p>}
        </div>
      </div>
    </div>
  );
}
