import React from "react";

const GalleryGrid = ({
  images,
  loading,
  error,
  onAddFavorite,
  favoriteImages,
}) => {
  const checkIsFavorite = (imageUrl) => {
    return favoriteImages.some((fav) => fav.url === imageUrl);
  };

  // Placeholder image base64
  const placeholderImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==";

  const handleImageError = (e) => {
    e.target.src = placeholderImage;
    e.target.alt = "Image not available";
  };

  if (loading) {
    return (
      <section className="gallery-section" aria-labelledby="gallery-title">
        <h2 id="gallery-title">Animal Gallery</h2>
        <div className="loading" aria-live="polite">
          <div className="loading-spinner"></div>
          Loading images...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="gallery-section" aria-labelledby="gallery-title">
        <h2 id="gallery-title">Animal Gallery</h2>
        <div className="error" role="alert">
          <strong>Error loading images:</strong> {error}
          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
            style={{ marginLeft: "10px", padding: "5px 10px" }}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section" aria-labelledby="gallery-title">
      <h2 id="gallery-title">Animal Gallery</h2>
      {images.length === 0 ? (
        <div className="no-images">
          <p>
            No images to display. Try refreshing or changing your selection.
          </p>
          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      ) : (
        <div className="gallery-grid">
          {images.map((image, index) => (
            <article key={`${image}-${index}`} className="gallery-item">
              <div className="image-container">
                <img
                  src={image}
                  alt={`Animal ${index + 1}`}
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="image-overlay">
                  <span className="image-number">#{index + 1}</span>
                </div>
              </div>
              <button
                className={`favorite-btn ${
                  checkIsFavorite(image) ? "favorited" : ""
                }`}
                onClick={() => onAddFavorite(image)}
                aria-label={
                  checkIsFavorite(image)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                title={
                  checkIsFavorite(image)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {checkIsFavorite(image) ? "❤️" : "🤍"}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default GalleryGrid;
