"use client";
import { ArrowLeft, Phone, Calendar, DollarSign, Star, Clock, MessageCircle, Edit, Plus } from "lucide-react";
import Link from "next/link";
import { mockClients, mockAppointments } from "@/data/mockData";
import { formatCurrency, formatDate, daysSince } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { openWhatsApp } from "@/lib/whatsapp";

export default function ClientProfile({ clientId }: { clientId: string }) {
  const client = mockClients.find(c => c.id === clientId);
  if (!client) return <div className="p-6 text-zinc-400">Cliente nao encontrada</div>;

  const history = mockAppointments.filter(a => a.clientId === clientId).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/clientes" className="p-2 text-zinc-400 hover:text-white -ml-2">
            <ArrowLeft size={20} />
          </Link>
          <span className="text-zinc-400 text-sm">Perfil da cliente</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e91e8c] to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
            {client.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold">{client.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge label={client.status} />
              {client.instagram && <span className="text-zinc-400 text-xs">{client.instagram}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 px-4 py-4 border-b border-zinc-800">
        <div className="text-center">
          <p className="text-[#e91e8c] font-bold text-lg">{formatCurrency(client.totalSpent)}</p>
          <p className="text-zinc-400 text-xs">Total gasto</p>
        </div>
        <div className="text-center">
          <p className="text-[#e91e8c] font-bold text-lg">{client.visits}</p>
          <p className="text-zinc-400 text-xs">Visitas</p>
        </div>
        <div className="text-center">
          <p className="text-[#e91e8c] font-bold text-lg">{daysSince(client.lastVisit)}d</p>
          <p className="text-zinc-400 text-xs">Ultima visita</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 px-4 py-4 border-b border-zinc-800">
        <button
          onClick={() => openWhatsApp(client.phone, `Oi ${client.name.split(" ")[0]}! Tudo bem?`)}
          className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl text-sm font-medium"
        >
          <Phone size={16} /> Chamar no WhatsApp
        </button>
        <Link href="/agenda" className="flex items-center justify-center gap-2 bg-[#e91e8c] text-white py-3 rounded-xl text-sm font-medium">
          <Calendar size={16} /> Agendar retorno
        </Link>
      </div>

      {/* Info */}
      <div className="px-4 py-4 space-y-4 border-b border-zinc-800">
        <h2 className="font-semibold text-sm">Informacoes</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Telefone</span>
            <span className="text-white">{client.phone}</span>
          </div>
          {client.email && (
            <div className="flex justify-between">
              <span className="text-zinc-400">E-mail</span>
              <span className="text-white">{client.email}</span>
            </div>
          )}
          {client.birthday && (
            <div className="flex justify-between">
              <span className="text-zinc-400">Aniversario</span>
              <span className="text-white">{formatDate(client.birthday)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-zinc-400">Ultima visita</span>
            <span className="text-white">{formatDate(client.lastVisit)}</span>
          </div>
          {client.nextReturn && (
            <div className="flex justify-between">
              <span className="text-zinc-400">Proximo retorno</span>
              <span className="text-[#e91e8c]">{formatDate(client.nextReturn)}</span>
            </div>
          )}
        </div>
        {client.preferences && (
          <div>
            <p className="text-zinc-400 text-xs mb-1">Preferencias</p>
            <p className="text-zinc-200 text-sm bg-zinc-800 rounded-xl p-3">{client.preferences}</p>
          </div>
        )}
        {client.allergies && (
          <div>
            <p className="text-zinc-400 text-xs mb-1">Alergias</p>
            <p className="text-zinc-200 text-sm bg-red-950 border border-red-900 rounded-xl p-3">{client.allergies}</p>
          </div>
        )}
      </div>

      {/* History */}
      <div className="px-4 py-4">
        <h2 className="font-semibold text-sm mb-3">Historico de atendimentos</h2>
        {history.length === 0 ? (
          <p className="text-zinc-500 text-sm">Nenhum atendimento registrado</p>
        ) : (
          <div className="space-y-2">
            {history.map(apt => (
              <div key={apt.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{apt.serviceName}</p>
                  <p className="text-zinc-400 text-xs">{formatDate(apt.date)} as {apt.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{formatCurrency(apt.value)}</p>
                  <Badge label={apt.paymentStatus} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
