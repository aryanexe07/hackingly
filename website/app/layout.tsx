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
  title: "Aeline — Building the future with AI and strategy",
  description:
    "We help organizations unlock growth and efficiency through data-driven consulting and intelligent automation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-white text-slate-900 antialiased selection:bg-[#d2f831] selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
