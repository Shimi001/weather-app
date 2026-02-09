import {
  type LucideIcon,
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  Cloudy,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSunRain,
  CloudMoonRain,
  CloudSnow,
  CloudHail,
  CloudLightning,
  Wind,
  Haze,
} from "lucide-react";

type WeatherTheme = {
  icon: LucideIcon;
  bg: string;
  text: string;
};

interface Condition {
  day: WeatherTheme;
  night: WeatherTheme;
}

// Rain
const rainConfig: Condition = {
  day: {
    icon: CloudRain,
    bg: "from-blue-400 via-blue-500 to-blue-600",
    text: "text-blue-50",
  },
  night: {
    icon: CloudRain,
    bg: "from-slate-800 via-blue-950 to-slate-900",
    text: "text-blue-200",
  },
};

// Snow
const snowConfig: Condition = {
  day: {
    icon: CloudSnow,
    bg: "from-sky-300 via-sky-400 to-blue-300",
    text: "text-white",
  },
  night: {
    icon: CloudSnow,
    bg: "from-slate-800 via-slate-900 to-sky-900",
    text: "text-sky-100",
  },
};

// Mixed precipitation
const sleetConfig: Condition = {
  day: {
    icon: CloudHail,
    bg: "from-slate-300 via-cyan-400 to-blue-400",
    text: "text-slate-50",
  },
  night: {
    icon: CloudHail,
    bg: "from-slate-800 via-cyan-900 to-slate-900",
    text: "text-cyan-100",
  },
};

// Lightning
const stormConfig: Condition = {
  day: {
    icon: CloudLightning,
    bg: "from-indigo-400 via-purple-500 to-slate-500",
    text: "text-indigo-50",
  },
  night: {
    icon: CloudLightning,
    bg: "from-slate-900 via-indigo-950 to-purple-950",
    text: "text-indigo-200",
  },
};

