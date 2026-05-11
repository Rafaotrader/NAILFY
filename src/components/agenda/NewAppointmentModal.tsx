"use client";
import { X } from "lucide-react";
import { mockClients, mockServices } from "@/data/mockData";

export default function NewAppointmentModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Novo agendamento</h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Cliente</label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
              <option value="">Selecione a cliente</option>
              {mockClients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Servico</label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
              <option value="">Selecione o servico</option>
              {mockServices.map(s => <option key={s.id} value={s.id}>{s.name} — R${s.price}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Data</label>
              <input type="date" defaultValue="2026-05-11" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Horario</label>
              <input type="time" defaultValue="09:00" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
            </div>
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Valor (R$)</label>
            <input type="number" placeholder="0,00" className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Sinal</label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
              <option>Nao solicitado</option>
              <option>Solicitado</option>
              <option>Pago</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-400 mb-1 block">Observacoes</label>
            <textarea rows={2} placeholder="Alguma observacao..." className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c] resize-none" />
          </div>
        </div>
        <button className="w-full bg-[#e91e8c] text-white py-3 rounded-xl font-semibold text-sm active:scale-95 transition-transform">
          Salvar agendamento
        </button>
      </div>
    </div>
  );
}
