import { SWRProvider } from "@/lib/swr-provider";
import { Header } from "@/app/layout/Header";
import { Footer } from "@/app/layout/Footer";

export default function MainLayout({ children }) {
  return (
    <SWRProvider>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </SWRProvider>
  );
}
