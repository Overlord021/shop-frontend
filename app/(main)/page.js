import HomeClient from "./HomeClient";
import { getLocale } from "@/lib/i18n/locale";
import { getRouteTitle } from "@/lib/titles";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  "http://localhost:4000";

export async function generateMetadata() {
  const title = await getRouteTitle("home");
  return { title };
}

async function fetchData(endpoint, tag) {
  try {
    const res = await fetch(
      `${BACKEND_API_URL}${endpoint}`,
      {
        next: {
          revalidate: 60,
          tags: [tag],
        },
      }
    );

    if (!res.ok) {
      console.error(
        `${endpoint} failed:`,
        res.status
      );

      return null;
    }

    return await res.json();
  } catch (err) {
    console.error(
      `${endpoint} error:`,
      err
    );

    return null;
  }
}

export default async function HomePage() {
  const locale = await getLocale();
  const currency = locale === "en" ? "usd" : "toman";

  const [
    productsRes,
    categories,
    brands,
  ] = await Promise.all([
    fetchData(`/api/product?lang=${locale}&currency=${currency}&limit=20`, "products"),
    fetchData("/api/category/", "categories"),
    fetchData("/api/brand/", "brands"),
  ]);

  const safeProducts =
    productsRes && Array.isArray(productsRes.data)
      ? productsRes.data
      : Array.isArray(productsRes)
        ? productsRes
        : [];

  const saleProducts =
    safeProducts.filter(
      (p) => p.sale > 0
    );

  return (
    <HomeClient
      products={safeProducts}
      categories={
        Array.isArray(categories)
          ? categories
          : []
      }
      brands={
        Array.isArray(brands)
          ? brands
          : []
      }
      saleProducts={saleProducts}
    />
  );
}
