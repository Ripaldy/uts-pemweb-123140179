import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

const FavoriteImages = ({ favoriteImages, onRemoveFavorite }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    action: null,
    targetId: null,
  });

  // --- Logika Hapus Satu Item ---
  const handleRemoveClick = (favoriteId) => {
    setModalState({
      isOpen: true,
      action: "removeOne", // Set aksi 'hapus satu'
      targetId: favoriteId,
    });
  };

  // --- Logika Hapus Semua Item ---
  const handleClearAllClick = () => {
    if (favoriteImages.length === 0) return;
    setModalState({
      isOpen: true,
      action: "clearAll", // Set aksi 'hapus semua'
      targetId: null,
    });
  };

  // --- Logika Modal ---
  const handleCloseModal = () => {
    setModalState({ isOpen: false, action: null, targetId: null });
  };

  const handleModalConfirm = () => {
    if (modalState.action === "removeOne") {
      onRemoveFavorite(modalState.targetId);
    } else if (modalState.action === "clearAll") {
      favoriteImages.forEach((fav) => onRemoveFavorite(fav.id));
    }

    
    handleCloseModal();
  };

  const placeholderImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtcWl6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==";

  const handleImageError = (e) => {
    e.target.src = placeholderImage;
    e.target.alt = "Image not available";
  };

  if (favoriteImages.length === 0) {
    return (
      <section className="favorites-section" aria-labelledby="favorites-title">
        <h2 id="favorites-title">Favorite Images</h2>
        <div className="no-favorites">
          <p>No favorite images yet. Add some from the gallery!</p>
          <div className="favorites-instruction">
            💡 Click the heart icon on any image in the gallery to add it to
            favorites.
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="favorites-section" aria-labelledby="favorites-title">
        <div className="favorites-header">
          <h2 id="favorites-title">
            Favorite Images ({favoriteImages.length})
          </h2>
          <button
            className="clear-all-btn"
            onClick={handleClearAllClick} 
            aria-label="Clear all favorites"
            disabled={favoriteImages.length === 0}
          >
            Clear All
          </button>
        </div>

        <div className="favorites-grid">
          {favoriteImages.map((fav) => (
            <article key={fav.id} className="favorite-item">
              <div className="favorite-image-container">
                <img
                  src={fav.url}
                  alt={`Favorite ${fav.animal} - ${fav.breed}`}
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>
              <div className="favorite-info">
                <div className="favorite-meta">
                  <span className={`animal-badge ${fav.animal}`}>
                    {fav.animal === "cat" ? "" : ""} {fav.animal.toUpperCase()}
                  </span>
                  <span className="breed-name">{fav.breed}</span>
                </div>
                <small className="added-date">
                  Added:{" "}
                  {new Date(fav.addedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveClick(fav.id)}
                aria-label={`Remove ${fav.animal} image from favorites`}
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Modal ini sekarang menangani kedua aksi */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleModalConfirm}
        
        title={
          modalState.action === "clearAll"
            ? "Clear All Favorites"
            : "Remove Favorite"
        }
        message={
          modalState.action === "clearAll"
            ? "Are you sure you want to remove ALL favorites? This cannot be undone."
            : "Are you sure you want to remove this image from favorites?"
        }
      />
    </>
  );
};

export default FavoriteImages;
