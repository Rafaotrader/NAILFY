"use client";
import { useState } from "react";
import { CalendarCheck, Bell, Heart, DollarSign, Star, Gift, MessageCircle, Sparkles, X, Copy, ExternalLink, LucideIcon } from "lucide-react";
import { messageFlows, mockClients } from "@/data/mockData";
import { openWhatsApp } from "@/lib/whatsapp";

const iconMap: Record<string, LucideIcon> = {
  CalendarCheck, Bell, Heart, DollarSign, Star, Gift, MessageCircle, Sparkles,
};

export default function MensagensView() {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState(mockClients[0]);
  const [copied, setCopied] = useState(false);

  const flow = messageFlows.find(m => m.id === selected);
  const message = flow
    ? flow.template({
        clientName: selectedClient.name.split(" ")[0],
        date: "11/05/2026",
        time: "09:00",
        service: "Gel alongamento",
        value: "50",
        days: "28",
      })
    : "";

  function handleCopy() {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-xl font-bold mb-1">Mensagens</h1>
      <p className="text-zinc-400 text-sm mb-4">Envie mensagens prontas para suas clientes via WhatsApp</p>

      {/* Client selector */}
      <div className="mb-4">
        <label className="text-xs text-zinc-400 mb-1.5 block">Para qual cliente?</label>
        <select
          value={selectedClient.id}
          onChange={e => setSelectedClient(mockClients.find(c => c.id === e.target.value) || mockClients[0])}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]"
        >
          {mockClients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Flow list */}
      <div className="space-y-2">
        {messageFlows.map(flow => {
          const Icon = iconMap[flow.icon] || MessageCircle;
          return (
            <button
              key={flow.id}
              onClick={() => setSelected(flow.id)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3 text-left active:scale-95 transition-transform hover:border-[#e91e8c]/40"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e91e8c]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-[#e91e8c]" />
              </div>
              <div>
                <p className="font-medium text-sm text-white">{flow.name}</p>
                <p className="text-zinc-400 text-xs">{flow.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Preview modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">{flow?.name}</h2>
              <button onClick={() => setSelected(null)}><X size={20} className="text-zinc-400" /></button>
            </div>
            <div className="bg-zinc-800 rounded-2xl p-4">
              <p className="text-sm text-zinc-100 leading-relaxed">{message}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 text-white py-3 rounded-xl text-sm font-medium"
              >
                <Copy size={16} /> {copied ? "Copiado!" : "Copiar"}
              </button>
              <button
                onClick={() => openWhatsApp(selectedClient.phone, message)}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl text-sm font-medium"
              >
                <ExternalLink size={16} /> Enviar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