export const weatherCondition: Record<number, Condition> = {
  //
  //              Clear & Cloudy
  //

  // Sunny / Clear
  1000: {
    day: {
      icon: Sun,
      bg: "from-sky-400 via-sky-500 to-blue-400",
      text: "text-yellow-50",
    },
    night: {
      icon: Moon,
      bg: "from-slate-900 via-indigo-950 to-slate-900",
      text: "text-slate-300",
    },
  },

  // Partly cloudy
  1003: {
    day: {
      icon: CloudSun,
      bg: "from-sky-400 via-blue-500 to-blue-600",
      text: "text-white",
    },
    night: {
      icon: CloudMoon,
      bg: "from-slate-800 via-slate-900 to-gray-900",
      text: "text-gray-300",
    },
  },

  // Cloudy
  1006: {
    day: {
      icon: Cloud,
      bg: "from-gray-300 via-gray-400 to-slate-400",
      text: "text-slate-600",
    },
    night: {
      icon: Cloud,
      bg: "from-slate-800 via-slate-900 to-gray-900",
      text: "text-gray-400",
    },
  },

  // Overcast
  1009: {
    day: {
      icon: Cloudy,
      bg: "from-slate-400 via-slate-500 to-gray-500",
      text: "text-slate-100",
    },
    night: {
      icon: Cloudy,
      bg: "from-gray-800 via-slate-900 to-black",
      text: "text-gray-400",
    },
  },

  //
  //              Fog & Mist
  //

  // Mist
  1030: {
    day: {
      icon: Haze,
      bg: "from-slate-200 via-gray-300 to-slate-400",
      text: "text-slate-700",
    },
    night: {
      icon: CloudFog,
      bg: "from-slate-800 via-gray-900 to-black",
      text: "text-gray-400",
    },
  },
  // Fog
  1135: {
    day: {
      icon: CloudFog,
      bg: "from-gray-300 via-slate-400 to-gray-500",
      text: "text-slate-800",
    },
    night: {
      icon: CloudFog,
      bg: "from-gray-800 via-slate-900 to-black",
      text: "text-gray-500",
    },
  },
  // Freezing fog
  1147: {
    day: {
      icon: CloudFog,
      bg: "from-cyan-100 via-slate-300 to-slate-400",
      text: "text-cyan-800",
    },
    night: {
      icon: CloudFog,
      bg: "from-slate-800 via-cyan-950 to-slate-900",
      text: "text-cyan-200",
    },
  },

  //
  //              Rain & Drizzle
  //

  // Patchy rain nearby
  1063: {
    day: {
      icon: CloudSunRain,
      bg: "from-sky-300 via-blue-400 to-blue-500",
      text: "text-blue-50",
    },
    night: {
      icon: CloudMoonRain,
      bg: "from-slate-800 via-blue-950 to-slate-900",
      text: "text-blue-200",
    },
  },

  // Drizzle
  1150: {
    day: {
      icon: CloudDrizzle,
      bg: "from-sky-200 via-sky-300 to-blue-300",
      text: "text-blue-700",
    },
    night: {
      icon: CloudDrizzle,
      bg: "from-slate-800 via-slate-900 to-blue-900",
      text: "text-blue-200",
    },
  },
  1153: {
    day: {
      icon: CloudDrizzle,
      bg: "from-sky-200 via-sky-300 to-blue-300",
      text: "text-blue-700",
    },
    night: {
      icon: CloudDrizzle,
      bg: "from-slate-800 via-slate-900 to-blue-900",
      text: "text-blue-200",
    },
  },

  // Rain
  1180: rainConfig,
  1183: rainConfig,
  1186: rainConfig,
  1189: rainConfig,

  // Heavy Rain
  1192: {
    day: {
      icon: CloudRain,
      bg: "from-blue-600 via-blue-700 to-indigo-600",
      text: "text-blue-100",
    },
    night: {
      icon: CloudRain,
      bg: "from-indigo-950 via-slate-900 to-black",
      text: "text-indigo-200",
    },
  },
  1195: {
    day: {
      icon: CloudRain,
      bg: "from-blue-700 via-indigo-700 to-slate-700",
      text: "text-blue-100",
    },
    night: {
      icon: CloudRain,
      bg: "from-black via-indigo-950 to-slate-900",
      text: "text-indigo-200",
    },
  },

  // Rain Showers
  1240: {
    day: {
      icon: CloudSunRain,
      bg: "from-sky-300 to-blue-500",
      text: "text-white",
    },
    night: {
      icon: CloudMoonRain,
      bg: "from-slate-800 to-slate-900",
      text: "text-blue-200",
    },
  },
  1243: {
    day: {
      icon: CloudSunRain,
      bg: "from-sky-400 to-blue-600",
      text: "text-white",
    },
    night: {
      icon: CloudMoonRain,
      bg: "from-slate-800 to-black",
      text: "text-blue-200",
    },
  },
  1246: {
    // Torrential
    day: {
      icon: CloudRain,
      bg: "from-slate-600 via-blue-800 to-slate-800",
      text: "text-gray-100",
    },
    night: {
      icon: CloudRain,
      bg: "from-black via-slate-900 to-black",
      text: "text-gray-400",
    },
  },

  //
  //              Snow
  //

  // Patchy snow nearby
  1066: snowConfig,

  // Blowing snow / Blizzard
  1114: {
    day: {
      icon: Wind,
      bg: "from-slate-200 via-slate-300 to-gray-400",
      text: "text-slate-700",
    },
    night: {
      icon: Wind,
      bg: "from-slate-800 via-gray-800 to-black",
      text: "text-slate-300",
    },
  },
  1117: {
    // Blizzard
    day: {
      icon: Wind,
      bg: "from-gray-300 via-slate-400 to-slate-500",
      text: "text-slate-800",
    },
    night: {
      icon: Wind,
      bg: "from-gray-900 via-slate-900 to-black",
      text: "text-slate-400",
    },
  },

  // Snow codes
  1210: snowConfig,
  1213: snowConfig,
  1216: snowConfig,
  1219: snowConfig,
  1222: snowConfig,
  1225: snowConfig,
  1255: snowConfig,
  1258: snowConfig,

  //
  //              Sleet, Ice
  //

  // Freezing Drizzle / Rain
  1072: {
    day: {
      icon: CloudDrizzle,
      bg: "from-cyan-200 via-blue-300 to-blue-400",
      text: "text-cyan-800",
    },
    night: {
      icon: CloudDrizzle,
      bg: "from-slate-800 via-cyan-900 to-slate-900",
      text: "text-cyan-200",
    },
  },
  1168: {
    day: {
      icon: CloudDrizzle,
      bg: "from-cyan-200 via-blue-300 to-blue-400",
      text: "text-cyan-800",
    },
    night: {
      icon: CloudDrizzle,
      bg: "from-slate-800 via-cyan-900 to-slate-900",
      text: "text-cyan-200",
    },
  },
  1171: {
    day: {
      icon: CloudDrizzle,
      bg: "from-cyan-300 via-blue-400 to-blue-500",
      text: "text-cyan-900",
    },
    night: {
      icon: CloudDrizzle,
      bg: "from-slate-800 via-cyan-950 to-slate-900",
      text: "text-cyan-200",
    },
  },

  // Ice Rain
  1198: {
    day: {
      icon: CloudRain,
      bg: "from-cyan-400 via-blue-500 to-blue-600",
      text: "text-cyan-50",
    },
    night: {
      icon: CloudRain,
      bg: "from-slate-900 via-cyan-950 to-blue-950",
      text: "text-cyan-200",
    },
  },
  1201: {
    day: {
      icon: CloudRain,
      bg: "from-cyan-500 via-blue-600 to-blue-700",
      text: "text-cyan-50",
    },
    night: {
      icon: CloudRain,
      bg: "from-slate-900 via-cyan-950 to-blue-950",
      text: "text-cyan-200",
    },
  },

  // Sleet
  1069: sleetConfig,
  1204: sleetConfig,
  1207: sleetConfig,
  1249: sleetConfig,
  1252: sleetConfig,

  // Ice Pellets
  1237: {
    day: {
      icon: CloudHail,
      bg: "from-gray-200 via-slate-300 to-cyan-200",
      text: "text-slate-700",
    },
    night: {
      icon: CloudHail,
      bg: "from-slate-800 via-slate-900 to-cyan-950",
      text: "text-cyan-100",
    },
  },
  1261: {
    day: {
      icon: CloudHail,
      bg: "from-gray-300 via-slate-400 to-cyan-300",
      text: "text-slate-800",
    },
    night: {
      icon: CloudHail,
      bg: "from-slate-800 via-slate-900 to-cyan-950",
      text: "text-cyan-100",
    },
  },
  1264: {
    day: {
      icon: CloudHail,
      bg: "from-slate-400 via-slate-500 to-cyan-400",
      text: "text-slate-100",
    },
    night: {
      icon: CloudHail,
      bg: "from-slate-800 via-slate-900 to-cyan-950",
      text: "text-cyan-100",
    },
  },

  //
  //              Thunderstorms
  //

  // Thundery outbreaks
  1087: stormConfig,

  // Rain with thunder
  1273: stormConfig,
  1276: {
    day: {
      icon: CloudLightning,
      bg: "from-purple-600 via-indigo-600 to-slate-700",
      text: "text-purple-100",
    },
    night: {
      icon: CloudLightning,
      bg: "from-black via-purple-950 to-slate-900",
      text: "text-purple-300",
    },
  },

  // Snow with thunder
  1279: {
    day: {
      icon: CloudLightning,
      bg: "from-cyan-500 via-purple-500 to-indigo-500",
      text: "text-white",
    },
    night: {
      icon: CloudLightning,
      bg: "from-slate-900 via-purple-900 to-cyan-900",
      text: "text-cyan-100",
    },
  },
  1282: {
    day: {
      icon: CloudLightning,
      bg: "from-cyan-600 via-purple-600 to-indigo-600",
      text: "text-white",
    },
    night: {
      icon: CloudLightning,
      bg: "from-slate-900 via-purple-900 to-cyan-900",
      text: "text-cyan-100",
    },
  },
};
