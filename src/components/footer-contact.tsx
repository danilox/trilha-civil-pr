import { Mail, MessageCircle } from "lucide-react";
import { platformConfig } from "@/config/site-config";

export function FooterContact() {
  const { contact, name } = platformConfig;

  return (
    <section aria-label="Contato" className="min-w-0 text-sm text-zinc-300">
      <h2 className="mb-2 font-semibold text-zinc-100">Contato</h2>
      <address className="flex flex-col gap-1 not-italic">
        <a href={`mailto:${contact.email}`} aria-label={`Enviar e-mail para ${name}: ${contact.email}`} className="ds-focusable flex min-h-11 items-center gap-2 rounded hover:text-white">
          <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span className="break-all">{contact.email}</span>
        </a>
        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={`Falar com ${name} pelo WhatsApp: ${contact.phone} (abre em nova aba)`} className="ds-focusable flex min-h-11 items-center gap-2 rounded hover:text-white">
          <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
          <span>WhatsApp: {contact.phone}</span>
        </a>
      </address>
    </section>
  );
}
