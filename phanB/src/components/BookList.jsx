import { BookCard } from "./BookCard";

export function BookList({ books, favorites, onToggleFavorite }) {
  if (books.length === 0) {
    return <p>Không tìm thấy cuốn sách nào.</p>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
      {books.map(b => (
        <BookCard 
          key={b.id} 
          book={b} 
          isFavorite={favorites.includes(b.id)} 
          onToggleFavorite={onToggleFavorite} 
        />
      ))}
    </div>
  );
}