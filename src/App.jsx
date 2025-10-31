import React, { useState, useEffect, useCallback } from "react";
import AnimalNavigation from "./components/AnimalNavigation";
import BreedForm from "./components/BreedForm";
import GalleryGrid from "./components/GalleryGrid";
import FactsTable from "./components/FactsTable";
import FavoriteImages from "./components/FavoriteImages";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { animalApi, handleApiError } from "./services/api";
import {
  addFavorite,
  removeFavorite,
} from "./services/storage/favoriteService";
import "./styles/main.css";

const App = () => {
  const [currentAnimal, setCurrentAnimal] = useState("cat");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [imageCount, setImageCount] = useState(5);
  const [galleryType, setGalleryType] = useState("random");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);

  const [images, setImages] = useState([]);
  const [facts, setFacts] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [factsLoading, setFactsLoading] = useState(false);
  const [imagesError, setImagesError] = useState("");
  const [factsError, setFactsError] = useState("");

  const [favoriteImages, setFavoriteImages] = useLocalStorage(
    "favoriteImages",
    []
  );

  // Fetch animal images menggunakan service API
  const fetchImages = useCallback(async () => {
    setImagesLoading(true);
    setImagesError("");

    try {
      const imageUrls = await animalApi.fetchImages(
        currentAnimal,
        imageCount,
        selectedBreed,
        galleryType
      );
      setImages(imageUrls);
    } catch (error) {
      const errorMessage = handleApiError(error, "Failed to load images");
      setImagesError(errorMessage);
      setImages([]);
    } finally {
      setImagesLoading(false);
    }
  }, [currentAnimal, selectedBreed, imageCount, galleryType]);

  // Fetch animal facts menggunakan service API
  const fetchFacts = useCallback(async () => {
    setFactsLoading(true);
    setFactsError("");

    try {
      const factsData = await animalApi.fetchFacts(currentAnimal, 5);
      setFacts(factsData);
    } catch (error) {
      const errorMessage = handleApiError(error, "Failed to load facts");
      setFactsError(errorMessage);

      // Use fallback facts
      const fallbackFacts = await animalApi.getFallbackFacts(currentAnimal);
      setFacts(fallbackFacts);
    } finally {
      setFactsLoading(false);
    }
  }, [currentAnimal]);

  // Initial data fetch
  useEffect(() => {
    fetchImages();
    fetchFacts();
  }, [fetchImages, fetchFacts]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchImages();
      fetchFacts();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchImages, fetchFacts]);

  // Favorite images functionality menggunakan storage service
  const addToFavorites = (imageUrl) => {
    const newFavorites = addFavorite({
      url: imageUrl,
      animal: currentAnimal,
      breed: selectedBreed,
    });
    setFavoriteImages(newFavorites);
  };

  const removeFromFavorites = (favoriteId) => {
    const newFavorites = removeFavorite(favoriteId);
    setFavoriteImages(newFavorites);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Animal Facts & Images</h1>
        <p>Explore fascinating facts and beautiful images of cats and dogs</p>
      </header>

      <main>
        <AnimalNavigation
          currentAnimal={currentAnimal}
          onAnimalChange={setCurrentAnimal}
        />

        <BreedForm
          animal={currentAnimal}
          onBreedSelect={setSelectedBreed}
          onImageCountChange={setImageCount}
          onGalleryTypeChange={setGalleryType}
          onAutoRefreshChange={setAutoRefresh}
          onRefreshIntervalChange={setRefreshInterval}
        />

        <GalleryGrid
          images={images}
          loading={imagesLoading}
          error={imagesError}
          onAddFavorite={addToFavorites}
          favoriteImages={favoriteImages}
        />

        <FactsTable
          facts={facts}
          loading={factsLoading}
          error={factsError}
          onRefresh={fetchFacts}
          animal={currentAnimal}
        />

        <FavoriteImages
          favoriteImages={favoriteImages}
          onRemoveFavorite={removeFromFavorites}
        />
      </main>
    </div>
  );
};

export default App;
