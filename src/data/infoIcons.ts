import {
  type LucideIcon,
  Umbrella,
  Droplet,
  Wind,
  Thermometer,
  SunMedium,
  Eye,
} from "lucide-react";

export interface InfoIcon {
  name: string;
  icon: LucideIcon;
}

export const infoIcon = [
  { name: "precip", icon: Umbrella },
  { name: "humidity", icon: Droplet },
  { name: "km/h", icon: Wind }, // wind
  { name: "feels like", icon: Thermometer },
  { name: "UV", icon: SunMedium },
  { name: "visibility", icon: Eye },
];
