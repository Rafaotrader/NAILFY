import AppShell from "@/components/layout/AppShell";
import AgendaView from "@/components/agenda/AgendaView";
import { Suspense } from "react";

export default function AgendaPage() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <AgendaView />
      </Suspense>
    </AppShell>
  );
}
