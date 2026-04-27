# 🚀 Members Only - Clubhouse Project

Project ini adalah aplikasi web fungsional yang dibangun sebagai bagian dari kurikulum **The Odin Project**. Aplikasi ini menerapkan sistem autentikasi dan otorisasi di mana informasi penulis pesan hanya bisa dilihat oleh pengguna dengan status keanggotaan tertentu.

## ✨ Fitur Utama

- **Autentikasi Pengguna:** Pendaftaran dan login menggunakan `Passport.js` dan `bcryptjs`.
- **Level Keanggotaan:**
  - **Non-Member:** Hanya bisa membaca pesan (penulis dan waktu disembunyikan).
  - **Member:** Bisa melihat siapa penulis pesan dan kapan dikirim (akses via kode rahasia).
  - **Admin:** Memiliki akses penuh dan kemampuan untuk menghapus pesan.
- **Papan Pesan:** Pengguna yang sudah login dapat memposting pesan baru ke clubhouse.
- **Keamanan:** Password di-hash menggunakan bcrypt sebelum disimpan ke database PostgreSQL.

## 🛠️ Teknologi yang Digunakan

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Query Builder:** Prisma / node-postgres (`pg`)  
- **Template Engine:** EJS (Embedded JavaScript)  
- **Security:** Passport.js (Local Strategy), bcryptjs, express-session  

## 📦 Instalasi Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/username-kamu/members-only.git
   cd members-only
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi environment:**
   Buat file `.env` lalu isi:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/members_only?schema=public"
   SESSION_SECRET="pilih_kata_rahasia_bebas"
   ```

4. **Setup database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Jalankan aplikasi:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di: http://localhost:3000

## 📂 Struktur Folder

```plaintext
.
├── controllers/    # Logika bisnis dan penanganan request
├── db/             # Konfigurasi koneksi database
├── middleware/     # Fungsi middleware (authMiddleware.js)
├── models/         # Skema data dan query SQL/Prisma
├── public/         # File statis (CSS/Images)
├── routes/         # Definisi rute URL
├── views/          # Template tampilan (EJS)
├── app.js          # Entry point utama aplikasi
└── .gitignore      # File yang diabaikan oleh Git
```
