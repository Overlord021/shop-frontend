"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { brandApi } from "@/lib/api";
import { Input } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import { useAlert } from "@/app/ui/Alert";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function BrandCreateForm() {
  const router = useRouter();
  const { show, AlertComponent } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", en_name: "", logo: "" });
  const { t, locale } = useLanguage();

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const en_name = form.en_name.trim();
    const logo = form.logo.trim();

    if (locale === "fa") {
      if (!name || !logo) return;
    } else {
      if (!en_name || !logo) return;
    }

    setLoading(true);
    try {
      await brandApi.create({
        name: name || null,
        en_name: en_name || null,
        logo,
      });
      setForm({ name: "", en_name: "", logo: "" });
      show("success", t.brand.createSuccess);
      router.refresh();
    } catch (err) {
      show("error", err.info?.message || t.brand.createError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
      <h2 className="text-sm font-semibold text-gray-700">{t.brand.createHeading}</h2>
      {AlertComponent}
      <Input
        label={t.brand.nameLabel}
        required={locale === "fa"}
        value={form.name}
        onChange={set("name")}
        placeholder={t.brand.namePlaceholder}
      />
      <Input
        label={t.brand.enNameLabel}
        required={locale === "en"}
        value={form.en_name}
        onChange={set("en_name")}
        placeholder={t.brand.enNamePlaceholder}
        dir="ltr"
      />
      <Input
        label={t.brand.logoLabel}
        required
        value={form.logo}
        onChange={set("logo")}
        placeholder="https://..."
        dir="ltr"
      />
      <Button type="submit" loading={loading} className="self-start">{t.brand.addBtn}</Button>
    </form>
  );
}

