"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productApi } from "@/lib/api";
import { Modal } from "@/app/ui/Modal";
import { Button } from "@/app/ui/Button";
import { useAlert } from "@/app/ui/Alert";
import ProductForm from "./ProductForm";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ProductEditBtn({ product, categories = [], brands = [] }) {
  const router = useRouter();
  const { show, AlertComponent } = useAlert();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await productApi.update(product._id, data);
      setOpen(false);
      router.refresh();
    } catch (err) {
      show("error", err.info?.message || t.product.editError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>{t.common.edit}</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={t.product.editTitle} size="lg">
        {AlertComponent}
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          loading={loading}
          categories={categories}
          brands={brands}
        />
      </Modal>
    </>
  );
}
