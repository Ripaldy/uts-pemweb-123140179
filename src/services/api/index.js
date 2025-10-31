// Main API service - exports all API functions
export * from "./catApi";
export * from "./dogApi";

/**
 * Main animal API service
 */
export const animalApi = {
  // Breed functions
  fetchBreeds: async (animal) => {
    try {
      if (animal === "cat") {
        const module = await import("./catApi");
        return module.fetchCatBreeds();
      } else {
        const module = await import("./dogApi");
        return module.fetchDogBreeds();
      }
    } catch (error) {
      console.error(`Error fetching ${animal} breeds:`, error);
      throw error;
    }
  },

  // Image functions dengan retry mechanism
  fetchImages: async (animal, count, breed = null, galleryType = "random") => {
    const maxRetries = 2;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        if (animal === "cat") {
          const module = await import("./catApi");
          return await module.fetchCatImages(
            count,
            galleryType === "breed" ? breed : null
          );
        } else {
          const module = await import("./dogApi");
          return await module.fetchDogImages(
            count,
            galleryType === "breed" ? breed : null
          );
        }
      } catch (error) {
        console.warn(
          `Attempt ${attempt} failed for ${animal} images:`,
          error.message
        );

        if (attempt === maxRetries) {
          console.error(`All attempts failed for ${animal} images`);
          throw error;
        }

        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  },

  // Fact functions - SEKARANG SEMUA DARI API
  fetchFacts: async (animal, count = 5) => {
    try {
      if (animal === "cat") {
        const module = await import("./catApi");
        return await module.fetchCatFacts(count);
      } else {
        const module = await import("./dogApi");
        return await module.fetchDogFacts(count); 
      }
    } catch (error) {
      console.error(`Error fetching ${animal} facts:`, error);
      throw error;
    }
  },

  // Fallback facts
  getFallbackFacts: async (animal) => {
    if (animal === "cat") {
      const module = await import("./catApi");
      return module.getFallbackCatFacts();
    } else {
      const module = await import("./dogApi");
      return module.getFallbackDogFacts();
    }
  },
};

/**
 * Utility function to handle API errors
 */
export const handleApiError = (error, defaultMessage = "An error occurred") => {
  console.error("API Error:", error);

  if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
    return "Network error: Please check your internet connection";
  }

  if (error.message.includes("No images received")) {
    return "No images available for the selected breed. Try a different breed or random selection.";
  }

  return error.message || defaultMessage;
};

/**
 * Delay utility for testing loading states
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Validate image URL
 */
export const isValidImageUrl = (url) => {
  if (!url) return false;

  try {
    new URL(url);
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  } catch {
    return false;
  }
};
