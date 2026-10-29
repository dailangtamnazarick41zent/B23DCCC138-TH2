var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchBooks, getStoredFavorites, saveStoredFavorites } from "./storage";
let books = [];
let favorites = getStoredFavorites();
let currentGenre = "Tất cả";
let searchTerm = "";
const bookGrid = document.querySelector("#book-grid");
const searchInput = document.querySelector("#search-input");
const genreFilter = document.querySelector("#genre-filter");
const statusText = document.querySelector("#status-text");
const favCount = document.querySelector("#fav-count");
const themeToggle = document.querySelector("#theme-toggle");
const addBookForm = document.querySelector("#add-book-form");
const nameInput = document.querySelector("#book-name");
const authorInput = document.querySelector("#book-author");
const categoryInput = document.querySelector("#book-category");
const yearInput = document.querySelector("#book-year");
const errName = document.querySelector("#error-name");
const errAuthor = document.querySelector("#error-author");
const errCategory = document.querySelector("#error-category");
const errYear = document.querySelector("#error-year");
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        statusText.textContent = "Đang tải...";
        try {
            books = yield fetchBooks();
            renderFavoritesCount();
            renderGenres();
            renderBooks();
            setupEvents();
        }
        catch (err) {
            statusText.textContent = "Lỗi khi tải dữ liệu sách.";
        }
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
        }
    });
}
function renderFavoritesCount() {
    favCount.textContent = favorites.length.toString();
}
function renderGenres() {
    const genres = new Set();
    books.forEach(b => genres.add(b.category));
    let html = `<button class="genre-btn ${currentGenre === 'Tất cả' ? 'active' : ''}" data-genre="Tất cả">Tất cả</button>`;
    genres.forEach(g => {
        html += `<button class="genre-btn ${currentGenre === g ? 'active' : ''}" data-genre="${g}">${g}</button>`;
    });
    genreFilter.innerHTML = html;
}
function getFilteredBooks() {
    return books.filter(b => {
        const matchSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchGenre = currentGenre === "Tất cả" || b.category === currentGenre;
        return matchSearch && matchGenre;
    });
}
function renderBooks() {
    const filtered = getFilteredBooks();
    statusText.textContent = `Đang hiển thị ${filtered.length} / ${books.length} cuốn`;
    if (filtered.length === 0) {
        bookGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Không tìm thấy cuốn sách nào phù hợp.</p>`;
        return;
    }
    bookGrid.innerHTML = "";
    filtered.forEach(b => {
        const isFav = favorites.includes(b.id);
        const card = document.createElement("div");
        card.className = `book-card ${isFav ? 'favorite' : ''}`;
        card.dataset.id = b.id;
        card.innerHTML = `
      <div>
        <h3>${b.name}</h3>
        <p><strong>Tác giả:</strong> ${b.author}</p>
        <p><strong>Thể loại:</strong> ${b.category}</p>
        <p><strong>Năm XB:</strong> ${b.year}</p>
      </div>
      <div class="card-actions">
        <button class="btn-fav">${isFav ? 'Đã thích' : 'Yêu thích'}</button>
        <button class="btn-del">Xóa</button>
      </div>
    `;
        bookGrid.append(card);
    });
}
function setupEvents() {
    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value.trim();
        renderBooks();
    });
    genreFilter.addEventListener("click", (e) => {
        const btn = e.target.closest(".genre-btn");
        if (!btn)
            return;
        currentGenre = btn.getAttribute("data-genre") || "Tất cả";
        document.querySelectorAll(".genre-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderBooks();
    });
    bookGrid.addEventListener("click", (e) => {
        const target = e.target;
        const card = target.closest(".book-card");
        if (!card)
            return;
        const id = card.dataset.id;
        if (target.classList.contains("btn-fav")) {
            if (favorites.includes(id)) {
                favorites = favorites.filter(favId => favId !== id);
            }
            else {
                favorites.push(id);
            }
            saveStoredFavorites(favorites);
            renderFavoritesCount();
            renderBooks();
        }
        if (target.classList.contains("btn-del")) {
            if (confirm("Bạn có chắc chắn muốn xóa cuốn sách này không?")) {
                books = books.filter(b => b.id !== id);
                favorites = favorites.filter(favId => favId !== id);
                saveStoredFavorites(favorites);
                renderFavoritesCount();
                renderGenres();
                renderBooks();
            }
        }
    });
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
    nameInput.addEventListener("input", () => validateField(nameInput, errName, nameInput.value.trim().length >= 3, "Tên sách tối thiểu 3 ký tự"));
    authorInput.addEventListener("input", () => validateField(authorInput, errAuthor, authorInput.value.trim().length > 0, "Tác giả không được để trống"));
    categoryInput.addEventListener("change", () => validateField(categoryInput, errCategory, categoryInput.value !== "", "Vui lòng chọn thể loại"));
    yearInput.addEventListener("input", () => {
        const y = Number(yearInput.value);
        const currentYear = new Date().getFullYear();
        validateField(yearInput, errYear, y >= 1900 && y <= currentYear, `Năm phải từ 1900 đến ${currentYear}`);
    });
    addBookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const isNameValid = validateField(nameInput, errName, nameInput.value.trim().length >= 3, "Tên sách tối thiểu 3 ký tự");
        const isAuthorValid = validateField(authorInput, errAuthor, authorInput.value.trim().length > 0, "Tác giả không được để trống");
        const isCategoryValid = validateField(categoryInput, errCategory, categoryInput.value !== "", "Vui lòng chọn thể loại");
        const currentYear = new Date().getFullYear();
        const yearVal = Number(yearInput.value);
        const isYearValid = validateField(yearInput, errYear, yearVal >= 1900 && yearVal <= currentYear, `Năm phải từ 1900 đến ${currentYear}`);
        if (isNameValid && isAuthorValid && isCategoryValid && isYearValid) {
            const newBook = {
                id: Date.now().toString(),
                name: nameInput.value.trim(),
                author: authorInput.value.trim(),
                category: categoryInput.value,
                year: yearVal
            };
            books.unshift(newBook);
            renderGenres();
            renderBooks();
            addBookForm.reset();
        }
    });
}
function validateField(input, errorEl, condition, message) {
    if (!condition) {
        errorEl.textContent = message;
        input.style.borderColor = "var(--error-color)";
        return false;
    }
    else {
        errorEl.textContent = "";
        input.style.borderColor = "var(--border-color)";
        return true;
    }
}
document.addEventListener("DOMContentLoaded", initApp);
