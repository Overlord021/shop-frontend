import Link from "next/link";
import { Badge } from "@/app/ui/Badge";
import { getProducts, getCategories, getBrands } from "@/lib/dal";
import ProductEditBtn from "./ProductEditBtn";
import ProductDeleteBtn from "./ProductDeleteBtn";
import { getServerTranslations } from "@/lib/i18n/locale";
import { localizedName, productName, formatPrice } from "@/lib/i18n/displayName";

export default async function ProductList() {
  const { t, locale } = await getServerTranslations();
  const currency = locale === "en" ? "usd" : "toman";

  const [productsRes, categories, brands] = await Promise.all([
    getProducts({ lang: locale, currency }),
    getCategories(),
    getBrands(),
  ]);

  const products =
    productsRes && Array.isArray(productsRes.data)
      ? productsRes.data
      : Array.isArray(productsRes)
        ? productsRes
        : [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
      <table className="w-full min-w-175">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.product.thName}</th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.product.thPrice}</th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.product.thCategory}</th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.product.thDiscount}</th>
            <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-start text-xs sm:text-sm font-semibold text-gray-600">{t.product.thActions}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                {t.product.emptyList}
              </td>
            </tr>
          ) : (
            products.map((product) => {
              const displayAmount = locale === "en" ? product.dollar_price : product.price;
              return (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 max-w-50 truncate">{productName(product)}</td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-800 whitespace-nowrap">
                    {formatPrice(displayAmount, locale)}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-600">{localizedName(product.category, locale) || "—"}</td>
                  <td className="px-4 py-3">
                    {product.sale > 0
                      ? <Badge variant="red">{product.sale}{t.common.percentSign}</Badge>
                      : <span className="text-gray-400 text-sm">—</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product._id}`} target="_blank"
                        className="cursor-pointer text-xs px-2.5 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50 transition text-gray-700"
                      >
                        {t.product.view}
                      </Link>
                      <ProductEditBtn product={product} categories={categories} brands={brands} />
                      <ProductDeleteBtn id={product._id} />
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

