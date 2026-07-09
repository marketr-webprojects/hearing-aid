import {
  Ear,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  CalendarCheck,
  ClipboardCheck,
  Wrench,
  Headphones,
  Volume2,
  Activity,
  Baby,
  UserCheck,
  MessageCircle,
  BadgeCheck,
  HandHeart,
  Home,
  Check,
  Wallet,
  HeartHandshake,
  Target,
  Eye,
  type LucideIcon,
} from "lucide-react";

/** Named icons selectable in the admin and rendered on the public site. */
export const ICONS: Record<string, LucideIcon> = {
  Ear,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  CalendarCheck,
  ClipboardCheck,
  Wrench,
  Headphones,
  Volume2,
  Activity,
  Baby,
  UserCheck,
  MessageCircle,
  BadgeCheck,
  HandHeart,
  Home,
  Check,
  Wallet,
  HeartHandshake,
  Target,
  Eye,
};

export const ICON_NAMES = Object.keys(ICONS);

/** Resolve an icon name to a component, falling back to Ear. */
export function getIcon(name: string | null | undefined): LucideIcon {
  return (name && ICONS[name]) || Ear;
}
