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