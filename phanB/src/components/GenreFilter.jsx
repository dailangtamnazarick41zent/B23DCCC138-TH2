export function GenreFilter({ genres, currentGenre, onSelectGenre }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      {genres.map(g => (
        <button 
          key={g} 
          onClick={() => onSelectGenre(g)}
          style={{
            padding: "0.5rem 1rem",
            background: currentGenre === g ? "#2563eb" : "#e2e8f0",
            color: currentGenre === g ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {g}
        </button>
      ))}
    </div>
  );
}