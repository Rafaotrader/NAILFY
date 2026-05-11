"use client";
import { useState } from "react";
import { Plus, Search, Users, Star, TrendingUp, RefreshCw, X } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate, daysSince } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import type { ClientStatus } from "@/types";
import { useAppData } from "@/context/AppDataContext";

const filters: { label: string; status?: ClientStatus }[] = [
  { label: "Todas" },
  { label: "VIP", status: "VIP" },
  { label: "Ativas", status: "Ativa" },
  { label: "Novas", status: "Nova" },
  { label: "Sumidas", status: "Sumida" },
  { label: "Leads", status: "Lead" },
];

export default function ClientesView() {
  const { clients, addClient } = useAppData();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", instagram: "", status: "Nova" as ClientStatus, preferences: "" });

  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const matchFilter = activeFilter === "Todas" || c.status === activeFilter || (activeFilter === "Ativas" && c.status === "Ativa");
    return matchSearch && matchFilter;
  });

  const stats = {
    total: clients.length,
    vip: clients.filter(c => c.status === "VIP").length,
    ativas: clients.filter(c => c.status === "Ativa").length,
    retorno: clients.filter(c => daysSince(c.lastVisit) >= 21).length,
  };

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Clientes</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-[#e91e8c] text-white px-3 py-2 rounded-xl text-sm font-medium">
          <Plus size={16} /> Cadastrar
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: "Total", value: stats.total, icon: Users },
          { label: "VIP", value: stats.vip, icon: Star },
          { label: "Ativas", value: stats.ativas, icon: TrendingUp },
          { label: "Retorno", value: stats.retorno, icon: RefreshCw },
        ].map(({ label, value }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-center">
            <p className="text-[#e91e8c] font-bold text-base">{value}</p>
            <p className="text-zinc-500 text-xs">{label}</p>
          </div>
        ))}
      </div>

      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#e91e8c]"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
        {filters.map(f => (
          <button
            key={f.label}
            onClick={() => setActiveFilter(f.label)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              activeFilter === f.label ? "bg-[#e91e8c] text-white" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(client => (
          <Link key={client.id} href={`/clientes/${client.id}`}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#e91e8c] to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {client.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-sm truncate">{client.name}</p>
                  <Badge label={client.status} />
                </div>
                <p className="text-zinc-400 text-xs">{client.visits} visitas - Ultima: {formatDate(client.lastVisit)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-white text-sm font-medium">{formatCurrency(client.totalSpent)}</p>
                {daysSince(client.lastVisit) >= 21 && (
                  <p className="text-orange-400 text-xs">{daysSince(client.lastVisit)}d sem visita</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <form
            onSubmit={event => {
              event.preventDefault();
              if (!form.name.trim() || !form.phone.trim()) return;
              addClient(form);
              setForm({ name: "", phone: "", email: "", instagram: "", status: "Nova", preferences: "" });
              setShowModal(false);
            }}
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">Nova cliente</h2>
              <button type="button" onClick={() => setShowModal(false)}><X size={20} className="text-zinc-400" /></button>
            </div>
            <div className="space-y-3">
              <input required placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              <input required placeholder="Telefone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              <input placeholder="E-mail" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              <input placeholder="Instagram" value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as ClientStatus })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
                <option>Nova</option><option>Ativa</option><option>VIP</option><option>Lead</option><option>Sumida</option>
              </select>
              <textarea rows={2} placeholder="Preferencias" value={form.preferences} onChange={e => setForm({ ...form, preferences: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c] resize-none" />
            </div>
            <button className="w-full bg-[#e91e8c] text-white py-3 rounded-xl font-semibold text-sm">Salvar cliente</button>
          </form>
        </div>
      )}
    </div>
  );
}
