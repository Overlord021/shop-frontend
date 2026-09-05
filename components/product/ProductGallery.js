'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function ProductGallery({ media }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = media[activeIndex]?.url;
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 p-4 relative">
        {activeImage ? (
          <Image
            src={activeImage}
            alt=""
            fill
            priority
            className="object-contain p-4"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            {t.common.noImage}
          </div>
        )}
      </div>
      {media.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {media.map((m, i) => (
            <button
              key={m._id}
              onClick={() => setActiveIndex(i)}
              className={`cursor-pointer relative w-16 h-16 rounded-xl overflow-hidden border-2 transition bg-white p-1 ${
                i === activeIndex
                  ? 'border-red-500'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Image src={m.url} alt="" fill priority className="object-contain p-1" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}