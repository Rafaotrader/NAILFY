import AppShell from "@/components/layout/AppShell";
import ClientProfile from "@/components/clientes/ClientProfile";

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <ClientProfile clientId={params.id} />
    </AppShell>
  );
}
