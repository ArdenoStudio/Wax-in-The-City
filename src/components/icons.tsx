/**
 * Brand glyphs sourced from react-icons (Font Awesome 6 brands). Centralised
 * here so every call site keeps importing InstagramIcon/FacebookIcon/WhatsappIcon
 * while the underlying library stays swappable. currentColor follows text colour;
 * size via Tailwind height/width classes.
 */
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa6";

type IconProps = React.SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return <FaInstagram aria-hidden {...props} />;
}

export function FacebookIcon(props: IconProps) {
  return <FaFacebookF aria-hidden {...props} />;
}

export function WhatsappIcon(props: IconProps) {
  return <FaWhatsapp aria-hidden {...props} />;
}
