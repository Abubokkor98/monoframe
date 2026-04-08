/**
 * Resolves the correct font configuration from the user's shadcn settings.
 *
 * Works for both built-in presets (nova, vega, lyra, etc.) and custom preset
 * codes (e.g. "b1t3qhXaz") by decoding the code to extract the font slug.
 */

import { type FontConfig, FONT_MAP, DEFAULT_FONT_CONFIG } from "../constants/font-map.js";
import { decodePreset } from "./preset-decoder.js";
import { type ShadcnConfig } from "../types/config.js";

/**
 * Known font slugs for each built-in preset.
 * Source: shadcn DEFAULT_PRESETS in packages/shadcn/src/preset/presets.ts
 */
const BUILT_IN_PRESET_FONTS: Record<string, string> = {
  nova: "geist",
  vega: "inter",
  maia: "figtree",
  lyra: "jetbrains-mono",
  mira: "inter",
  luma: "inter",
};

/**
 * Resolve the font config from a shadcn config object.
 *
 * Priority:
 *   1. Custom preset code → decode to extract font slug
 *   2. Built-in preset → lookup from known mapping
 *   3. Fallback → Inter (universal safe default)
 */
export function resolveFont(shadcnConfig: ShadcnConfig): FontConfig {
  if (!shadcnConfig.enabled) {
    return DEFAULT_FONT_CONFIG;
  }

  const fontSlug = resolveFontSlug(shadcnConfig);

  return FONT_MAP[fontSlug] ?? DEFAULT_FONT_CONFIG;
}

function resolveFontSlug(shadcnConfig: ShadcnConfig): string {
  // Custom preset code — decode to extract font
  if (shadcnConfig.preset === "custom" && shadcnConfig.customPresetCode) {
    const decoded = decodePreset(shadcnConfig.customPresetCode);

    if (decoded) {
      return decoded.font;
    }

    // Decode failed — fall through to default
    return "inter";
  }

  // Built-in preset — lookup from known mapping
  return BUILT_IN_PRESET_FONTS[shadcnConfig.preset] ?? "inter";
}

export type { FontConfig };
