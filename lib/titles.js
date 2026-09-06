// ============================================
// Centralized Page Titles Configuration
// Maps route types to localized title strings.
// ============================================

import { getServerTranslations } from "./i18n/locale";

export async function getRouteTitle(routeName, dynamicName = null) {
  const { t } = await getServerTranslations();

  if (dynamicName) {
    return dynamicName;
  }

  switch (routeName) {
    case "home":
      return t.layout.homeTitle;
    case "products":
      return t.products.pageMetaTitle;
    case "signIn":
      return t.auth.signInTitle;
    case "signUp":
      return t.auth.signUpTitle;
    case "dashboard":
      return t.dashboardHome.metaTitle;
    case "dashboardBrand":
      return t.brandPage.metaTitle;
    case "dashboardCategory":
      return t.categoryPage.metaTitle;
    case "dashboardMedia":
      return t.mediaPage.metaTitle;
    case "dashboardProducts":
      return t.productsPage.metaTitle;
    case "dashboardLayout":
      return t.layout.dashboardTitle;
    case "productNotFound":
      return t.productDetail.notFoundTitle;
    default:
      return t.layout.siteTitleDefault;
  }
}
