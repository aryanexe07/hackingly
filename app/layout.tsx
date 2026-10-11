import type { Metadata } from "next";
import "./globals.css";
import { SutraProvider } from "@/lib/store";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "SUTRA — Student Support Orchestration Platform",
  description: "No Alert Without Action. Evidence-backed student intervention orchestration platform with privacy-preserving governance and auditable case SLAs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500 selection:text-white">
        <SutraProvider>
          <AppShell>{children}</AppShell>
        </SutraProvider>
      </body>
    </html>
  );
}
