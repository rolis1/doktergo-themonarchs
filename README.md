# MERN Project 🚀

Project ini dibangun menggunakan **MERN Stack** (MongoDB, Express.js, React, Node.js).  
Dokumentasi ini berisi langkah-langkah instalasi dan cara menjalankan project secara lokal.

---

## 📌 Prasyarat

Sebelum memulai, pastikan sudah menginstall:

1. **Node.js** (disarankan versi LTS, misalnya v18 ke atas)  
   👉 [Download Node.js](https://nodejs.org/en/download/)

2. **npm** (otomatis terinstall bersama Node.js) atau **yarn** (opsional)  
   - Cek versi:  
     ```bash
     node -v
     npm -v
     ```

3. **MongoDB**  
   - Bisa install **MongoDB Community Server** [Download](https://www.mongodb.com/try/download/community)  
   - Atau gunakan **MongoDB Atlas (Cloud Database)** 👉 [MongoDB Atlas](https://www.mongodb.com/atlas/database)

4. **Git** (untuk cloning project dan version control)  
   👉 [Download Git](https://git-scm.com/downloads)

---

## 📂 Struktur Project
admin
backend
frontend

untuk penginstallan
pertama buka terminal
cd backend
npm install

lalu,
cd ../frontend
npm install

Konfigurasi Environment Variable

Buat file .env di folder backend dengan isi seperti ini:

PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/dbname
JWT_SECRET=your_jwt_secret


Sesuaikan MONGO_URI dengan MongoDB lokal atau Atlas.

Jalankan Backend

cd backend
npm start

Jalankan frontend
cd frontend
npm run dev

buka di browser

Jalankan Panel admin
cd admin
npm run dev