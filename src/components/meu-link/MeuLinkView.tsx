"use client";
import { useState } from "react";
import { Instagram, Phone, ExternalLink, Copy } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useAppData } from "@/context/AppDataContext";

export default function MeuLinkView() {
  const { services } = useAppData();
  const [copied, setCopied] = useState(false);
  const profileUrl = "nailfy.com/beatriznails";

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Meu Link</h1>
        <button
          onClick={async () => {
            if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(profileUrl);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="flex items-center gap-1.5 bg-zinc-800 text-zinc-300 px-3 py-2 rounded-xl text-sm"
        >
          <Copy size={14} /> {copied ? "Copiado" : "Copiar link"}
        </button>
      </div>

      {/* Profile preview */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-4">
        <div className="bg-gradient-to-br from-[#e91e8c]/30 to-purple-900/30 p-6 text-center border-b border-zinc-800">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e91e8c] to-purple-600 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-3">
            B
          </div>
          <h2 className="font-bold text-xl">Beatriz Nails</h2>
          <p className="text-zinc-300 text-sm mt-1">Nail Designer especialista em Gel e Nail Art</p>
          <p className="text-zinc-400 text-xs mt-0.5">Sao Paulo, SP</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <a href="https://instagram.com/beatriznails" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#e91e8c] text-sm">
              <Instagram size={16} /> @beatriznails
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-3">Servicos</h3>
          <div className="space-y-2">
            {services.slice(0, 4).map(s => (
              <div key={s.id} className="flex items-center justify-between py-1.5 border-b border-zinc-800 last:border-0">
                <span className="text-sm text-zinc-200">{s.name}</span>
                <span className="text-[#e91e8c] font-medium text-sm">{formatCurrency(s.price)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-4 pt-0">
          <a
            href="https://wa.me/5511999990000?text=Oi%20Beatriz!%20Quero%20agendar%20um%20horario."
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#e91e8c] text-white py-3.5 rounded-xl font-semibold text-sm"
          >
            <Phone size={16} /> Solicitar horario via WhatsApp
          </a>
        </div>
      </div>

      {/* URL display */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <p className="text-zinc-400 text-xs mb-1">Seu link publico</p>
        <div className="flex items-center gap-2">
          <ExternalLink size={14} className="text-[#e91e8c] flex-shrink-0" />
          <p className="text-[#e91e8c] text-sm font-mono">{profileUrl}</p>
        </div>
        <p className="text-zinc-500 text-xs mt-2">Compartilhe este link no Instagram, WhatsApp e onde quiser. Suas clientes podem ver seus servicos e entrar em contato diretamente.</p>
      </div>
    </div>
  );
}
