export const SWR_KEYS = {
  session:            "/api/auth/session",
  brands:             "/api/brand/",
  categories:         "/api/category/",
  products:           "/api/product",
  productsSale:       "/api/product/sale",
  productsByCategory: (enName) => `/api/product/category/${enName}`,
  productById:        (id)     => `/api/product/${id}`,
  media:              "/api/media/",
};