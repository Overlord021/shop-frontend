"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productApi } from "@/lib/api";
import { useAlert } from "@/app/ui/Alert";
import ProductForm from "./ProductForm";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ProductCreateForm({ categories = [], brands = [] }) {
  const router = useRouter();
  const { show, AlertComponent } = useAlert();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await productApi.create(data);
      show("success", t.product.createSuccess);
      router.refresh();
    } catch (err) {
      show("error", err.info?.message || t.product.createError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
      <h2 className="text-sm font-semibold text-gray-700">{t.product.createHeading}</h2>
      {AlertComponent}
      <ProductForm onSubmit={handleSubmit} loading={loading} categories={categories} brands={brands} />
    </div>
  );
}
