import {
  type LucideIcon,
  Umbrella,
  Droplet,
  Wind,
  CloudRain,
  SunMedium,
  Eye,
} from "lucide-react";

export interface InfoIcon {
  name: string;
  label: string;
  icon: LucideIcon;
}

export const infoIcon = [
  { name: "chance_of_precip", label: "precip", icon: Umbrella },
  { name: "precip_mm", label: "amount", icon: CloudRain },
  { name: "humidity", label: "humidity", icon: Droplet },
  { name: "uv", label: "UV", icon: SunMedium },
  { name: "wind", label: "km/h", icon: Wind },
  { name: "visibility", label: "visibility", icon: Eye },
];
