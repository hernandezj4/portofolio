# Portofolio Hernandez

Website portofolio pribadi berbasis **static site** (tanpa framework) — dibangun dengan HTML5 semantik, CSS modern (Flexbox & Grid), dan JavaScript murni.

## Fitur

- ✅ Responsive (mobile-first)
- ✅ Dark / Light mode (tersimpan di `localStorage`, mengikuti preferensi sistem)
- ✅ Animasi: typing effect, scroll reveal, hover, floating
- ✅ Project showcase + filter kategori
- ✅ Download CV (PDF)
- ✅ Integrasi media sosial (GitHub, LinkedIn, Instagram)
- ✅ SEO dasar: meta tags, Open Graph, JSON-LD `Person`, `robots.txt`, `sitemap.xml`
- ✅ Aksesibilitas: semantic HTML, skip-link, aria-label

## Struktur

```
portofolio/
├── index.html              # Halaman utama (semantic HTML5)
├── css/
│   └── style.css           # CSS Modern + tema (variables)
├── js/
│   ├── projects.js         # Data proyek (edit di sini)
│   └── main.js             # Interaksi & fitur
├── assets/
│   ├── images/og-image.png # Gambar untuk share preview
│   └── downloads/
│       └── CV_Navaro_Vidi_Hernandez.pdf  # Ganti dengan CV asli
├── robots.txt
├── sitemap.xml
└── .gitignore
```

## Cara Menjalankan Secara Lokal

Buka `index.html` langsung di browser, atau jalankan server sederhana:

```bash
# Python
python -m http.server 8080

# PHP
php -S localhost:8080
```

Lalu buka `http://localhost:8080`.

## Cara Mengubah Konten

- **Nama / teks hero** → edit `index.html`
- **Skill & persentase** → edit bagian `<section id="skill">` di `index.html`
- **Proyek** → edit array `projects` di `js/projects.js`
- **Link sosial media & email** → edit `index.html`
- **CV** → ganti file di `assets/downloads/CV_Navaro_Vidi_Hernandez.pdf`

## Deployment (GitHub Pages)

1. Buat repository baru di GitHub, misal `navarovidih.github.io` atau repo biasa.
2. Push project ini:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

3. Ke **Settings → Pages** → pilih source `Deploy from a branch` → branch `main` → folder `/ (root)` → Save.
4. Website live di `https://USERNAME.github.io/REPO/` (atau `https://USERNAME.github.io/` jika repo `USERNAME.github.io`).

> Tips SEO: ganti domain `https://hernandez.dev/` pada `index.html`, `robots.txt`, dan `sitemap.xml` dengan domain GitHub Pages Anda sebelum deploy.

## Lisensi

Bebas digunakan untuk keperluan belajar & portofolio pribadi.