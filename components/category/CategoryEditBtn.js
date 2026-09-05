"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categoryApi } from "@/lib/api";
import { Modal } from "@/app/ui/Modal";
import { Input } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import { useAlert } from "@/app/ui/Alert";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function CategoryEditBtn({ category }) {
  const router = useRouter();
  const { show, AlertComponent } = useAlert();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: category.name || "", en_name: category.en_name || "", image: category.image || "" });
  const { t, locale } = useLanguage();

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const en_name = form.en_name.trim();
    const image = form.image.trim();

    if (locale === "fa") {
      if (!name || !image) return;
    } else {
      if (!en_name || !image) return;
    }

    setLoading(true);
    try {
      await categoryApi.update(category._id, {
        name: name || null,
        en_name: en_name || null,
        image,
      });
      setOpen(false);
      router.refresh();
    } catch (err) {
      show("error", err.info?.message || t.category.editError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>{t.common.edit}</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={t.category.editTitle}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {AlertComponent}
          <Input
            label={t.category.faNameLabel}
            required={locale === "fa"}
            value={form.name}
            onChange={set("name")}
          />
          <Input
            label={t.category.enNameLabel}
            required={locale === "en"}
            value={form.en_name}
            onChange={set("en_name")}
            dir="ltr"
          />
          <Input
            label={t.category.imageLabel}
            required
            value={form.image}
            onChange={set("image")}
            dir="ltr"
          />
          <div className="flex gap-3 justify-end">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>{t.common.cancel}</Button>
            <Button type="submit" loading={loading}>{t.common.save}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

