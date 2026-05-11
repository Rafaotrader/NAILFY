# Nailfy

Nailfy e um MVP mobile-first para nail designers acompanharem agenda, clientes, retornos, mensagens e financeiro em um unico lugar.

## Objetivo do MVP

Validar o fluxo principal de uma profissional de unhas:

- cadastrar clientes e servicos
- agendar atendimentos
- confirmar pelo WhatsApp
- marcar pagamento e conclusao
- acompanhar historico da cliente
- enxergar receita, pendencias e retornos do dia

Nesta versao, os dados ficam no navegador com localStorage e partem de uma base mockada. Ainda nao ha banco real, login, Stripe ou integracao oficial com WhatsApp.

## Como rodar

```bash
cd nailfy
npm install
npm run dev
```

Acesse: http://localhost:3004

## Fluxo principal de teste

1. Abra o Dashboard e confira atendimentos, previsto do dia, pendentes e clientes para chamar.
2. Crie uma cliente em Clientes.
3. Crie ou edite um servico em Servicos.
4. Crie um agendamento em Agenda usando cliente e servico.
5. Envie confirmacao via WhatsApp, confirme, marque pago e conclua.
6. Confira Dashboard, Financeiro e historico no perfil da cliente.
7. Use Configuracoes para resetar os dados de demonstracao.

## Modulos

- Dashboard com resumo do dia e clientes para chamar
- Agenda com calendario, status e acoes rapidas
- Clientes com busca, filtros e perfil individual
- Financeiro simples para receitas, despesas e pendencias
- Mensagens prontas para relacionamento pelo WhatsApp
- Servicos, Estoque e Meu Link profissional

## Proximos passos

1. Deploy beta na Vercel
2. Banco de dados e autenticacao
3. Onboarding para cadastrar perfil profissional
4. Testes E2E do fluxo principal
5. Integracao real com WhatsApp e notificacoes
6. Relatorios por periodo
7. Multi-conta para cada profissional
