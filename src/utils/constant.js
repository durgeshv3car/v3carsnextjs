export let BASE_URL;

if (typeof window !== "undefined") {

    if (window.location.origin.includes("localhost")) {
        BASE_URL = "http://localhost:5006/api/v2";
    }

    else {
        BASE_URL = "https://dev2.v3cars.com/api/v2";
    }

} else {
    BASE_URL = "https://dev2.v3cars.com/api/v2";
}

export const TEST_DRIVE_IMAGE_BASE_URL = `https://lms.v3cars.com/api/v2`;

export const OTHER_MEDIA_IMAGE_BASE_URL = `https://www.v3cars.com/media`;

export const WEBSITE_URL = `https://www.v3cars.com`;

export function capitalizeFirstLetter(string) {
    return string
        .split('-')
        .map(part => part.toLowerCase() === 'ncr'
            ? 'NCR'
            : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join('-');
}


export function truncateWords(htmlString, wordLimit) {
  if (!htmlString) return "";

  // Strip HTML tags first
  const plainText = htmlString.replace(/<[^>]+>/g, "");
  const words = plainText.split(/\s+/);

  if (words.length <= wordLimit) return plainText;

  return words.slice(0, wordLimit).join(" ") + "...";
}