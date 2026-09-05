"use client";

import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { SWR_KEYS } from "@/lib/keys";
import { Modal } from "@/app/ui/Modal";
import { Button } from "@/app/ui/Button";
import { Skeleton } from "@/app/ui/Skeleton";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function SelectMediaModal({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState(new Set(selected));
  const { data: mediaRes, isLoading } = useSWR(SWR_KEYS.media);
  const mediaData = mediaRes?.data || mediaRes;
  const media = Array.isArray(mediaData) ? mediaData : [];
  const { t } = useLanguage();

  const toggle = (id) => {
    setTemp((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleOpen = () => {
    setTemp(new Set(selected));
    setOpen(true);
  };

  const handleConfirm = () => {
    onChange(Array.from(temp));
    setOpen(false);
  };

  const selectedMedia = media?.filter((m) => selected.includes(m._id)) || [];

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          {t.product.mediaLabel}<span className="text-red-500 me-0.5">*</span>
        </label>
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-300 rounded-lg min-h-15 items-center">
          {selectedMedia.map((m) => (
            <div key={m._id} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white">
              <Image src={m.url} priority alt="" fill className="object-contain p-1" sizes="64px" />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={handleOpen}>
            {selected.length === 0 ? t.product.selectImages : t.product.editImages}
          </Button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={t.product.selectImagesTitle} size="lg">
        {/* Modal Overflow*/}
        <div className="flex flex-col gap-4">
          <div className="overflow-y-auto" style={{ maxHeight: '50vh' }}>
            {isLoading ? (
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            ) : !media || media.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-10">
                {t.product.noMedia}
              </p>
            ) : (
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {media.map((m) => {
                  const isSel = temp.has(m._id);
                  return (
                    <button
                      key={m._id}
                      type="button"
                      onClick={() => toggle(m._id)}
                      className={`cursor-pointer relative aspect-square rounded-lg border-2 overflow-hidden bg-white transition-all ${
                        isSel
                          ? 'border-red-500 ring-2 ring-red-200'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <Image src={m.url} priority alt="" fill className="object-contain p-2" sizes="150px" />
                      {isSel && (
                        <div className="absolute top-1 end-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <Button variant="outline" onClick={() => setOpen(false)}>{t.common.cancel}</Button>
            <Button onClick={handleConfirm}>{t.common.confirm} ({temp.size})</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
