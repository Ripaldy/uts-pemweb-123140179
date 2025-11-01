# Animal Facts & Images

## 👤 Identitas

* **Nama:** Ripaldy Saputra Lumbantoruan
* **NIM:** 123140179

---

## 🚀 Link Deployment Vercel
https://uts-pemweb-123140179.vercel.app/

---

## 📝 Deskripsi Project

Aplikasi "Animal Facts & Images" adalah sebuah *dashboard* interaktif yang dibuat menggunakan React dan Vite. Aplikasi ini memungkinkan pengguna untuk menjelajahi dunia kucing dan anjing dengan cara yang menyenangkan.

Pengguna dapat beralih antara galeri kucing dan anjing, melihat gambar-gambar berkualitas tinggi, membaca fakta-fakta menarik yang diambil dari API publik, dan bahkan menyimpan gambar favorit mereka. Proyek ini menggunakan `localStorage` untuk menyimpan data favorit sehingga pilihan pengguna tetap ada bahkan setelah browser ditutup.

### ✨ Fitur Utama

* **Navigasi Hewan:** Tombol untuk beralih antara mode "Cats" dan "Dogs".
* **Form Pilihan:** Form interaktif untuk memilih *breed*, jumlah gambar, dan tipe galeri (acak atau berdasarkan breed).
* **Galeri Gambar:** Grid galeri yang responsif menampilkan gambar hewan.
* **Tabel Fakta:** Menampilkan 5 fakta unik tentang hewan yang dipilih, dengan tombol *refresh* untuk mengambil fakta baru.
* **Sistem Favorit:** Menggunakan ikon hati (`react-icons`) untuk menambah atau menghapus gambar dari daftar favorit.
* **Penyimpanan Lokal:** Daftar favorit disimpan di `localStorage` menggunakan *custom hook* `useLocalStorage`.
* **Modal Konfirmasi:** Kotak dialog kustom (bukan `window.confirm`) untuk konfirmasi penghapusan favorit.
* **Desain Glassmorphism:** Tampilan modern menggunakan CSS murni dengan efek *glassmorphism*.

---

## 🛠️ Teknologi yang Digunakan

* **Frontend:** React 18 (Vite)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **API Client:** Fetch API (untuk TheDogAPI, CatFact.Ninja, dll.)
* **Styling:** CSS Murni (Flexbox, Grid, Variabel CSS)
* **Storage:** Browser LocalStorage
* **Icons:** `react-icons`

---

## 📸 Screenshot Aplikasi

Berikut adalah tampilan dari aplikasi yang sedang berjalan:
<img width="1895" height="965" alt="image" src="https://github.com/user-attachments/assets/24b14753-b1cc-47a8-af82-26a47b36479d" />
<img width="1899" height="686" alt="image" src="https://github.com/user-attachments/assets/3449b577-6ae6-4abd-9b13-00793bd61c63" />
<img width="1899" height="952" alt="image" src="https://github.com/user-attachments/assets/c89591b8-31d8-4446-8d0e-0e50a1b10410" />



---

## 📦 Cara Instalasi dan Menjalankan

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/](https://github.com/)[USERNAME_GITHUB_ANDA]/uts-pemweb-[NIM_ANDA].git
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd uts-pemweb-[NIM_ANDA]
    ```

3.  **Install semua dependencies yang dibutuhkan:**
    ```bash
    npm install
    ```

4.  **Jalankan development server:**
    ```bash
    npm run dev
    ```

5.  Buka [http://localhost:5173](http://localhost:5173) (atau port yang tertera di terminal) di browser Anda.
