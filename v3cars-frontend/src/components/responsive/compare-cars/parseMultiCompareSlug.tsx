type ParsedVariant = {
  brandSlug: string;
  modelSlug: string;
  powertrain: string;
  variantName: string;
};

export function parseMultiCompareSlug(slug: string): ParsedVariant[] {
  if (!slug) return [];

  return slug.split("-vs-").map((part) => {
    const sections = part.split("--");

    const brandSlug = sections[0] || "";
    const modelSlug = sections[1] || "";

    const powertrain = sections[2]
      ? sections[2].replace(/-/g, " ")
      : "";

    const variantName = sections[3]
      ? sections[3].replace(/-/g, " ")
      : "";

    return {
      brandSlug,
      modelSlug,
      powertrain,
      variantName,
    };
  });
}


type SlugParts = {
  brandSlug?: string;
  modelSlug?: string;
  powertrain?: string;
  variantName?: string;
};

export function buildCarSlug(parts: SlugParts): string | null {
  const { brandSlug, modelSlug, powertrain, variantName } = parts;

  // 🔒 Guard: incomplete card → slug mat banao
  if (!brandSlug || !modelSlug || !powertrain || !variantName) {
    return null;
  }

  const powertrainSlug = powertrain.trim().replace(/\s+/g, "-");

  const variantSlug = variantName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")

  return [
    brandSlug,
    modelSlug,
    powertrainSlug,
    variantSlug,
  ].join("--");
}