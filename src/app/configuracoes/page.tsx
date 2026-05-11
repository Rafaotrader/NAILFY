"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppData } from "@/context/AppDataContext";

export default function ConfigPage() {
  const { resetDemoData } = useAppData();
  const [message, setMessage] = useState("");

  return (
    <AppShell>
      <div className="px-4 pt-6 pb-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold mb-2">Configuracoes</h1>
          <p className="text-zinc-400 text-sm">Perfil profissional, link de divulgacao e dados da demonstracao.</p>
        </div>

        <div className="bg-gradient-to-r from-[#e91e8c]/20 to-purple-900/20 border border-[#e91e8c]/30 rounded-2xl p-4">
          <p className="text-zinc-400 text-xs">Perfil profissional</p>
          <h2 className="text-lg font-bold mt-1">Beatriz Nails</h2>
          <p className="text-zinc-300 text-sm">Nail designer especialista em gel, fibra e nail art.</p>
          <p className="text-zinc-500 text-xs mt-2">Sao Paulo, SP</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="font-semibold text-sm">Link profissional</p>
          <p className="text-[#e91e8c] text-sm font-mono mt-2">nailfy.com/beatriznails</p>
          <p className="text-zinc-400 text-xs mt-2">Use este link mockado para apresentar servicos e receber pedidos pelo WhatsApp.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="font-semibold text-sm">Status do app</p>
          <p className="text-emerald-400 text-sm mt-1">Versao beta demonstravel</p>
          <p className="text-zinc-400 text-xs mt-2">Os dados ainda ficam no navegador para facilitar testes e apresentacoes.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="font-semibold text-sm">Dados de demonstracao</p>
          <p className="text-zinc-400 text-xs mt-1 mb-3">Limpe os testes e volte para a base inicial quando quiser recomeçar uma apresentacao.</p>
          <button
            onClick={() => {
              resetDemoData();
              setMessage("Dados de demonstracao restaurados.");
            }}
            className="w-full bg-zinc-800 text-zinc-200 py-3 rounded-xl text-sm font-medium"
          >
            Resetar dados de demonstracao
          </button>
          {message && <p className="text-emerald-400 text-xs mt-3">{message}</p>}
        </div>
      </div>
    </AppShell>
  );
}
