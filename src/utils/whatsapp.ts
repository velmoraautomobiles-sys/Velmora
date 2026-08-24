export const DEALER_WHATSAPP_LINK = 'https://wa.me/message/CF6AEOLZUEDVJ1';
export const DEALER_EMAIL = 'velmoraautomobiles@gmail.com';

export function getWhatsAppInquiryLink(vehicleName?: string, actionType?: 'BUY' | 'RENT' | 'LEASE' | 'GENERAL'): string {
  // Using the exact dealer WhatsApp link requested
  return DEALER_WHATSAPP_LINK;
}

export function getDealerMailtoLink(subject?: string, body?: string): string {
  const sub = subject ? encodeURIComponent(subject) : encodeURIComponent('Inquiry - Velmora Automobiles Showroom');
  const b = body ? `&body=${encodeURIComponent(body)}` : '';
  return `mailto:${DEALER_EMAIL}?subject=${sub}${b}`;
}

