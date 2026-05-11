# Nailfy

SaaS mobile-first para nail designers, manicures e pequenas esmalterias.

## Como rodar

```bash
cd nailfy
npm install
npm run dev
```

Acesse: http://localhost:3004

## Estrutura

```
src/
  app/           # Pages (Next.js App Router)
  components/    # Componentes por modulo
  data/          # Dados mockados
  types/         # TypeScript types
  lib/           # Utils e helpers
```

## Modulos

- Dashboard com metricas do dia
- Agenda com calendario e lista
- Clientes com perfil completo
- Financeiro com lancamentos
- Mensagens via WhatsApp
- Servicos e Estoque
- Meu Link (pagina publica)

## Proximos passos

1. Banco de dados (Supabase ou Prisma + PostgreSQL)
2. Autenticacao (NextAuth ou Clerk)
3. Integracao real WhatsApp (Twilio ou Z-API)
4. Notificacoes push para lembretes
5. Relatorios e exportacao PDF
6. Multi-tenant (cada nail designer tem sua conta)
7. Pagamentos (Stripe/Pix para cobranca de sinal)
8. App mobile nativo (Expo)
