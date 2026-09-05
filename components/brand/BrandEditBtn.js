"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { brandApi } from "@/lib/api";
import { Modal } from "@/app/ui/Modal";
import { Input } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import { useAlert } from "@/app/ui/Alert";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function BrandEditBtn({ brand }) {
  const router = useRouter();
  const { show, AlertComponent } = useAlert();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: brand.name || "", en_name: brand.en_name || "", logo: brand.logo || "" });
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
      await brandApi.update(brand._id, {
        name: name || null,
        en_name: en_name || null,
        logo,
      });
      setOpen(false);
      router.refresh();
    } catch (err) {
      show("error", err.info?.message || t.brand.editError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>{t.common.edit}</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={t.brand.editTitle}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {AlertComponent}
          <Input
            label={t.brand.nameLabel}
            required={locale === "fa"}
            value={form.name}
            onChange={set("name")}
          />
          <Input
            label={t.brand.enNameLabel}
            required={locale === "en"}
            value={form.en_name}
            onChange={set("en_name")}
            dir="ltr"
          />
          <Input
            label={t.brand.logoLabel}
            required
            value={form.logo}
            onChange={set("logo")}
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

