import { Button } from "./Button";
import { WhatsAppIcon } from "./icons";
import { whatsappUrl, waMessages } from "@/lib/whatsapp";

type Props = {
  label: string;
  message?: string;
  variant?: "primary" | "inverse" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  /** Stable Coded Tracker id (data-cm-id) — several buttons share the role. */
  cmId?: string;
};

export function WhatsAppButton({
  label,
  message = waMessages.general,
  variant = "primary",
  size = "md",
  className,
  cmId,
}: Props) {
  return (
    <Button
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      // A11y hint (impeccable critique): make the leave-site destination explicit
      aria-label={`${label} — abre uma conversa no WhatsApp`}
      variant={variant}
      size={size}
      className={className}
      data-cm-role="whatsapp"
      data-cm-id={cmId}
    >
      <WhatsAppIcon />
      {label}
    </Button>
  );
}
