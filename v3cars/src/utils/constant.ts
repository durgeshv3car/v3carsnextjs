export let BASE_URL: string;


export const IMAGE_URL = "https://www.v3cars.com"
export const IMAGE_URL2 = "https://lms.v3cars.com"

if (typeof window !== "undefined") {
  if (window.location.origin.includes("localhost")) {
    BASE_URL = "http://localhost:5006/v1";
  } else {
    BASE_URL = "https://dev2.v3cars.com/v1";
  }
} else {
  BASE_URL = "https://dev2.v3cars.com/v1";
}

export const TEST_DRIVE_IMAGE_BASE_URL = `https://lms.v3cars.com/api/v2`;
export const OTHER_MEDIA_IMAGE_BASE_URL = `https://www.v3cars.com/media`;
export const WEBSITE_URL = `https://www.v3cars.com`;

/**
 * Capitalizes the first letter of each word, preserving "NCR" as uppercase.
 */

export function capitalizeFirstLetter(input: string): string {
  return input
    .split('-')
    .map(part =>
      part.toLowerCase() === 'ncr'
        ? 'NCR'
        : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    )
    .join('-');
}

  
  
/**
 * Truncates a string to a given number of words, stripping out any HTML tags.
 */



export function truncateWords(htmlString: string, wordLimit: number): string {
  if (!htmlString) return "";

  const plainText = htmlString.replace(/<[^>]+>/g, "");
  const words = plainText.split(/\s+/);

  if (words.length <= wordLimit) return plainText;

  return words.slice(0, wordLimit).join(" ") + "...";
}

 




 