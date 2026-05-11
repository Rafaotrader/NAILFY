"use client";
import { Package, Scissors, Link, Settings, ChevronRight } from "lucide-react";
import NextLink from "next/link";

const items = [
  { label: "Servicos", desc: "Gerencie seu menu de servicos", icon: Scissors, href: "/servicos" },
  { label: "Estoque", desc: "Controle seus produtos e materiais", icon: Package, href: "/estoque" },
  { label: "Meu Link", desc: "Sua pagina publica compartilhavel", icon: Link, href: "/meu-link" },
  { label: "Configuracoes", desc: "Perfil, plano e preferencias", icon: Settings, href: "/configuracoes" },
];

export default function MaisView() {
  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-xl font-bold mb-4">Mais</h1>

      {/* Profile card */}
      <div className="bg-gradient-to-r from-[#e91e8c]/20 to-purple-900/20 border border-[#e91e8c]/30 rounded-2xl p-4 mb-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e91e8c] to-purple-600 flex items-center justify-center text-white font-bold text-xl">
          B
        </div>
        <div>
          <p className="font-bold">Beatriz Nails</p>
          <p className="text-zinc-400 text-sm">Plano Pro • Ativo</p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map(({ label, desc, icon: Icon, href }) => (
          <NextLink key={href} href={href}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform">
              <div className="w-10 h-10 rounded-xl bg-[#e91e8c]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-[#e91e8c]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{label}</p>
                <p className="text-zinc-400 text-xs">{desc}</p>
              </div>
              <ChevronRight size={16} className="text-zinc-600" />
            </div>
          </NextLink>
        ))}
      </div>
    </div>
  );
}
