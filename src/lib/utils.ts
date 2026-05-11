export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export function formatDateShort(dateStr: string): string {
  const [, month, day] = dateStr.split("-");
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${parseInt(day)} ${months[parseInt(month) - 1]}`;
}

export function daysSince(dateStr: string): number {
  const past = new Date(dateStr);
  const now = new Date("2026-05-11");
  return Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24));
}

export function getClientReturnStatus(lastVisit: string, suggestedReturn = 21): "ok" | "soon" | "overdue" {
  const days = daysSince(lastVisit);
  if (days < suggestedReturn - 5) return "ok";
  if (days < suggestedReturn + 7) return "soon";
  return "overdue";
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
