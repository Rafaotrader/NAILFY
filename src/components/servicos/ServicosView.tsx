"use client";
import { FormEvent, useState } from "react";
import { Plus, Clock, DollarSign, TrendingUp, RefreshCw, Pencil, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useAppData } from "@/context/AppDataContext";
import type { Service } from "@/types";

const categoryColors: Record<string, string> = {
  Gel: "bg-[#e91e8c]/10 text-[#e91e8c]",
  Arte: "bg-purple-500/10 text-purple-400",
  Esmaltacao: "bg-blue-500/10 text-blue-400",
  Fibra: "bg-amber-500/10 text-amber-400",
};

const emptyForm = { name: "", category: "Gel", duration: 60, price: 120, estimatedCost: 30, suggestedReturn: 21 };

export default function ServicosView() {
  const { services, upsertService } = useAppData();
  const [editing, setEditing] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(emptyForm);

  function openModal(service?: Service) {
    if (service) {
      setEditing(service);
      setForm({
        name: service.name,
        category: service.category,
        duration: service.duration,
        price: service.price,
        estimatedCost: service.estimatedCost,
        suggestedReturn: service.suggestedReturn,
      });
    } else {
      setEditing(null);
      setForm(emptyForm);
    }
    setShowModal(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) {
      setMessage("Informe o nome do servico.");
      return;
    }
    if (form.price < 0 || form.estimatedCost < 0 || form.duration <= 0 || form.suggestedReturn <= 0) {
      setMessage("Revise preco, custo, duracao e retorno.");
      return;
    }
    upsertService({ ...form, id: editing?.id, active: editing?.active ?? true });
    setMessage(editing ? "Servico atualizado." : "Servico cadastrado.");
    setShowModal(false);
    setEditing(null);
  }

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Servicos</h1>
        <button onClick={() => openModal()} className="flex items-center gap-1.5 bg-[#e91e8c] text-white px-3 py-2 rounded-xl text-sm font-medium">
          <Plus size={16} /> Cadastrar
        </button>
      </div>

      <div className="space-y-3">
        {services.map(service => (
          <div key={service.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-3 gap-3">
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <span className={`inline-block text-xs px-2 py-0.5 rounded-lg mt-1 ${categoryColors[service.category] || "bg-zinc-700 text-zinc-300"}`}>
                  {service.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[#e91e8c] font-bold text-lg">{formatCurrency(service.price)}</p>
                <button onClick={() => openModal(service)} className="inline-flex items-center gap-1 text-xs text-zinc-400">
                  <Pencil size={12} /> Editar
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Clock size={12} /> {service.duration}min
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <DollarSign size={12} /> Custo: {formatCurrency(service.estimatedCost)}
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <TrendingUp size={12} /> {formatCurrency(service.price - service.estimatedCost)}
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
              <RefreshCw size={12} /> Retorno sugerido: {service.suggestedReturn} dias
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <form onSubmit={handleSubmit} className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">{editing ? "Editar servico" : "Novo servico"}</h2>
              <button type="button" onClick={() => setShowModal(false)}><X size={20} className="text-zinc-400" /></button>
            </div>
            <div className="space-y-3">
              {message && <p className="text-amber-400 text-xs">{message}</p>}
              <input required placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              <input placeholder="Categoria" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" min="1" placeholder="Duracao" value={form.duration} onChange={e => setForm({ ...form, duration: Number(e.target.value) })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
                <input type="number" min="0" placeholder="Retorno" value={form.suggestedReturn} onChange={e => setForm({ ...form, suggestedReturn: Number(e.target.value) })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" min="0" placeholder="Preco" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
                <input type="number" min="0" placeholder="Custo" value={form.estimatedCost} onChange={e => setForm({ ...form, estimatedCost: Number(e.target.value) })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              </div>
              <p className="text-emerald-400 text-sm">Lucro estimado: {formatCurrency(form.price - form.estimatedCost)}</p>
            </div>
            <button className="w-full bg-[#e91e8c] text-white py-3 rounded-xl font-semibold text-sm">Salvar servico</button>
          </form>
        </div>
      )}
    </div>
  );
}
