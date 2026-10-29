import { Book } from "./types";

export async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await fetch("./books.json");
    if (!response.ok) throw new Error("Không thể tải danh sách sách");
    const data: Book[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function getStoredFavorites(): string[] {
  const data = localStorage.getItem("library_favorites");
  return data ? JSON.parse(data) : [];
}

export function saveStoredFavorites(favs: string[]): void {
  localStorage.setItem("library_favorites", JSON.stringify(favs));
}