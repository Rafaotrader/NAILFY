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
          <p className="text-zinc-400 text-sm">Ajustes simples para testar o MVP com dados de demonstracao.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="font-semibold text-sm">Dados de demonstracao</p>
          <p className="text-zinc-400 text-xs mt-1 mb-3">Use esta opcao para limpar localStorage e voltar aos dados iniciais.</p>
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
