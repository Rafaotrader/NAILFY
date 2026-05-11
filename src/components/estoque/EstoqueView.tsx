"use client";
import { Plus, AlertTriangle, Package } from "lucide-react";
import { mockProducts } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function EstoqueView() {
  const lowStock = mockProducts.filter(p => p.quantity <= p.minStock);

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Estoque</h1>
        <button className="flex items-center gap-1.5 bg-[#e91e8c] text-white px-3 py-2 rounded-xl text-sm font-medium">
          <Plus size={16} /> Produto
        </button>
      </div>

      {lowStock.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 mb-4 flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />
          <p className="text-amber-300 text-sm">{lowStock.length} produto{lowStock.length > 1 ? "s" : ""} com estoque baixo</p>
        </div>
      )}

      <div className="space-y-2">
        {mockProducts.map(product => {
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
                  <p className={cn("font-bold text-lg", isLow ? "text-amber-400" : "text-white")}>
                    {product.quantity}
                  </p>
                  <p className="text-zinc-500 text-xs">{product.unit}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Minimo: {product.minStock} {product.unit}</span>
                <span>Custo: {formatCurrency(product.cost)}</span>
              </div>
              {isLow && (
                <div className="mt-2 text-xs text-amber-400 bg-amber-500/10 rounded-lg px-2.5 py-1.5">
                  Repor estoque
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
