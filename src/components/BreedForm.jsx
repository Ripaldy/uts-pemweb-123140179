import React, { useState, useEffect } from "react";
import { animalApi, handleApiError } from "../services/api";

const BreedForm = ({
  animal,
  onBreedSelect,
  onImageCountChange,
  onGalleryTypeChange,
  onAutoRefreshChange,
  onRefreshIntervalChange,
}) => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    breed: "",
    imageCount: 5,
    galleryType: "random",
    autoRefresh: false,
    refreshInterval: 30,
  });

  useEffect(() => {
    fetchBreeds();
  }, [animal]);

  const fetchBreeds = async () => {
    setLoading(true);
    try {
      const breedList = await animalApi.fetchBreeds(animal);
      setBreeds(breedList);

      if (breedList.length > 0) {
        const newFormData = { ...formData, breed: breedList[0] };
        setFormData(newFormData);
        onBreedSelect(breedList[0]);
      }
    } catch (error) {
      const errorMessage = handleApiError(error, "Failed to load breeds");
      console.error(errorMessage);
      const defaultBreeds =
        animal === "cat"
          ? ["Siamese", "Persian", "Maine Coon", "Bengal", "Ragdoll"]
          : [
              "Labrador",
              "German Shepherd",
              "Golden Retriever",
              "Bulldog",
              "Beagle",
            ];
      setBreeds(defaultBreeds);

      if (defaultBreeds.length > 0) {
        const newFormData = { ...formData, breed: defaultBreeds[0] };
        setFormData(newFormData);
        onBreedSelect(defaultBreeds[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    switch (field) {
      case "breed":
        onBreedSelect(value);
        break;
      case "imageCount":
        onImageCountChange(parseInt(value));
        break;
      case "galleryType":
        onGalleryTypeChange(value);
        break;
      case "autoRefresh":
        onAutoRefreshChange(value);
        break;
      case "refreshInterval":
        onRefreshIntervalChange(parseInt(value));
        break;
      default:
        break;
    }
  };

  return (
    <section className="breed-form-section" aria-labelledby="form-title">
      <div className="breed-form-header">
        <h2 id="form-title">Animal Selection & Preferences</h2>
        <div className="auto-refresh-toggle">
          <label htmlFor="auto-refresh">
            <input
              id="auto-refresh"
              type="checkbox"
              checked={formData.autoRefresh}
              onChange={(e) =>
                handleInputChange("autoRefresh", e.target.checked)
              }
            />
            Auto Refresh
          </label>
        </div>
      </div>

      <form className="breed-form" onSubmit={(e) => e.preventDefault()}>
        {/* Breed Selection */}
        <div className="form-group">
          <label htmlFor="animal-breed">Breed:</label>
          <select
            id="animal-breed"
            value={formData.breed}
            onChange={(e) => handleInputChange("breed", e.target.value)}
            required
            disabled={loading}
          >
            {loading ? (
              <option>Loading...</option>
            ) : (
              breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed.charAt(0).toUpperCase() + breed.slice(1)}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Image Count */}
        <div className="form-group">
          <label htmlFor="image-count">Images:</label>
          <input
            id="image-count"
            type="number"
            min="1"
            max="20"
            value={formData.imageCount}
            onChange={(e) => handleInputChange("imageCount", e.target.value)}
            required
          />
        </div>

        {/* Gallery Type */}
        <div className="form-group">
          <label htmlFor="gallery-type">Type:</label>
          <select
            id="gallery-type"
            value={formData.galleryType}
            onChange={(e) => handleInputChange("galleryType", e.target.value)}
          >
            <option value="random">Random</option>
            <option value="breed">Breed</option>
          </select>
        </div>

        {/* Refresh Interval */}
        <div
          className={`refresh-interval-group ${
            formData.autoRefresh ? "enabled" : ""
          }`}
        >
          <label htmlFor="refresh-interval">Interval:</label>
          <input
            id="refresh-interval"
            type="number"
            min="10"
            max="300"
            value={formData.refreshInterval}
            onChange={(e) =>
              handleInputChange("refreshInterval", e.target.value)
            }
            disabled={!formData.autoRefresh}
          />
        </div>
      </form>
    </section>
  );
};

export default BreedForm;
