# 🛍️ E-Commerce Website | وب‌سایت تجارت الکترونیک

[English Documentation](#-english) | [مستندات فارسی](#-persian)

---

## 🇺🇸 English

### 🚀 Introduction
A modern, production-quality, bilingual (English/Persian) full-stack e-commerce web application featuring a responsive storefront, secure auth, robust product/catalog management, media library, and multi-currency pricing (Toman & USD). Decoupled architecture with Next.js App Router frontend, backend REST API, and MongoDB Atlas.

### ✨ Key Features
- **🌍 i18n:** English (default) & Persian (RTL) support with locale persistence and dynamic page titles.
- **🏠 Storefront:** Home page, product browsing, gallery views, search, pagination, category/brand/sale filters, and currency-aware display.
- **💰 Pricing:** Dual currency (Toman & USD) without auto-conversion.
- **🛒 Cart:** Add/remove items, quantity handling, persistence, and slide-over drawer.
- **🔐 Auth & Registration:** Cookie/JWT session auth, protected dashboard, and backend-enforced registration locking (available only when 0 users exist).
- **📊 Dashboard & Management:** Full CRUD for Products, Categories, Brands, and Media Library.
- **🖼️ Media Library:** Uploads, multi-label tagging, exact search, and 30 items/page pagination.
- **🎨 UI/UX:** Clean Light Mode interface, responsive mobile navigation, and error/loading states. *(Dark mode omitted)*.
- **📱 App Stores & Trust:** Localized app links (Cafe Bazaar/Myket vs App Store/Google Play) and trust seals (Enamad, ISO).

### 🛠️ Tech Stack & Architecture
- **Tech:** Next.js (App Router), React 19, JavaScript, Tailwind CSS, SWR, npm.
- **Architecture:** Frontend (Vercel) ⇄ Backend API (Render) ⇄ MongoDB Atlas.

### 📁 Project Structure
```text
app/          # App Router routes ((dashboard), (main), api, layout)
components/   # Domain components (brand, category, dashboard, media, product)
lib/          # API client (api.js), DAL (dal.js), SWR, and i18n dicts
middleware.js # Route protection and auth middleware
```

### 🚀 Local Development
1. Clone repository & run `npm install`.
2. Configure `.env.local`:
   ```env
   BACKEND_API_URL=http://localhost:4000
   NEXT_PUBLIC_BACKEND_API_URL=http://localhost:4000
   ```
3. Run dev server: `npm run dev` (http://localhost:3000)
4. Build & start: `npm run build` && `npm start`

---

## 🇮🇷 Persian

### 🚀 معرفی پروژه
وب‌سایت فروشگاهی کامل، مدرن و دو زبانه (فارسی و انگلیسی) با فرانت‌اند Next.js App Router، بک‌اند REST API و پایگاه داده MongoDB Atlas.

### ✨ ویژگی‌های کلیدی
- **🌍 بین‌المللی‌سازی:** پشتیبانی از فارسی (RTL) و انگلیسی (پیش‌فرض) با ذخیره‌سازی زبان.
- **🏠 فروشگاه:** مرور محصولات، گالری، جستجو، صفحه‌بندی، فیلتر دسته‌بندی/برند/تخفیف.
- **💰 قیمت‌گذاری:** پشتیبانی از تومان و دلار بدون تبدیل خودکار.
- **🛒 سبد خرید:** افزودن/حذف، مدیریت تعداد و منوی کشویی.
- **🔐 احراز هویت:** کوکی/JWT، داشبورد محافظت‌شده و قفل شدن ثبت‌نام بعد از اولین کاربر (توسط بک‌اند).
- **📊 مدیریت:** CRUD کامل برای محصولات، دسته‌بندی‌ها، برندها و کتابخانه رسانه.
- **🖼️ رسانه:** آپلود، برچسب‌گذاری، جستجو و صفحه‌بندی (۳۰ آیتم در صفحه).
- **🎨 رابط کاربری:** حالت روشن (Light Mode)، طراحی واکنش‌گرا *(بدون حالت تاریک)*.
- **📱 اپلیکیشن و اعتماد:** کافه‌بازار/مایکت و اپ‌استور/گوگل‌پلی به‌همراه نمادهای اعتماد.

### 🛠️ پشته فناوری و معماری
- **فناوری‌ها:** Next.js، React 19، Tailwind CSS، SWR، npm.
- **معماری:** فرانت‌اند (Vercel) ⇄ بک‌اند (Render) ⇄ MongoDB Atlas.

### 📁 ساختار پروژه
```text
app/          # مسیرهای نکست‌جی‌اس ((dashboard)، (main)، api، layout)
components/   # کامپوننت‌های تجاری (برند، دسته‌بندی، داشبورد، رسانه، محصول)
lib/          # کلاینت API، لایه DAL، پروایدر SWR و دیکشنری i18n
middleware.js # میدلور احراز هویت و محافظت از مسیرها
```

### 🚀 توسعه محلی
1. کلون کردن و اجرای `npm install`.
2. تنظیم فایل `.env.local`:
   ```env
   BACKEND_API_URL=http://localhost:4000
   NEXT_PUBLIC_BACKEND_API_URL=http://localhost:4000
   ```
3. اجرای سرور توسعه: `npm run dev`
4. بیلد و پروداکشن: `npm run build` && `npm start`

