import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  onClick?: () => void;
}

export default function StatCard({ icon: Icon, label, value, sub, color = "text-[#e91e8c]", onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn("bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2", onClick && "cursor-pointer active:scale-95 transition-transform")}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-zinc-800">
        <Icon size={16} className={color} />
      </div>
      <div>
        <p className="text-zinc-400 text-xs">{label}</p>
        <p className="text-white font-bold text-lg leading-tight">{value}</p>
        {sub && <p className="text-zinc-500 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
