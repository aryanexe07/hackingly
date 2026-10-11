import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import InteractiveCaseSimulator from "@/components/InteractiveCaseSimulator";
import WorkflowSection from "@/components/WorkflowSection";
import PersonaShowcase from "@/components/PersonaShowcase";
import GovernanceTrust from "@/components/GovernanceTrust";
import MetricsImpact from "@/components/MetricsImpact";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <InteractiveCaseSimulator />
      <WorkflowSection />
      <PersonaShowcase />
      <GovernanceTrust />
      <MetricsImpact />
      <FaqSection />
      <Footer />
    </main>
  );
}
