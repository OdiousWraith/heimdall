import type { Metadata } from "next";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Topbar from "@/components/dashboard/Topbar";
import StatusBar from "@/components/dashboard/StatusBar";

export const metadata: Metadata = {
  title: "HEIMDALL — Delta Terminal",
  description: "Your Solana command center",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const displayName =
    user.user_metadata?.full_name ??
    user.user_metadata?.user_name ??
    user.email ??
    "User";

  return (
    <div className="dashboard-shell">
      <Topbar displayName={displayName} email={user.email ?? ""} />
      <main className="dashboard-canvas">{children}</main>
      <StatusBar />
    </div>
  );
}