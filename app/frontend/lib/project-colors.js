const PROJECT_COLOR_TOKENS = [
  "verdigris",
  "cobalt",
  "amber",
  "coral",
  "slate",
  "sage",
  "ocean",
  "gold",
  "terracotta",
  "mulberry"
]

const PROJECT_COLOR_THEMES = {
  verdigris: {
    label: "Verdigris",
    hex: "#2a9d8f",
    bar: "bg-[#2a9d8f] text-white",
    surface: "bg-[linear-gradient(135deg,rgb(42_157_143_/_0.2),rgb(42_157_143_/_0.06)_54%,rgb(255_255_255_/_0.92))]",
    splash: "bg-[#2a9d8f]",
    glow: "bg-[rgb(42_157_143_/_0.24)]",
    badge: "bg-[rgb(42_157_143_/_0.14)] text-[var(--color-charcoal-blue)]"
  },
  cobalt: {
    label: "Cobalt",
    hex: "#264653",
    bar: "bg-[#264653] text-white",
    surface: "bg-[linear-gradient(135deg,rgb(38_70_83_/_0.2),rgb(38_70_83_/_0.06)_54%,rgb(255_255_255_/_0.94))]",
    splash: "bg-[#264653]",
    glow: "bg-[rgb(38_70_83_/_0.2)]",
    badge: "bg-[rgb(38_70_83_/_0.12)] text-[var(--color-charcoal-blue)]"
  },
  amber: {
    label: "Amber",
    hex: "#e9c46a",
    bar: "bg-[#e9c46a] text-[#4f3a13]",
    surface: "bg-[linear-gradient(135deg,rgb(233_196_106_/_0.28),rgb(233_196_106_/_0.08)_54%,rgb(255_255_255_/_0.94))]",
    splash: "bg-[#e9c46a]",
    glow: "bg-[rgb(233_196_106_/_0.24)]",
    badge: "bg-[rgb(233_196_106_/_0.22)] text-[#5f4618]"
  },
  coral: {
    label: "Coral",
    hex: "#e76f51",
    bar: "bg-[#e76f51] text-white",
    surface: "bg-[linear-gradient(135deg,rgb(231_111_81_/_0.24),rgb(231_111_81_/_0.08)_54%,rgb(255_255_255_/_0.94))]",
    splash: "bg-[#e76f51]",
    glow: "bg-[rgb(231_111_81_/_0.22)]",
    badge: "bg-[rgb(231_111_81_/_0.16)] text-[var(--color-charcoal-blue)]"
  },
  slate: {
    label: "Apricot",
    hex: "#f4a261",
    bar: "bg-[#f4a261] text-[#5a3410]",
    surface: "bg-[linear-gradient(135deg,rgb(244_162_97_/_0.24),rgb(244_162_97_/_0.08)_54%,rgb(255_255_255_/_0.94))]",
    splash: "bg-[#f4a261]",
    glow: "bg-[rgb(244_162_97_/_0.22)]",
    badge: "bg-[rgb(244_162_97_/_0.16)] text-[#68401a]"
  },
  sage: {
    label: "Sage",
    hex: "#8ab17d",
    bar: "bg-[#8ab17d] text-[#243b22]",
    surface: "bg-[linear-gradient(135deg,rgb(138_177_125_/_0.24),rgb(138_177_125_/_0.08)_54%,rgb(255_255_255_/_0.94))]",
    splash: "bg-[#8ab17d]",
    glow: "bg-[rgb(138_177_125_/_0.24)]",
    badge: "bg-[rgb(138_177_125_/_0.18)] text-[#2c4728]"
  },
  ocean: {
    label: "Ocean",
    hex: "#457b9d",
    bar: "bg-[#457b9d] text-white",
    surface: "bg-[linear-gradient(135deg,rgb(69_123_157_/_0.22),rgb(69_123_157_/_0.07)_54%,rgb(255_255_255_/_0.95))]",
    splash: "bg-[#457b9d]",
    glow: "bg-[rgb(69_123_157_/_0.22)]",
    badge: "bg-[rgb(69_123_157_/_0.16)] text-[#173844]"
  },
  gold: {
    label: "Gold",
    hex: "#c79a2b",
    bar: "bg-[#c79a2b] text-[#432f05]",
    surface: "bg-[linear-gradient(135deg,rgb(199_154_43_/_0.24),rgb(199_154_43_/_0.08)_54%,rgb(255_255_255_/_0.95))]",
    splash: "bg-[#c79a2b]",
    glow: "bg-[rgb(199_154_43_/_0.22)]",
    badge: "bg-[rgb(199_154_43_/_0.18)] text-[#513908]"
  },
  terracotta: {
    label: "Terracotta",
    hex: "#c96b4b",
    bar: "bg-[#c96b4b] text-white",
    surface: "bg-[linear-gradient(135deg,rgb(201_107_75_/_0.24),rgb(201_107_75_/_0.08)_54%,rgb(255_255_255_/_0.95))]",
    splash: "bg-[#c96b4b]",
    glow: "bg-[rgb(201_107_75_/_0.22)]",
    badge: "bg-[rgb(201_107_75_/_0.16)] text-[#5a2b1d]"
  },
  mulberry: {
    label: "Mulberry",
    hex: "#8d5a97",
    bar: "bg-[#8d5a97] text-white",
    surface: "bg-[linear-gradient(135deg,rgb(141_90_151_/_0.22),rgb(141_90_151_/_0.07)_54%,rgb(255_255_255_/_0.95))]",
    splash: "bg-[#8d5a97]",
    glow: "bg-[rgb(141_90_151_/_0.22)]",
    badge: "bg-[rgb(141_90_151_/_0.16)] text-[#3f2345]"
  }
}

export const PROJECT_COLOR_OPTIONS = PROJECT_COLOR_TOKENS.map((token) => ({
  token,
  label: PROJECT_COLOR_THEMES[token].label,
  hex: PROJECT_COLOR_THEMES[token].hex
}))

function normalizeSeed(seed) {
  const numeric = Number(seed)

  if (Number.isFinite(numeric)) {
    return Math.abs(Math.trunc(numeric))
  }

  return String(seed || "").split("").reduce((hash, character) => (
    ((hash << 5) - hash + character.charCodeAt(0)) | 0
  ), 0)
}

export function resolveProjectColorToken(token, seed = token) {
  if (PROJECT_COLOR_THEMES[token]) return token

  const index = Math.abs(normalizeSeed(seed)) % PROJECT_COLOR_TOKENS.length
  return PROJECT_COLOR_TOKENS[index]
}

export function projectColorTheme(token, seed = token) {
  return PROJECT_COLOR_THEMES[resolveProjectColorToken(token, seed)]
}
