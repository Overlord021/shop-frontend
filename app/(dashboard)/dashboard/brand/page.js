import BrandCreateForm from "@/components/brand/BrandCreateForm";
import BrandList from "@/components/brand/BrandList";
import { getServerTranslations } from "@/lib/i18n/locale";

export async function generateMetadata() {
  const { t } = await getServerTranslations();
  return { title: t.brandPage.metaTitle };
}

export default async function BrandPage() {
  const { t } = await getServerTranslations();

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">{t.brandPage.heading}</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.brandPage.subtitle}</p>
      </div>
      <BrandCreateForm />
      <BrandList />
    </div>
  );
}
