// Cat API Service - menggunakan Cat Facts API dan multiple image APIs
const CAT_FACTS_BASE_URL = "https://catfact.ninja";

// Multiple free cat image APIs as fallbacks
const CAT_IMAGE_APIS = [
  "https://api.thecatapi.com/v1/images/search",
  "https://cataas.com/cat?json=true",
  "https://aws.random.cat/meow",
];

/**
 * Fetch cat breeds from Cat Facts API
 * @returns {Promise<Array>} Array of breed names
 */
export const fetchCatBreeds = async () => {
  try {
    const response = await fetch(`${CAT_FACTS_BASE_URL}/breeds`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.map((breed) => breed.breed);
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
    throw new Error(`Failed to fetch cat breeds: ${error.message}`);
  }
};

/**
 * Fetch random cat facts
 * @param {number} count - Number of facts to fetch
 * @returns {Promise<Array>} Array of cat facts
 */
export const fetchCatFacts = async (count = 5) => {
  try {
    const promises = Array.from({ length: count }, () =>
      fetch(`${CAT_FACTS_BASE_URL}/fact`).then((res) => res.json())
    );

    const results = await Promise.all(promises);
    return results.map((result) => result.fact);
  } catch (error) {
    console.error("Error fetching cat facts:", error);
    throw new Error(`Failed to fetch cat facts: ${error.message}`);
  }
};

/**
 * Fetch random cat images dengan multiple fallback APIs
 * @param {number} count - Number of images to fetch
 * @param {string} breed - Breed filter (limited support)
 * @returns {Promise<Array>} Array of image URLs
 */
export const fetchCatImages = async (count = 5, breed = null) => {
  try {
    const imageUrls = [];

    for (let i = 0; i < count; i++) {
      const imageUrl = await fetchSingleCatImage(breed);
      imageUrls.push(imageUrl);
    }

    return imageUrls;
  } catch (error) {
    console.error("Error fetching cat images:", error);
    throw new Error(`Failed to fetch cat images: ${error.message}`);
  }
};

/**
 * Fetch single cat image dengan fallback mechanism
 */
const fetchSingleCatImage = async (breed = null) => {
  // Try each API in order until one works
  for (const apiUrl of CAT_IMAGE_APIS) {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) continue;

      const data = await response.json();

      let imageUrl;

      if (apiUrl.includes("thecatapi.com")) {
        // The Cat API structure
        imageUrl = data[0]?.url;
      } else if (apiUrl.includes("cataas.com")) {
        // Cataas API structure
        imageUrl = data.url ? `https://cataas.com${data.url}` : null;
      } else if (apiUrl.includes("random.cat")) {
        // Random Cat API structure
        imageUrl = data.file;
      }

      if (imageUrl && isValidImageUrl(imageUrl)) {
        return imageUrl;
      }
    } catch (error) {
      console.warn(`API ${apiUrl} failed:`, error.message);
      continue;
    }
  }

  // If all APIs fail, return placeholder images
  return getPlaceholderCatImage();
};

/**
 * Validate image URL
 */
const isValidImageUrl = (url) => {
  return url && (url.startsWith("http") || url.startsWith("https"));
};

/**
 * Get placeholder cat image when APIs fail
 */
const getPlaceholderCatImage = () => {
  const placeholders = [
    "https://placekitten.com/200/200",
    "https://placekitten.com/201/201",
    "https://placekitten.com/199/199",
    "https://placekitten.com/202/202",
    "https://placekitten.com/198/198",
  ];

  return placeholders[Math.floor(Math.random() * placeholders.length)];
};

/**
 * Get fallback cat facts in case API fails
 * @returns {Array} Array of fallback cat facts
 */
export const getFallbackCatFacts = () => [
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats can jump up to 6 times their body length.",
  "Cats have 32 muscles in each ear.",
  "The richest cat in the world had £7 million fortune.",
  "Cats sleep for 12-16 hours a day on average.",
  "A group of cats is called a clowder.",
  "Cats have whiskers on the backs of their front legs too.",
  "The oldest known pet cat existed 9,500 years ago.",
  "Cats can rotate their ears 180 degrees.",
  "Cats have 230 bones in their body (humans have 206).",
];
