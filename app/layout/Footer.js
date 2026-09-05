"use client";
import { ChevronUp, Circle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const quickHrefs = [
  "/",
  "/",
  "/products?category=لوازم-خانگی",
  "/products?category=گوشی",
  "/products?category=گوشی",
  "/",
  "/",
  "/",
  "/",
  "/",
  "/",
];

const productHrefs = [
  "/products",
  "/products?category=گیمینگ",
  "/",
  "/",
  "/",
  "/",
  "/",
  "/",
  "/",
  "/",
];

const aboutHrefs = ["/", "/", "/", "/", "/", "/", "/"];
const afterBuyHrefs = ["/", "/", "/", "/", "/", "/"];
const preBuyHrefs = ["/", "/", "/", "/", "/", "/"];
const lawHrefs = ["/", "/", "/", "/"];

function zip(hrefs, labels) {
  return hrefs.map((href, i) => ({ href, label: labels[i] }));
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-white font-bold text-sm mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link, i) => (
          <li key={i}>
            <Link href={link.href} className="text-blue-200 hover:text-white text-xs transition-colors leading-relaxed">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { t, dir } = useLanguage();
  const cols = t.footer.columns;

  const quickLinks = zip(quickHrefs, cols.quick.links);
  const productLinks = zip(productHrefs, cols.products.links);
  const aboutLinks = zip(aboutHrefs, cols.about.links);
  const afterBuyLinks = zip(afterBuyHrefs, cols.afterBuy.links);
  const preBuyLinks = zip(preBuyHrefs, cols.preBuy.links);
  const lawLinks = zip(lawHrefs, cols.law.links);

  return (
    <footer
      className="mt-16"
      style={{
        background: "linear-gradient(135deg, #1a3a6e 0%, #1e4080 30%, #1a3a6e 60%, #0f2548 100%)",
      }}
      dir={dir}
    >
      {/* Back to top */}
      <div className="flex justify-center py-4 border-b border-white/10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors px-4 py-1.5 rounded-full border border-blue-300/30 hover:border-blue-200"
        >
          <ChevronUp size={16} strokeWidth={1.75} />
          {t.footer.backToTop}
        </button>
      </div>

      {/* Main links grid */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          <FooterColumn title={cols.quick.title} links={quickLinks} />
          <FooterColumn title={cols.products.title} links={productLinks} />
          <FooterColumn title={cols.about.title} links={aboutLinks} />
          <FooterColumn title={cols.afterBuy.title} links={afterBuyLinks} />
          <FooterColumn title={cols.preBuy.title} links={preBuyLinks} />
          <FooterColumn title={cols.law.title} links={lawLinks} />
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Contact Links*/}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">{t.footer.contactTitle}</h3>
              <div className="space-y-2 text-xs text-blue-200">
                <p>{t.footer.phoneLine}</p>
                <p>{t.footer.emailLine}</p>
              </div>
            </div>

            {/* Social Links*/}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">{t.footer.socialTitle}</h3>
              <div className="flex gap-3">
                {t.footer.socialLinks.map((s) => (
                  <button
                    key={s}
                    title={s}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  >
                    
                    <Circle className="w-4 h-4 text-white/30 fill-white/30" />
                  </button>
                ))}
              </div>
            </div>

            {/* App download Links*/}
            <div>
              <h3 className="text-white font-bold text-sm mb-4">{t.footer.appTitle}</h3>
              <div className="flex gap-3">
                {t.footer.appLinks.map((app) => (
                  <button
                    key={app}
                    title={app}
                    className="flex-1 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-blue-200 text-xs transition-colors border border-white/10"
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges row */}
        <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              {t.footer.badges.map((badge) => (
                <div
                  key={badge}
                  title={badge}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-blue-200 text-[8px] sm:text-[9px] text-center leading-tight p-1"
                >
                  {badge}
                </div>
              ))}
            </div>
            <p className="text-blue-200 text-xs text-center">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
