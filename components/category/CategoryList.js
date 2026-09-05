import Image from "next/image";
import { getCategories } from "@/lib/dal";
import CategoryEditBtn from "./CategoryEditBtn";
import CategoryDeleteBtn from "./CategoryDeleteBtn";
import { getServerTranslations } from "@/lib/i18n/locale";

export default async function CategoryList() {
  const categories = await getCategories();
  const { t } = await getServerTranslations();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.category.thName}</th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.category.thEnName}</th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.category.thImage}</th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.category.thActions}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-10 text-center text-sm text-gray-400">
                {t.category.emptyList}
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 font-medium">{cat.name}</td>
                <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-500">{cat.en_name}</td>
                <td className="px-4 py-3">
                  {cat.image ? (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                      <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="40px" />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CategoryEditBtn category={cat} />
                    <CategoryDeleteBtn id={cat._id} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
