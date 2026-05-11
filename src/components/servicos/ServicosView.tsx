"use client";
import { Plus, Clock, DollarSign, TrendingUp, RefreshCw } from "lucide-react";
import { mockServices } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  Gel: "bg-[#e91e8c]/10 text-[#e91e8c]",
  Arte: "bg-purple-500/10 text-purple-400",
  Esmaltacao: "bg-blue-500/10 text-blue-400",
  Fibra: "bg-amber-500/10 text-amber-400",
};

export default function ServicosView() {
  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Servicos</h1>
        <button className="flex items-center gap-1.5 bg-[#e91e8c] text-white px-3 py-2 rounded-xl text-sm font-medium">
          <Plus size={16} /> Cadastrar
        </button>
      </div>

      <div className="space-y-3">
        {mockServices.map(service => (
          <div key={service.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <span className={`inline-block text-xs px-2 py-0.5 rounded-lg mt-1 ${categoryColors[service.category] || "bg-zinc-700 text-zinc-300"}`}>
                  {service.category}
                </span>
              </div>
              <p className="text-[#e91e8c] font-bold text-lg">{formatCurrency(service.price)}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Clock size={12} /> {service.duration}min
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <DollarSign size={12} /> Custo: {formatCurrency(service.estimatedCost)}
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <TrendingUp size={12} /> {formatCurrency(service.estimatedProfit)}
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
              <RefreshCw size={12} /> Retorno sugerido: {service.suggestedReturn} dias
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
