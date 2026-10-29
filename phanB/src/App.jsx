import { useState } from "react";
import { initialBooks } from "./data";
import { Header } from "./components/Header";
import { Section } from "./components/Section";
import { GenreFilter } from "./components/GenreFilter";
import { BookList } from "./components/BookList";
import { Footer } from "./components/Footer";

export default function App() {
  const [books] = useState(initialBooks);
  const [favorites, setFavorites] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("Tất cả");

  const handleToggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const genres = ["Tất cả", ...new Set(books.map(b => b.category))];

  const filteredBooks = books.filter(b => {
    return currentGenre === "Tất cả" || b.category === currentGenre;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f8fafc" }}>
      <Header favCount={favorites.length} />
      
      <main style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "2rem 1rem", flex: 1 }}>
        <Section title="Bộ lọc Thể loại">
          <GenreFilter 
            genres={genres} 
            currentGenre={currentGenre} 
            onSelectGenre={setCurrentGenre} 
          />
        </Section>

        <Section title="Danh sách Sách">
          <BookList 
            books={filteredBooks} 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
          />
        </Section>
      </main>

      <Footer />
    </div>
  );
}