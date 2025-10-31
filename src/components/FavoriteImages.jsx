import React from "react";

const FavoriteImages = ({ favoriteImages, onRemoveFavorite }) => {
  const handleRemoveFavorite = (favoriteId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this image from favorites?"
      )
    ) {
      onRemoveFavorite(favoriteId);
    }
  };

  const clearAllFavorites = () => {
    if (window.confirm("Are you sure you want to remove all favorites?")) {
      favoriteImages.forEach((fav) => onRemoveFavorite(fav.id));
    }
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
    <section className="favorites-section" aria-labelledby="favorites-title">
      <div className="favorites-header">
        <h2 id="favorites-title">Favorite Images ({favoriteImages.length})</h2>
        <button
          className="clear-all-btn"
          onClick={clearAllFavorites}
          aria-label="Clear all favorites"
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
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==";
                }}
              />
              <button
                className="remove-btn"
                onClick={() => handleRemoveFavorite(fav.id)}
                aria-label={`Remove ${fav.animal} image from favorites`}
              >
                ❌ Remove
              </button>
            </div>
            <div className="favorite-info">
              <div className="favorite-meta">
                <span className={`animal-badge ${fav.animal}`}>
                  {fav.animal.toUpperCase()}
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
          </article>
        ))}
      </div>
    </section>
  );
};

export default FavoriteImages;
