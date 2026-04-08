/**
 * Preset encoding/decoding utilities.
 *
 * Ported from shadcn/ui source (packages/shadcn/src/preset/preset.ts).
 * Decode-only — we never encode, only read user-supplied preset codes.
 *
 * The preset code is a base62-encoded bit-packed integer prefixed with
 * a version character ("a" = v1, "b" = v2).
 *
 * Rules for backward compat (inherited from shadcn):
 *   1. Never reorder existing value arrays — only append.
 *   2. New fields must have their default at index 0.
 *   3. Only append new fields to the end of PRESET_FIELDS.
 *   4. Stay under 53 bits total (JS safe integer limit).
 */

// ---------------------------------------------------------------------------
// Value arrays — order matters. Never reorder, only append.
// ---------------------------------------------------------------------------

const PRESET_STYLES = [
  "nova",
  "vega",
  "maia",
  "lyra",
  "mira",
  "luma",
] as const;

const PRESET_BASE_COLORS = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "mauve",
  "olive",
  "mist",
  "taupe",
] as const;

const PRESET_THEMES = [
  "neutral",
  "stone",
  "zinc",
  "gray",
  "amber",
  "blue",
  "cyan",
  "emerald",
  "fuchsia",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "rose",
  "sky",
  "teal",
  "violet",
  "yellow",
  "mauve",
  "olive",
  "mist",
  "taupe",
] as const;

const PRESET_CHART_COLORS = PRESET_THEMES;

const PRESET_ICON_LIBRARIES = [
  "lucide",
  "hugeicons",
  "tabler",
  "phosphor",
  "remixicon",
] as const;

const PRESET_FONTS = [
  "inter",
  "noto-sans",
  "nunito-sans",
  "figtree",
  "roboto",
  "raleway",
  "dm-sans",
  "public-sans",
  "outfit",
  "jetbrains-mono",
  "geist",
  "geist-mono",
  "lora",
  "merriweather",
  "playfair-display",
  "noto-serif",
  "roboto-slab",
  "oxanium",
  "manrope",
  "space-grotesk",
  "montserrat",
  "ibm-plex-sans",
  "source-sans-3",
  "instrument-sans",
] as const;

const PRESET_FONT_HEADINGS = ["inherit", ...PRESET_FONTS] as const;

const PRESET_RADII = [
  "default",
  "none",
  "small",
  "medium",
  "large",
] as const;

const PRESET_MENU_ACCENTS = ["subtle", "bold"] as const;

const PRESET_MENU_COLORS = [
  "default",
  "inverted",
  "default-translucent",
  "inverted-translucent",
] as const;

// ---------------------------------------------------------------------------
// Field definitions — bit layout per version
// ---------------------------------------------------------------------------

const PRESET_FIELDS_V1 = [
  { key: "menuColor", values: PRESET_MENU_COLORS, bits: 3 },
  { key: "menuAccent", values: PRESET_MENU_ACCENTS, bits: 3 },
  { key: "radius", values: PRESET_RADII, bits: 4 },
  { key: "font", values: PRESET_FONTS, bits: 6 },
  { key: "iconLibrary", values: PRESET_ICON_LIBRARIES, bits: 6 },
  { key: "theme", values: PRESET_THEMES, bits: 6 },
  { key: "baseColor", values: PRESET_BASE_COLORS, bits: 6 },
  { key: "style", values: PRESET_STYLES, bits: 6 },
] as const;

const PRESET_FIELDS_V2 = [
  ...PRESET_FIELDS_V1,
  { key: "chartColor", values: PRESET_CHART_COLORS, bits: 6 },
  { key: "fontHeading", values: PRESET_FONT_HEADINGS, bits: 5 },
] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PresetConfig {
  style: (typeof PRESET_STYLES)[number];
  baseColor: (typeof PRESET_BASE_COLORS)[number];
  theme: (typeof PRESET_THEMES)[number];
  chartColor?: (typeof PRESET_CHART_COLORS)[number];
  iconLibrary: (typeof PRESET_ICON_LIBRARIES)[number];
  font: (typeof PRESET_FONTS)[number];
  fontHeading: (typeof PRESET_FONT_HEADINGS)[number];
  radius: (typeof PRESET_RADII)[number];
  menuAccent: (typeof PRESET_MENU_ACCENTS)[number];
  menuColor: (typeof PRESET_MENU_COLORS)[number];
}

// ---------------------------------------------------------------------------
// Base62 codec
// ---------------------------------------------------------------------------

const BASE62 =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const VALID_VERSIONS = ["a", "b"] as const;

function fromBase62(str: string): number {
  let result = 0;

  for (let i = 0; i < str.length; i++) {
    const idx = BASE62.indexOf(str[i]!);

    if (idx === -1) {
      return -1;
    }

    result = result * 62 + idx;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Decode a preset code back into a PresetConfig.
 * "a"-prefixed codes use v1 fields (no chartColor / fontHeading).
 * "b"-prefixed codes use v2 fields (with chartColor + fontHeading).
 */
export function decodePreset(code: string): PresetConfig | null {
  if (!code || code.length < 2) {
    return null;
  }

  const version = code[0];

  if (
    !VALID_VERSIONS.includes(version as (typeof VALID_VERSIONS)[number])
  ) {
    return null;
  }

  const fields = version === "a" ? PRESET_FIELDS_V1 : PRESET_FIELDS_V2;

  const bits = fromBase62(code.slice(1));

  if (bits < 0) {
    return null;
  }

  const result: Record<string, string> = {};
  let offset = 0;

  for (const field of fields) {
    const idx = Math.floor(bits / 2 ** offset) % 2 ** field.bits;
    result[field.key] =
      idx < field.values.length ? field.values[idx] : field.values[0];
    offset += field.bits;
  }

  // v1 codes have no fontHeading field — default to "inherit"
  if (version === "a") {
    result["fontHeading"] = "inherit";
  }

  return result as unknown as PresetConfig;
}

/**
 * Check if a string looks like a preset code (version char + base62 digits).
 */
export function isPresetCode(value: string): boolean {
  if (!value || value.length < 2 || value.length > 10) {
    return false;
  }

  if (
    !VALID_VERSIONS.includes(value[0] as (typeof VALID_VERSIONS)[number])
  ) {
    return false;
  }

  for (let i = 1; i < value.length; i++) {
    if (BASE62.indexOf(value[i]!) === -1) {
      return false;
    }
  }

  return true;
}
