import StatsClient from "@/components/dashboard/StatsClient";
import { getServerTranslations } from "@/lib/i18n/locale";

export async function generateMetadata() {
  const { t } = await getServerTranslations();
  return { title: t.dashboardHome.metaTitle };
}

export default async function DashboardPage() {
  const { t } = await getServerTranslations();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t.dashboardHome.title}</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.dashboardHome.subtitle}</p>
      </div>
      <StatsClient />
    </div>
  );
}
