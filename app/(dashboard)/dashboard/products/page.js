import ProductCreateForm from "@/components/product/ProductCreateForm";
import ProductList from "@/components/product/ProductList";
import { getCategories, getBrands } from "@/lib/dal";
import { getServerTranslations } from "@/lib/i18n/locale";
import { getRouteTitle } from "@/lib/titles";

export async function generateMetadata() {
  const title = await getRouteTitle("dashboardProducts");
  return { title };
}

export default async function ProductsPage() {
  const [categories, brands] = await Promise.all([getCategories(), getBrands()]);
  const { t } = await getServerTranslations();

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.productsPage.heading}</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.productsPage.subtitle}</p>
      </div>
      <ProductCreateForm categories={categories} brands={brands} />
      <ProductList />
    </div>
  );
}
