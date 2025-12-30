export const convertToSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
};

export const convertToName = (slug: string): string => {
  if (!slug) return "";

  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export const normalize = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");


export const formatINRCompact = (value: number) => {
  if (value >= 1_00_00_000) {
    return (value / 1_00_00_000).toFixed(2).replace(/\.00$/, "") + " Cr";
  }

  if (value >= 1_00_000) {
    return (value / 1_00_000).toFixed(2).replace(/\.00$/, "") + " Lakh";
  }

  if (value >= 1_000) {
    return (value / 1_000).toFixed(2).replace(/\.00$/, "") + " K";
  }

  return value.toString();
};