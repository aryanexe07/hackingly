import type { Metadata } from "next";
import "./globals.css";
import { SkillHubProvider } from "@/lib/store";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Sutra — Learn, Connect & Grow",
  description: "Sutra is your all-in-one platform for interactive courses, student engagement, learning analytics, and community growth.",
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#F4F5F7] text-neutral-900 selection:bg-neutral-900 selection:text-white">
        <SkillHubProvider>
          <AppShell>{children}</AppShell>
        </SkillHubProvider>
      </body>
    </html>
  );
}
