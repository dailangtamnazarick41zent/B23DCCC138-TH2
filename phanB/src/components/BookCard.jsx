export function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", padding: "1rem", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{book.name}</h3>
        <p>Tác giả: {book.author}</p>
        <p>Thể loại: {book.category}</p>
        <p>Năm: {book.year}</p>
      </div>
      <button 
        onClick={() => onToggleFavorite(book.id)}
        style={{
          marginTop: "1rem",
          padding: "0.5rem",
          background: isFavorite ? "#e11d48" : "#f1f5f9",
          color: isFavorite ? "#fff" : "#000",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "600"
        }}
      >
        {isFavorite ? "Đã thích" : "Yêu thích"}
      </button>
    </div>
  );
}