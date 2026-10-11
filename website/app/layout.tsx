import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-cal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SUTRA — Student Support Orchestration Platform | No Alert Without Action",
  description:
    "The accountable, policy-governed intervention engine for modern higher education. Closes the gap between early signals, mentor reviews, and SLA-backed support cases.",
  keywords: [
    "Student Retention",
    "Higher Education Support",
    "Intervention Orchestration",
    "Early Warning System",
    "Academic Support SLA",
    "FERPA Compliant Student Analytics",
    "SUTRA Platform",
  ],
  authors: [{ name: "SUTRA Higher Education Technologies" }],
  openGraph: {
    title: "SUTRA — No Alert Without Action",
    description:
      "Transforming passive higher-ed analytics dashboards into auditable, evidence-backed student intervention cases.",
    url: "https://getsutra.ai",
    siteName: "SUTRA",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} scroll-smooth dark`}>
      <body className="bg-[#070B14] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        {children}
      </body>
    </html>
  );
}
