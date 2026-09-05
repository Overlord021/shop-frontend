"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mediaApi } from "@/lib/api";
import { Input } from "@/app/ui/Input";
import { Button } from "@/app/ui/Button";
import { useAlert } from "@/app/ui/Alert";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function MediaCreateForm() {
  const router = useRouter();
  const { show, AlertComponent } = useAlert();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [labels, setLabels] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { t } = useLanguage();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !labels.includes(val)) {
        setLabels([...labels, val]);
        setTagInput("");
      }
    }
  };

  const addTag = () => {
    const val = tagInput.trim();
    if (val && !labels.includes(val)) {
      setLabels([...labels, val]);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setLabels(labels.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    try {
      await mediaApi.create({
        url: url.trim(),
        labels: labels,
      });
      setUrl("");
      setLabels([]);
      setTagInput("");
      show("success", t.media.createSuccess);
      router.refresh();
    } catch (err) {
      show("error", err.info?.message || t.media.createError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
      <h2 className="text-sm font-semibold text-gray-700">{t.media.createHeading}</h2>
      {AlertComponent}
      <Input
        label={t.media.urlLabel}
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com/image.jpg"
        dir="ltr"
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          {t.media.labelsLabel}
        </label>
        <div className="flex flex-wrap gap-2 p-2.5 bg-gray-50 border border-gray-300 rounded-lg min-h-12 items-center">
          {labels.map((lbl, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200"
            >
              {lbl}
              <button
                type="button"
                onClick={() => removeTag(idx)}
                className="cursor-pointer text-red-400 hover:text-red-700 transition"
              >
                ×
              </button>
            </span>
          ))}

          <div className="flex gap-2 items-center flex-1 min-w-36">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.media.labelPlaceholder}
              className="cursor-text bg-transparent text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none w-full"
            />
            {tagInput.trim() && (
              <button
                type="button"
                onClick={addTag}
                className="cursor-pointer px-2.5 py-1 bg-gray-900 text-white rounded-md text-xs hover:bg-gray-700 transition shrink-0"
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" loading={loading} className="self-start">{t.media.addBtn}</Button>
    </form>
  );
}

