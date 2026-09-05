"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categoryApi } from "@/lib/api";
import { Input } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import { useAlert } from "@/app/ui/Alert";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function CategoryCreateForm() {
  const router = useRouter();
  const { show, AlertComponent } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", en_name: "", image: "" });
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
      await categoryApi.create({
        name: name || null,
        en_name: en_name || null,
        image,
      });
      setForm({ name: "", en_name: "", image: "" });
      show("success", t.category.createSuccess);
      router.refresh();
    } catch (err) {
      show("error", err.info?.message || t.category.createError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
      <h2 className="text-sm font-semibold text-gray-700">{t.category.createHeading}</h2>
      {AlertComponent}
      <Input
        label={t.category.faNameLabel}
        required={locale === "fa"}
        value={form.name}
        onChange={set("name")}
        placeholder={t.category.faNamePlaceholder}
      />
      <Input
        label={t.category.enNameLabel}
        required={locale === "en"}
        value={form.en_name}
        onChange={set("en_name")}
        placeholder="mobile"
        dir="ltr"
      />
      <Input
        label={t.category.imageLabel}
        required
        value={form.image}
        onChange={set("image")}
        placeholder="https://..."
        dir="ltr"
      />
      <Button type="submit" loading={loading} className="self-start">{t.category.addBtn}</Button>
    </form>
  );
}

