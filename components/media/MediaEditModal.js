"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mediaApi } from "@/lib/api";
import { Modal } from "@/app/ui/Modal";
import { Button } from "@/app/ui/Button";
import { useAlert } from "@/app/ui/Alert";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function MediaEditModal({ mediaItem, open, onClose }) {
  const router = useRouter();
  const { show, AlertComponent } = useAlert();
  const [labels, setLabels] = useState(mediaItem.labels || []);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const { t, dir } = useLanguage();

  useEffect(() => {
    if (open) {
      setLabels(mediaItem.labels || []);
      setTagInput("");
    }
  }, [open, mediaItem]);

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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await mediaApi.update(mediaItem._id, { labels });
      show("success", t.media.updateSuccess || "Updated successfully");
      router.refresh();
      onClose();
    } catch (err) {
      show("error", err.info?.message || t.media.updateError || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={t.media.editLabels || "Edit Labels"} size="md">
      <form onSubmit={handleSave} className="flex flex-col gap-4" dir={dir}>
        {AlertComponent}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            {t.media.labelsLabel}
          </label>
          <div className="flex flex-wrap gap-2 p-2.5 bg-gray-50 border border-gray-300 rounded-lg min-h-16 items-center">
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

        <div className="flex gap-3 justify-end pt-3 border-t border-gray-100">
          <Button variant="outline" type="button" onClick={onClose} disabled={saving}>
            {t.media.cancel || "Cancel"}
          </Button>
          <Button type="submit" loading={saving}>
            {saving ? (t.media.saving || "Saving...") : (t.media.save || "Save")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
