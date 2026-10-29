# Bài Thực Hành 02 (Phần B) - Lập Trình Web 

## 🔄 So sánh cách làm giữa Phần A và Phần B

| Tiêu chí | Phần A (TypeScript / Vanilla Web) | Phần B (ReactJS / Vite) |
| :--- | :--- | :--- |
| **Quản lý Giao diện (UI)** | Thao tác DOM trực tiếp thông qua `document.querySelector` và `innerHTML`. | Quản lý bằng các Component và khai báo JSX tự động cập nhật khi state đổi. |
| **Quản lý Trạng thái** | Khai báo biến toàn cục (`let books = []`), cập nhật và phải tự gọi lại các hàm render thủ công. | Sử dụng Hook `useState` của React, giao diện tự động re-render khi state thay đổi. |
| **Cấu trúc Mã nguồn** | Chia nhỏ thành các file module ES6 (`storage.ts`, `types.ts`, `main.ts`). | Chia thành các Component độc lập (`BookCard`, `BookForm`, `FilterBar`,...) dễ tái sử dụng. |
| **Truyền dữ liệu** | Đọc/Ghi dữ liệu thông qua tham số hàm và biến toàn cục. | Truyền dữ liệu chiều ngang/dưới xuống qua `Props` từ Component cha sang con. |

---
