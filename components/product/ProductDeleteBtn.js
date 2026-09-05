"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productApi } from "@/lib/api";
import { ConfirmModal } from "@/app/ui/Modal";
import { Button } from "@/app/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ProductDeleteBtn({ id }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await productApi.remove(id);
      setOpen(false);
      router.refresh();
    } catch {
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="danger" size="sm" onClick={() => setOpen(true)}>{t.common.delete}</Button>
      <ConfirmModal
        open={open} onClose={() => setOpen(false)} onConfirm={handleDelete}
        loading={loading} title={t.product.deleteTitle} message={t.product.deleteMessage}
      />
    </>
  );
}
