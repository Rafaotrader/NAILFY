"use client";
import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Phone, CheckCircle, DollarSign, X } from "lucide-react";
import { mockAppointments, mockClients } from "@/data/mockData";
import { formatCurrency, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import NewAppointmentModal from "./NewAppointmentModal";

const today = "2026-05-11";

const DAYS_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const MONTHS_PT = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export default function AgendaView() {
  const [selectedDate, setSelectedDate] = useState(today);
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date("2026-05-01"));

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

  const aptsForDate = mockAppointments.filter(a => a.date === selectedDate).sort((a, b) => a.time.localeCompare(b.time));
  const aptsThisMonth = mockAppointments.filter(a => a.date.startsWith(monthStr));

  function getDayDates() {
    const days: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }

  function getFullDate(day: number) {
    return `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function hasApts(day: number) {
    const dateStr = getFullDate(day);
    return aptsThisMonth.some(a => a.date === dateStr);
  }

  function getClientPhone(clientId: string) {
    const client = mockClients.find(c => c.id === clientId);
    return client?.phone || "";
  }

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Agenda</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-[#e91e8c] text-white px-3 py-2 rounded-xl text-sm font-medium active:scale-95 transition-transform">
          <Plus size={16} />
          Agendar
        </button>
      </div>

      {/* Calendar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="p-1 text-zinc-400 hover:text-white">
            <ChevronLeft size={18} />
          </button>
          <span className="font-semibold text-sm">{MONTHS_PT[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="p-1 text-zinc-400 hover:text-white">
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_PT.map(d => <p key={d} className="text-center text-zinc-500 text-xs">{d}</p>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {getDayDates().map((day, i) => {
            if (!day) return <div key={i} />;
            const dateStr = getFullDate(day);
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === today;
            const hasApt = hasApts(day);
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(dateStr)}
                className={cn(
                  "relative h-8 w-full rounded-lg text-sm font-medium transition-colors",
                  isSelected ? "bg-[#e91e8c] text-white" : isToday ? "border border-[#e91e8c] text-[#e91e8c]" : "text-zinc-300 hover:bg-zinc-800"
                )}
              >
                {day}
                {hasApt && !isSelected && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#e91e8c]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Appointments for selected date */}
      <div>
        <h2 className="font-semibold text-sm text-zinc-400 mb-3">
          {selectedDate === today ? "Hoje" : selectedDate.split("-").reverse().join("/")} — {aptsForDate.length} atendimento{aptsForDate.length !== 1 ? "s" : ""}
        </h2>
        {aptsForDate.length === 0 ? (
          <div className="text-center py-10 text-zinc-500">
            <p>Nenhum atendimento neste dia</p>
            <button onClick={() => setShowModal(true)} className="mt-3 text-[#e91e8c] text-sm">+ Adicionar agendamento</button>
          </div>
        ) : (
          <div className="space-y-3">
            {aptsForDate.map(apt => (
              <div key={apt.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{apt.clientName}</p>
                    <p className="text-zinc-400 text-sm">{apt.serviceName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">{formatCurrency(apt.value)}</p>
                    <p className="text-zinc-400 text-xs">{apt.time} • {apt.duration}min</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  <Badge label={apt.status} />
                  <Badge label={apt.paymentStatus} />
                  {apt.signalStatus !== "Não solicitado" && <Badge label={`Sinal: ${apt.signalStatus}`} />}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <a
                    href={`https://wa.me/55${getClientPhone(apt.clientId)}?text=${encodeURIComponent(`Oi ${apt.clientName.split(" ")[0]}! Passando para confirmar seu horário de ${apt.serviceName} às ${apt.time}. Confirma? 💅`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 bg-emerald-600 text-white text-xs px-2.5 py-1.5 rounded-xl"
                  >
                    <Phone size={12} /> WhatsApp
                  </a>
                  <button className="flex items-center gap-1 bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1.5 rounded-xl">
                    <CheckCircle size={12} /> Confirmar
                  </button>
                  <button className="flex items-center gap-1 bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1.5 rounded-xl">
                    <DollarSign size={12} /> Pago
                  </button>
                  <button className="flex items-center gap-1 bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1.5 rounded-xl">
                    <X size={12} /> Cancelar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && <NewAppointmentModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
