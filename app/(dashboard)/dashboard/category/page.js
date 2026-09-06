import CategoryCreateForm from "@/components/category/CategoryCreateForm";
import CategoryList from "@/components/category/CategoryList";
import { getServerTranslations } from "@/lib/i18n/locale";
import { getRouteTitle } from "@/lib/titles";

export async function generateMetadata() {
  const title = await getRouteTitle("dashboardCategory");
  return { title };
}

export default async function CategoryPage() {
  const { t } = await getServerTranslations();

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">{t.categoryPage.heading}</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.categoryPage.subtitle}</p>
      </div>
      <CategoryCreateForm />
      <CategoryList />
    </div>
  );
}
