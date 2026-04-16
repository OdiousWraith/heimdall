import type { Metadata } from "next";
import Topbar from "@/components/dashboard/Topbar";
import StatusBar from "@/components/dashboard/StatusBar";

export const metadata: Metadata = {
  title: "HEIMDALL — Delta Terminal",
  description: "Your Solana command center",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-shell">
      <Topbar />
      <main className="dashboard-canvas">{children}</main>
      <StatusBar />
    </div>
  );
}