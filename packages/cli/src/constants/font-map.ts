/**
 * Maps shadcn font slugs to their Next.js font loader configuration.
 *
 * Each slug comes from PRESET_FONTS in preset-decoder.ts (ported from
 * shadcn's source). The font config tells the layout template which
 * import to use, which CSS variable to set, and whether the `geist`
 * npm package is required.
 */

export interface FontConfig {
  /** The font constructor name used in the import, e.g. "JetBrains_Mono" */
  importName: string;

  /** The module to import from, e.g. "next/font/google" or "geist/font/sans" */
  importPackage: string;

  /** The CSS custom property set on the <html> element, e.g. "--font-mono" */
  cssVariable: string;

  /** The Tailwind utility class applied to <html>, e.g. "font-mono" */
  tailwindClass: string;

  /** Whether this font requires the `geist` npm package as a dependency */
  needsGeistPackage: boolean;
}

// Helper to reduce repetition when defining sans/mono/serif Google fonts
function googleSans(importName: string): FontConfig {
  return {
    importName,
    importPackage: "next/font/google",
    cssVariable: "--font-sans",
    tailwindClass: "font-sans",
    needsGeistPackage: false,
  };
}

function googleMono(importName: string): FontConfig {
  return {
    importName,
    importPackage: "next/font/google",
    cssVariable: "--font-mono",
    tailwindClass: "font-mono",
    needsGeistPackage: false,
  };
}

function googleSerif(importName: string): FontConfig {
  return {
    importName,
    importPackage: "next/font/google",
    cssVariable: "--font-serif",
    tailwindClass: "font-serif",
    needsGeistPackage: false,
  };
}

/**
 * Complete mapping of all 24 font slugs from PRESET_FONTS.
 * Order matches the shadcn preset array exactly.
 */
export const FONT_MAP: Record<string, FontConfig> = {
  // Sans fonts (Google)
  "inter": googleSans("Inter"),
  "noto-sans": googleSans("Noto_Sans"),
  "nunito-sans": googleSans("Nunito_Sans"),
  "figtree": googleSans("Figtree"),
  "roboto": googleSans("Roboto"),
  "raleway": googleSans("Raleway"),
  "dm-sans": googleSans("DM_Sans"),
  "public-sans": googleSans("Public_Sans"),
  "outfit": googleSans("Outfit"),
  "manrope": googleSans("Manrope"),
  "space-grotesk": googleSans("Space_Grotesk"),
  "montserrat": googleSans("Montserrat"),
  "ibm-plex-sans": googleSans("IBM_Plex_Sans"),
  "source-sans-3": googleSans("Source_Sans_3"),
  "instrument-sans": googleSans("Instrument_Sans"),

  // Mono fonts (Google)
  "jetbrains-mono": googleMono("JetBrains_Mono"),
  "oxanium": googleMono("Oxanium"),

  // Serif fonts (Google)
  "lora": googleSerif("Lora"),
  "merriweather": googleSerif("Merriweather"),
  "playfair-display": googleSerif("Playfair_Display"),
  "noto-serif": googleSerif("Noto_Serif"),
  "roboto-slab": googleSerif("Roboto_Slab"),

  // Geist fonts (npm package)
  "geist": {
    importName: "GeistSans",
    importPackage: "geist/font/sans",
    cssVariable: "--font-sans",
    tailwindClass: "font-sans",
    needsGeistPackage: true,
  },
  "geist-mono": {
    importName: "GeistMono",
    importPackage: "geist/font/mono",
    cssVariable: "--font-mono",
    tailwindClass: "font-mono",
    needsGeistPackage: true,
  },
};

/** The default font used when no preset info is available. */
export const DEFAULT_FONT_CONFIG: FontConfig = FONT_MAP["inter"]!;
