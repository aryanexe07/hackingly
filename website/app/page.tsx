import React from "react";
import Hero from "../components/Hero";
import LogoStrip from "../components/LogoStrip";
import AboutBento from "../components/AboutBento";
import CuriousShowcase from "../components/CuriousShowcase";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#d2f831] selection:text-slate-950">
      {/* Hero with framed rounded card, Navbar, clouds and 3D arc cards */}
      <Hero />

      {/* Logoipsum Client Strip */}
      <LogoStrip />

      {/* About Us Bento Grid with Inline Text Icons */}
      <AboutBento />

      {/* Curious What Else I've Created 3D Arc Showcase (Image 2) */}
      <CuriousShowcase />

      {/* Clean high-end footer */}
      <Footer />
    </main>
  );
}
