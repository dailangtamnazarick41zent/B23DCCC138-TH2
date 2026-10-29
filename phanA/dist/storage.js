var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("./books.json");
            if (!response.ok)
                throw new Error("Không thể tải danh sách sách");
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
export function getStoredFavorites() {
    const data = localStorage.getItem("library_favorites");
    return data ? JSON.parse(data) : [];
}
export function saveStoredFavorites(favs) {
    localStorage.setItem("library_favorites", JSON.stringify(favs));
}
