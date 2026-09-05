import { getMedia } from "@/lib/dal";
import { getServerTranslations } from "@/lib/i18n/locale";
import MediaSearchAndPagination from "./MediaSearchAndPagination";
import MediaItemCard from "./MediaItemCard";

export default async function MediaList({ searchParams }) {
  const { t } = await getServerTranslations();
  const page = Number(searchParams?.page) || 1;
  const q = searchParams?.q || "";
  const limit = 30;

  let mediaRes = { data: [], pagination: { page: 1, limit: 30, total: 0, totalPages: 1 } };
  try {
    const res = await getMedia({ page, limit, q });
    if (res && Array.isArray(res.data)) {
      mediaRes = res;
    } else if (Array.isArray(res)) {
      mediaRes = { data: res, pagination: { page: 1, limit: res.length, total: res.length, totalPages: 1 } };
    }
  } catch (err) {
    console.error("MediaList fetch error:", err);
  }

  const { data: media, pagination } = mediaRes;

  return (
    <div className="space-y-4">
      <MediaSearchAndPagination initialQuery={q} pagination={pagination} />

      {media.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-16">{t.media.emptyList}</p>
      ) : (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {media.map((m) => (
            <MediaItemCard key={m._id} item={m} />
          ))}
        </div>
      )}
    </div>
  );
}


