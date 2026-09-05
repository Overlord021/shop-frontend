"use client";

import { useState } from "react";
import { Input, Select } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import SelectMediaModal from "./SelectMediaModal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { localizedName } from "@/lib/i18n/displayName";

export default function ProductForm({
  initialData = {},
  onSubmit,
  loading,
  categories = [],
  brands = [],
}) {
  const [error, setError] = useState("");
  const { t, locale } = useLanguage();

  const [form, setForm] = useState({
    name: initialData.name || "",
    en_name: initialData.en_name || "",
    price: initialData.price ?? "",
    dollar_price: initialData.dollar_price ?? "",
    sale: initialData.sale ?? "",
    category: initialData.category?._id || initialData.category || "",
    brand: initialData.brand?._id || initialData.brand || "",
    media: initialData.media?.map((m) => m._id) || [],
  });

  const set =
    (key) =>
    (e) =>
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const en_name = form.en_name.trim();
    const sale =
      form.sale === ""
        ? 0
        : Number(form.sale);

    setError("");

    if (locale === "fa") {
      if (!name) {
        return setError(t.product.nameRequired);
      }
      if (!en_name) {
        return setError(t.product.enNameRequired);
      }
      const priceVal = Number(form.price);
      if (!Number.isFinite(priceVal) || priceVal <= 0) {
        return setError(t.product.tomanPriceRequired || t.product.priceInvalid);
      }
    } else {
      if (!en_name) {
        return setError(t.product.enNameRequired);
      }
      const dollarVal = Number(form.dollar_price);
      if (!Number.isFinite(dollarVal) || dollarVal <= 0) {
        return setError(t.product.dollarPriceRequired || t.product.priceInvalid);
      }
    }

    if (
      !Number.isFinite(sale) ||
      sale < 0 ||
      sale > 100
    ) {
      return setError(
        t.product.saleInvalid
      );
    }

    onSubmit({
      name: name || null,
      en_name,
      price: form.price !== "" ? Number(form.price) : null,
      dollar_price: form.dollar_price !== "" ? Number(form.dollar_price) : null,
      sale,
      category: form.category || null,
      brand: form.brand || null,
      media: form.media,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <SelectMediaModal
        selected={form.media}
        onChange={(ids) =>
          setForm((prev) => ({
            ...prev,
            media: ids,
          }))
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t.product.nameLabel}
          required={locale === "fa"}
          value={form.name}
          onChange={set("name")}
          placeholder={t.product.namePlaceholder}
        />

        <Input
          label={t.product.enNameLabel}
          required
          value={form.en_name}
          onChange={set("en_name")}
          placeholder={t.product.enNamePlaceholder}
          dir="ltr"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t.product.priceLabel}
          required={locale === "fa"}
          type="number"
          min="1"
          value={form.price}
          onChange={set("price")}
          placeholder={t.product.pricePlaceholder}
          dir="ltr"
        />

        <Input
          label={t.product.dollarPriceLabel}
          required={locale === "en"}
          type="number"
          step="0.01"
          min="0"
          value={form.dollar_price}
          onChange={set("dollar_price")}
          placeholder={t.product.dollarPricePlaceholder}
          dir="ltr"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t.product.saleLabel}
          type="number"
          min="0"
          max="100"
          value={form.sale}
          onChange={set("sale")}
          placeholder={t.product.salePlaceholder}
          dir="ltr"
        />

        <Select
          label={t.product.categoryLabel}
          value={form.category}
          onChange={set("category")}
        >
          <option value="">
            {t.product.categorySelect}
          </option>

          {categories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {localizedName(cat, locale)}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label={t.product.brandLabel}
          value={form.brand}
          onChange={set("brand")}
        >
          <option value="">
            {t.product.brandSelect}
          </option>

          {brands.map((brand) => (
            <option
              key={brand._id}
              value={brand._id}
            >
              {localizedName(brand, locale)}
            </option>
          ))}
        </Select>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
        >
          {initialData._id
            ? t.product.saveChanges
            : t.product.createBtn}
        </Button>
      </div>
    </form>
  );
}

