export function generateWhatsAppLink(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const full = cleaned.startsWith("55") ? cleaned : `55${cleaned}`;
  return `https://wa.me/${full}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(phone: string, message: string): void {
  window.open(generateWhatsAppLink(phone, message), "_blank");
}
