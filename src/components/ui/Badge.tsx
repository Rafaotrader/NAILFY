import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  VIP: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  Nova: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  Ativa: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Lead: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  Sumida: "bg-zinc-700 text-zinc-400 border border-zinc-600",
  Confirmado: "bg-emerald-500/20 text-emerald-400",
  Agendado: "bg-blue-500/20 text-blue-400",
  "Concluído": "bg-zinc-700 text-zinc-400",
  Cancelado: "bg-red-500/20 text-red-400",
  Faltou: "bg-orange-500/20 text-orange-400",
  Pendente: "bg-yellow-500/20 text-yellow-400",
  Pago: "bg-emerald-500/20 text-emerald-400",
  default: "bg-zinc-700 text-zinc-300",
};

export default function Badge({ label, className }: { label: string; className?: string }) {
  const style = variants[label] || variants.default;
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", style, className)}>
      {label}
    </span>
  );
}
