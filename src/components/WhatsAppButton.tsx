import { Button } from "./Button";
import { WhatsAppIcon } from "./icons";
import { whatsappUrl, waMessages } from "@/lib/whatsapp";

type Props = {
  label: string;
  message?: string;
  variant?: "primary" | "inverse" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

export function WhatsAppButton({
  label,
  message = waMessages.general,
  variant = "primary",
  size = "md",
  className,
}: Props) {
  return (
    <Button
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
    >
      <WhatsAppIcon />
      {label}
    </Button>
  );
}
