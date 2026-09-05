import Image from "next/image";
import { getBrands } from "@/lib/dal";
import BrandEditBtn from "./BrandEditBtn";
import BrandDeleteBtn from "./BrandDeleteBtn";
import { getServerTranslations } from "@/lib/i18n/locale";

export default async function BrandList() {
  const brands = await getBrands();
  const { t } = await getServerTranslations();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.brand.thName}</th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.brand.thLogo}</th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.brand.thActions}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {brands.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-10 text-center text-sm text-gray-400">
                {t.brand.emptyList}
              </td>
            </tr>
          ) : (
            brands.map((brand) => (
              <tr key={brand._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 font-medium">{brand.name}</td>
                <td className="px-4 py-3">
                  {brand.logo ? (
                    <div className="relative h-8 w-20">
                      <Image src={brand.logo} alt={brand.name} fill className="object-contain" sizes="80px" />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BrandEditBtn brand={brand} />
                    <BrandDeleteBtn id={brand._id} />
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
