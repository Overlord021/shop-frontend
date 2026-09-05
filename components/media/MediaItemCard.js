"use client";

import { useState } from "react";
import Image from "next/image";
import MediaDeleteBtn from "./MediaDeleteBtn";
import MediaEditModal from "./MediaEditModal";
import { Button } from "@/app/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function MediaItemCard({ item }) {
  const [editOpen, setEditOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between">
        <div className="relative aspect-[4/3] bg-gray-50 border-b border-gray-100 p-2">
          <Image
            src={item.url} alt="" fill
            className="object-contain p-1"
            sizes="(max-width:640px) 50vw, (max-width:960px) 25vw, 200px"
          />
          <div className="absolute top-2 end-2 flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditOpen(true)}
              className="bg-white/90 hover:bg-white text-xs px-2 py-1 shadow-xs"
            >
              {t.media.edit || "Edit"}
            </Button>
            <MediaDeleteBtn id={item._id} />
          </div>
        </div>
        <div className="p-2.5 flex flex-col gap-1">
          <div className="flex flex-wrap gap-1 items-center min-h-6">
            {item.labels && item.labels.length > 0 ? (
              <>
                {item.labels.slice(0, 2).map((lbl, idx) => (
                  <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700">
                    {lbl}
                  </span>
                ))}
                {item.labels.length > 2 && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600">
                    +{item.labels.length - 2}
                  </span>
                )}
              </>
            ) : (
              <span className="text-[11px] text-gray-400 italic">—</span>
            )}
          </div>
        </div>
      </div>

      <MediaEditModal
        mediaItem={item}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}
