# Data Access Layer (DAL) - داده‌دسترسی لایه

## نمای کلی

`dal.js` یک **server-side data access layer** است که برای ارتباط با backend API از سمت سرور استفاده میشود.

### چرا DAL؟

- **امنیت**: توکن از httpOnly cookies خوانده میشه (نه از client)
- **Server Components**: میتونی توی server components استفاده کنی
- **ISR/SSR**: برای صفحات static یا dynamic استفاده کن

---

## ساختار

```
dal.js
├── Auth Functions
│   ├── getSession()
│   └── requireAuth()
│
├── Helper Functions
│   └── dalFetch()
│
├── Brand Operations
├── Category Operations
├── Product Operations
└── Media Operations
```

---

## استفاده در Server Components

```javascript
// components/brand/BrandList.js
import { getBrands } from "@/lib/dal";

export default async function BrandList() {
  const brands = await getBrands();

  return (
    <div>
      {brands.map((brand) => (
        <div key={brand._id}>{brand.name}</div>
      ))}
    </div>
  );
}
```

تمام صفحات و کامپوننت‌های داخل `app/(dashboard)` از همین الگو استفاده می‌کنن (`BrandList`, `CategoryList`, `ProductList`, `MediaList`)، و خود `app/(dashboard)/layout.js` قبل از رندر شدن بچه‌ها با `requireAuth()` سشن رو چک می‌کنه و در صورت نامعتبر بودن، ریدایرکت میده به `/sign-in`.

---

## Available Functions

### Auth

```javascript
// Get current session (returns null if not authenticated)
const session = await getSession();

// Require authentication (throws error if not authenticated)
const session = await requireAuth();
```

### Brands

```javascript
const brands = await getBrands();
await createBrand({ name, en_name });
await updateBrand(id, { name, en_name });
await deleteBrand(id);
```

### Categories

```javascript
const categories = await getCategories();
await createCategory({ name, en_name, image });
await updateCategory(id, { name, en_name, image });
await deleteCategory(id);
```

### Products

```javascript
const products = await getProducts();
const product = await getProductById(id);
const products = await getProductsByCategory(enName);
await createProduct({ name, price, sale, category, brand, media });
await updateProduct(id, { ... });
await deleteProduct(id);
```

### Media

```javascript
const media = await getMedia();
await createMedia(formData); // FormData برای upload
await deleteMedia(id);
```

> نکته: توابع create/update/delete بالا از طریق `dal.js` در دسترسن ولی فعلاً هیچ فرمی ازشون استفاده نمی‌کنه — همه‌ی mutation ها (ساخت/ویرایش/حذف برند، دسته‌بندی، محصول، تصویر) از سمت client با `api.js` انجام میشن (پایین‌تر توضیح داده شده). این توابع برای استفاده‌ی احتمالی در آینده (مثلاً اگه خواستی فرم‌ها رو به Server Actions واقعی تبدیل کنی) نگه داشته شدن.

---

## Error Handling

توابع خواندنی (`getBrands`, `getCategories`, `getProducts`, `getProductById`, `getProductsByCategory`, `getMedia`) خطا رو قورت نمی‌دن و به `[]`/`null` تبدیل نمی‌کنن؛ خطا (چه عدم احراز هویت، چه قطعی بک‌اند) رو throw می‌کنن تا نزدیک‌ترین `error.js` (مثلاً `app/(dashboard)/error.js`) اون رو نشون بده، به‌جای اینکه یه دیتای خالی و گمراه‌کننده رندر بشه. اگه جایی نیاز به هندل دستی داری:

```javascript
try {
  const brands = await getBrands();
} catch (error) {
  console.error("Failed to fetch brands:", error);
  // fallback logic
}
```

`getSession()` قاعده‌ی متفاوتی داره: طبق طراحی، وقتی سشن معتبر نیست `null` برمی‌گردونه (نه throw)، چون هدفش اینه که بشه ازش برای چک کردن وضعیت لاگین بدون پرت شدن خطا استفاده کرد.

---

## Cookie Handling

DAL خودش توکن رو از cookies میخونه:

```javascript
const cookieStore = await cookies();
const token = cookieStore.get("token")?.value;
```

درخواست‌ها خودکار با `Cookie` header ارسال میشوند.

> از Next.js 15 به بعد `cookies()` (و همینطور `params`/`searchParams` تو page ها) یک تابع/مقدار async هست و باید حتماً `await` بشه.

---

## با SWR (Client-side)

اگه میخوای client-side SWR استفاده کنی، از `api.js` استفاده کن:

```javascript
// components/BrandList.js
"use client";

import useSWR from "swr";
import { SWR_KEYS } from "@/lib/keys";

export default function BrandList() {
  const { data: brands } = useSWR(SWR_KEYS.brands);

  return (
    <div>
      {brands?.map((brand) => (
        <div key={brand._id}>{brand.name}</div>
      ))}
    </div>
  );
}
```

ساخت/ویرایش/حذف (که نیاز به state لودینگ و پیام موفقیت/خطا دارن) همه از `api.js` (`brandApi`, `categoryApi`, `productApi`, `mediaApi`, `authApi`) به‌صورت client-side انجام میشن، نه از `dal.js`. مثال:

```javascript
// components/brand/BrandCreateForm.js
"use client";

import { brandApi } from "@/lib/api";

async function handleSubmit(e) {
  e.preventDefault();
  await brandApi.create({ name, en_name: enName });
  // handle success
}
```

---

## خلاصه

- **dal.js** = Server-side data fetching (فقط داخل server components، احراز هویت اجباری، خطا رو throw می‌کنه)
- **api.js** = Client-side data fetching و mutations (SWR برای خوندن، فرم‌ها برای ساخت/ویرایش/حذف)

بسته به اینکه داده رو کجا نیاز داری، اون رو استفاده کن! 🚀
