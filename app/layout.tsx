import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HEIMDALL — Delta Terminal",
  description: "Your Solana command center",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}