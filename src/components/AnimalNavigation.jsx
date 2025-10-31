import React from "react";

const AnimalNavigation = ({ currentAnimal, onAnimalChange }) => {
  return (
    <nav
      className="animal-navigation"
      role="navigation"
      aria-label="Animal selection"
    >
      <div className="nav-buttons">
        <button
          className={`nav-button ${currentAnimal === "cat" ? "active" : ""}`}
          onClick={() => onAnimalChange("cat")}
          aria-pressed={currentAnimal === "cat"}
        >
          Cats
        </button>
        <button
          className={`nav-button ${currentAnimal === "dog" ? "active" : ""}`}
          onClick={() => onAnimalChange("dog")}
          aria-pressed={currentAnimal === "dog"}
        >
          Dogs
        </button>
      </div>
    </nav>
  );
};

export default AnimalNavigation;
