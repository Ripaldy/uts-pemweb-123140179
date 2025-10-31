// Dog API Service - menggunakan Dog CEO API untuk gambar dan Dog Facts API
const DOG_BASE_URL = "https://dog.ceo/api";
const DOG_FACTS_API = "https://dog-api.kinduff.com/api/facts";

/**
 * Fetch dog breeds from Dog CEO API
 * @returns {Promise<Array>} Array of breed names
 */
export const fetchDogBreeds = async () => {
  try {
    const response = await fetch(`${DOG_BASE_URL}/breeds/list/all`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Object.keys(data.message);
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
    throw new Error(`Failed to fetch dog breeds: ${error.message}`);
  }
};

/**
 * Fetch random dog images
 * @param {number} count - Number of images to fetch
 * @param {string} breed - Specific breed to fetch
 * @returns {Promise<Array>} Array of image URLs
 */
export const fetchDogImages = async (count = 5, breed = null) => {
  try {
    let url;

    if (breed) {
      const breedPath = breed.toLowerCase().replace(/ /g, "/");
      url = `${DOG_BASE_URL}/breed/${breedPath}/images/random/${count}`;
    } else {
      url = `${DOG_BASE_URL}/breeds/image/random/${count}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.message || data.message.length === 0) {
      throw new Error("No images received from API");
    }

    return data.message;
  } catch (error) {
    console.error("Error fetching dog images:", error);
    // Return placeholder images if API fails
    return getPlaceholderDogImages(count);
  }
};

/**
 * Fetch dog facts from external API
 * @param {number} count - Number of facts to fetch
 * @returns {Promise<Array>} Array of dog facts
 */
export const fetchDogFacts = async (count = 5) => {
  try {
    // Dog Facts API returns one fact per call, so we need multiple calls
    const promises = Array.from({ length: count }, () =>
      fetch(`${DOG_FACTS_API}?number=1`).then((res) => res.json())
    );

    const results = await Promise.all(promises);

    // Extract facts from API response
    const facts = results.map((result) => {
      if (result.success && result.facts && result.facts.length > 0) {
        return result.facts[0];
      }
      return getFallbackDogFact();
    });

    return facts;
  } catch (error) {
    console.error("Error fetching dog facts from API:", error);
    // If API fails, use multiple fallback facts
    return getFallbackDogFacts(count);
  }
};

/**
 * Get placeholder dog images when API fails
 */
const getPlaceholderDogImages = (count) => {
  const baseUrl = "https://placedog.net";
  const images = [];

  for (let i = 0; i < count; i++) {
    const width = 200 + Math.floor(Math.random() * 100);
    const height = 200 + Math.floor(Math.random() * 100);
    const imageId = Math.floor(Math.random() * 1000);
    images.push(`${baseUrl}/${width}/${height}?id=${imageId}`);
  }

  return images;
};

/**
 * Get single fallback dog fact
 */
const getFallbackDogFact = () => {
  const fallbackFacts = [
    "Dogs have an exceptional sense of smell, about 10,000 to 100,000 times more acute than humans.",
    "The Basenji dog is the only breed that doesn't bark, but they can yodel.",
    "Dogs have three eyelids: an upper lid, a lower lid, and a third lid called a nictitating membrane.",
    "A dog's nose print is unique, much like a human's fingerprint.",
    "Dogs can understand up to 250 words and gestures, and can count up to five.",
  ];

  return fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
};

/**
 * Get fallback dog facts in case of errors
 * @returns {Array} Array of fallback dog facts
 */
export const getFallbackDogFacts = (count = 5) => {
  const allFacts = [
    "The Greyhound can reach speeds of up to 45 miles per hour.",
    "Dogs can see in color, but not as vividly as humans.",
    "A dog's whiskers help them detect subtle changes in air currents.",
    "Dogs have about 1,700 taste buds compared to humans' 9,000.",
    "Dogs dream like humans - small dogs dream more frequently than larger dogs.",
    "Dogs have an exceptional sense of smell, about 10,000 to 100,000 times more acute than humans.",
    "The Basenji dog is the only breed that doesn't bark, but they can yodel.",
    "Dogs have three eyelids: an upper lid, a lower lid, and a third lid called a nictitating membrane.",
    "A dog's nose print is unique, much like a human's fingerprint.",
    "Dogs can understand up to 250 words and gestures, and can count up to five.",
    "The Saluki is the oldest dog breed, dating back to 329 BC.",
    "A dog's sense of hearing is more than ten times more acute than a human's.",
    "Dogs sweat through the pads of their feet.",
    "The Labrador Retriever has been the most popular dog breed since 1991.",
    "Dogs have 42 teeth on average.",
  ];

  return allFacts.sort(() => 0.5 - Math.random()).slice(0, count);
};
