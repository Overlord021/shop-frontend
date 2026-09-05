// ==================== Display Name Helpers ====================
export function localizedName(entity, locale) {
  if (!entity) return "";
  if (locale === "en" && entity.en_name) return entity.en_name;
  return entity.name ?? "";
}

export function productName(product) {
  if (!product) return "";
  return product.en_name || product.name || "";
}

export function formatToman(amount) {
  const num = Number(amount) || 0;
  return `${num.toLocaleString("fa-IR")} تومان`;
}

export function formatUSD(amount) {
  const num = Number(amount) || 0;
  const formatted = num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `$${formatted}`;
}

export function formatPrice(amount, locale) {
  if (locale === "en") {
    return formatUSD(amount);
  }
  return formatToman(amount);
}


