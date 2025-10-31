// Favorite Images Storage Service
const STORAGE_KEY = "favoriteImages";

/**
 * Get all favorite images from localStorage
 * @returns {Array} Array of favorite images
 */
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error reading favorites from localStorage:", error);
    return [];
  }
};

/**
 * Save favorite image to localStorage
 * @param {Object} favorite - Favorite image object
 * @param {string} favorite.url - Image URL
 * @param {string} favorite.animal - Animal type
 * @param {string} favorite.breed - Breed name
 * @returns {Array} Updated favorites array
 */
export const addFavorite = (favorite) => {
  try {
    const favorites = getFavorites();

    // Check if already favorited
    const isAlreadyFavorite = favorites.some((fav) => fav.url === favorite.url);
    if (isAlreadyFavorite) {
      return favorites; // Return unchanged if already exists
    }

    const newFavorite = {
      id: Date.now().toString(),
      url: favorite.url,
      animal: favorite.animal,
      breed: favorite.breed || "Unknown",
      addedAt: new Date().toISOString(),
    };

    const updatedFavorites = [...favorites, newFavorite];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));

    return updatedFavorites;
  } catch (error) {
    console.error("Error adding favorite to localStorage:", error);
    return getFavorites();
  }
};

/**
 * Remove favorite image from localStorage
 * @param {string} favoriteId - ID of favorite to remove
 * @returns {Array} Updated favorites array
 */
export const removeFavorite = (favoriteId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((fav) => fav.id !== favoriteId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error("Error removing favorite from localStorage:", error);
    return getFavorites();
  }
};

/**
 * Check if an image is already favorited
 * @param {string} imageUrl - Image URL to check
 * @returns {boolean} True if image is favorited
 */
export const isFavorite = (imageUrl) => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.url === imageUrl);
};

/**
 * Clear all favorites from localStorage
 * @returns {Array} Empty array
 */
export const clearFavorites = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    console.error("Error clearing favorites from localStorage:", error);
    return getFavorites();
  }
};

/**
 * Get favorites by animal type
 * @param {string} animal - Animal type ('cat' or 'dog')
 * @returns {Array} Filtered favorites array
 */
export const getFavoritesByAnimal = (animal) => {
  const favorites = getFavorites();
  return favorites.filter((fav) => fav.animal === animal);
};

/**
 * Get favorites count
 * @returns {number} Number of favorites
 */
export const getFavoritesCount = () => {
  return getFavorites().length;
};
