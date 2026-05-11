"use client";
import { FormEvent, useState } from "react";
import { Plus, AlertTriangle, Package, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useAppData } from "@/context/AppDataContext";
import type { Product } from "@/types";

export default function EstoqueView() {
  const { products, addProduct } = useAppData();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    category: "Material",
    quantity: 1,
    unit: "un",
    minStock: 1,
    cost: 0,
  });
  const lowStock = products.filter(p => p.quantity <= p.minStock);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) {
      setMessage("Informe o nome do produto.");
      return;
    }
    if (form.quantity < 0 || form.minStock < 0 || form.cost < 0) {
      setMessage("Use valores maiores ou iguais a zero.");
      return;
    }
    addProduct(form);
    setMessage("Produto cadastrado.");
    setForm({ name: "", category: "Material", quantity: 1, unit: "un", minStock: 1, cost: 0 });
    setShowModal(false);
  }

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Estoque</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-[#e91e8c] text-white px-3 py-2 rounded-xl text-sm font-medium">
          <Plus size={16} /> Produto
        </button>
      </div>

      {message && <p className="text-emerald-400 text-xs mb-3">{message}</p>}

      {lowStock.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 mb-4 flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />
          <p className="text-amber-300 text-sm">{lowStock.length} produto{lowStock.length > 1 ? "s" : ""} com estoque baixo</p>
        </div>
      )}

      <div className="space-y-2">
        {products.map(product => {
          const isLow = product.quantity <= product.minStock;
          return (
            <div key={product.id} className={cn("bg-zinc-900 border rounded-2xl p-4", isLow ? "border-amber-500/40" : "border-zinc-800")}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-zinc-400" />
                    <h3 className="font-medium text-sm">{product.name}</h3>
                    {isLow && <AlertTriangle size={13} className="text-amber-400" />}
                  </div>
                  <p className="text-zinc-500 text-xs mt-0.5">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className={cn("font-bold text-lg", isLow ? "text-amber-400" : "text-white")}>{product.quantity}</p>
                  <p className="text-zinc-500 text-xs">{product.unit}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Minimo: {product.minStock} {product.unit}</span>
                <span>Custo: {formatCurrency(product.cost)}</span>
              </div>
              {isLow && <div className="mt-2 text-xs text-amber-400 bg-amber-500/10 rounded-lg px-2.5 py-1.5">Repor estoque</div>}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <form onSubmit={handleSubmit} className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">Novo produto</h2>
              <button type="button" onClick={() => setShowModal(false)}><X size={20} className="text-zinc-400" /></button>
            </div>
            {message && <p className="text-amber-400 text-xs">{message}</p>}
            <input required placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
            <input placeholder="Categoria" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" min="0" value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value as Product["unit"] })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]">
                <option>un</option><option>ml</option><option>g</option><option>rolo</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" min="0" value={form.minStock} onChange={e => setForm({ ...form, minStock: Number(e.target.value) })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
              <input type="number" min="0" value={form.cost} onChange={e => setForm({ ...form, cost: Number(e.target.value) })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#e91e8c]" />
            </div>
            <button className="w-full bg-[#e91e8c] text-white py-3 rounded-xl font-semibold text-sm">Salvar produto</button>
          </form>
        </div>
      )}
    </div>
  );
}
