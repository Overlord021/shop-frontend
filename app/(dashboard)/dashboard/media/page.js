import MediaCreateForm from "@/components/media/MediaCreateForm";
import MediaList from "@/components/media/MediaList";
import { getServerTranslations } from "@/lib/i18n/locale";
import { getRouteTitle } from "@/lib/titles";

export async function generateMetadata() {
  const title = await getRouteTitle("dashboardMedia");
  return { title };
}

export default async function MediaPage({ searchParams }) {
  const params = await searchParams;
  const { t } = await getServerTranslations();

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">{t.mediaPage.heading}</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{t.mediaPage.subtitle}</p>
      </div>
      <MediaCreateForm />
      <MediaList searchParams={params} />
    </div>
  );
}

