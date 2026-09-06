import { redirect } from "next/navigation";
import { SWRProvider } from "@/lib/swr-provider";
import { DashboardSidebarProvider } from "@/lib/sidebar-context";
import { DashboardSidebar } from "@/app/layout/DashboardSidebar";
import { DashboardHeader } from "@/app/layout/DashboardHeader";
import { requireAuth } from "@/lib/dal";
import { getServerTranslations } from "@/lib/i18n/locale";
import { getRouteTitle } from "@/lib/titles";

export async function generateMetadata() {
  const title = await getRouteTitle("dashboardLayout");
  return { title };
}

export default async function DashboardLayout({ children }) {
  try {
    await requireAuth();
  } catch {
    redirect("/sign-in");
  }

  const { dir } = await getServerTranslations();

  return (
    <SWRProvider>
      <DashboardSidebarProvider>
        <div className="flex h-screen bg-gray-50 overflow-hidden" dir={dir}>
          <DashboardSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <main className="flex-1 overflow-y-auto p-3 sm:p-6">{children}</main>
          </div>
        </div>
      </DashboardSidebarProvider>
    </SWRProvider>
  );
}
