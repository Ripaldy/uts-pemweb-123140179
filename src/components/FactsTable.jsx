import React from "react";

const FactsTable = ({ facts, loading, error, onRefresh, animal }) => {
  const formatFact = (fact, index) => {
    return {
      id: index + 1,
      fact: fact,
      type: animal === "cat" ? "Cat Fact" : "Dog Fact",
      category: getFactCategory(fact),
    };
  };

  const getFactCategory = (fact) => {
    const lowerFact = fact.toLowerCase();
    if (
      lowerFact.includes("sleep") ||
      lowerFact.includes("hour") ||
      lowerFact.includes("eat") ||
      lowerFact.includes("food")
    )
      return "Behavior";
    if (
      lowerFact.includes("breed") ||
      lowerFact.includes("species") ||
      lowerFact.includes("persian") ||
      lowerFact.includes("siamese") ||
      lowerFact.includes("labrador") ||
      lowerFact.includes("greyhound")
    )
      return "Breed Info";
    if (
      lowerFact.includes("sense") ||
      lowerFact.includes("smell") ||
      lowerFact.includes("hear") ||
      lowerFact.includes("see") ||
      lowerFact.includes("ability") ||
      lowerFact.includes("whiskers")
    )
      return "Abilities";
    if (
      lowerFact.includes("year") ||
      lowerFact.includes("old") ||
      lowerFact.includes("history") ||
      lowerFact.includes("ancient") ||
      lowerFact.includes("middle ages")
    )
      return "History";
    if (
      lowerFact.includes("teeth") ||
      lowerFact.includes("bone") ||
      lowerFact.includes("muscle") ||
      lowerFact.includes("health") ||
      lowerFact.includes("nose")
    )
      return "Anatomy";
    return "General";
  };

  const formattedFacts = facts.map(formatFact);

  return (
    <section className="facts-section card" aria-labelledby="facts-title">
      <div className="section-header">
        <h2 id="facts-title">{animal === "cat" ? "Cat" : "Dog"} Facts</h2>
        <button
          className="refresh-btn"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Refresh facts"
        >
          {loading ? "Refreshing..." : "Refresh Facts"}
        </button>
      </div>

      {error && (
        <div className="error" role="alert">
          Error loading facts: {error}
        </div>
      )}

      <div className="table-container">
        {formattedFacts.length === 0 ? (
          <div className="no-data">No facts available. Try refreshing.</div>
        ) : (
          <table className="facts-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fact</th>
                <th scope="col">Type</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              {formattedFacts.map((fact) => (
                <tr key={fact.id}>
                  <td className="fact-number">{fact.id}</td>
                  <td className="fact-text">{fact.fact}</td>
                  <td className="fact-type">{fact.type}</td>
                  <td className="fact-category">{fact.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default FactsTable;
