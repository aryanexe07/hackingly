"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSutra } from "@/lib/store";
import { PERSONAS, PersonaRole } from "@/lib/data";
import {
  LayoutDashboard,
  BellRing,
  FolderGit2,
  Users,
  BarChart3,
  SlidersHorizontal,
  Search,
  Shield,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  Layers,
  Clock,
  Compass,
  ArrowUpRight,
} from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    activeRole,
    currentPersona,
    setRole,
    activeScenario,
    loadScenario,
    resetAllData,
    signals,
    cases,
  } = useSutra();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [scenarioMenuOpen, setScenarioMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pendingSignalsCount = signals.filter((s) => s.status === "PENDING_TRIAGE").length;
  const overdueCasesCount = cases.filter((c) => c.isOverdue || c.status === "ESCALATED").length;

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
      roleGateKey: "dashboard",
    },
    {
      name: "Signals Inbox",
      href: "/signals",
      icon: BellRing,
      badge: pendingSignalsCount > 0 ? pendingSignalsCount : null,
      badgeColor: "bg-rose-500 text-white",
      roleGateKey: "signals",
    },
    {
      name: "Support Cases",
      href: "/cases",
      icon: FolderGit2,
      badge: overdueCasesCount > 0 ? `${overdueCasesCount} overdue` : null,
      badgeColor: "bg-amber-500 text-white",
      roleGateKey: "cases",
    },
    {
      name: "Student Directory",
      href: "/students",
      icon: Users,
      badge: null,
      roleGateKey: "students",
    },
    {
      name: "Cohort Analytics",
      href: "/analytics",
      icon: BarChart3,
      badge: null,
      roleGateKey: "analytics",
    },
  ];

  const adminItems = [
    {
      name: "Demo Sandbox & Rules",
      href: "/admin",
      icon: SlidersHorizontal,
      roleGateKey: "admin",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* 1. LEFT SIDEBAR (SkillHub-inspired architecture) */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200/80 flex flex-col justify-between z-30 fixed top-0 bottom-0 left-0">
        <div>
          {/* Brand Logo & Tagline */}
          <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 block font-heading">
                  SUTRA
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-600 block">
                  Action Orchestrator
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Scenario Rehearsal Badge */}
          <div className="px-4 py-3">
            <div className="bg-indigo-50/70 border border-indigo-100/80 rounded-xl p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-indigo-900 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-600" /> Demo Fixtures
                </span>
                <span className="text-[10px] text-indigo-600 font-mono font-medium">PS6 Ready</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <button
                  onClick={() => loadScenario(1)}
                  className={`px-2 py-1 rounded text-left truncate font-medium transition-colors ${
                    activeScenario === "SCENARIO_1_HAPPY_PATH"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-indigo-100/60"
                  }`}
                  title="STU-1042: Signal -> Triage -> Case Resolution"
                >
                  1: Happy Path
                </button>
                <button
                  onClick={() => loadScenario(2)}
                  className={`px-2 py-1 rounded text-left truncate font-medium transition-colors ${
                    activeScenario === "SCENARIO_2_INSUFFICIENT_DATA"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-indigo-100/60"
                  }`}
                  title="STU-1088: Missing LMS Data Refusal"
                >
                  2: No Data
                </button>
                <button
                  onClick={() => loadScenario(3)}
                  className={`px-2 py-1 rounded text-left truncate font-medium transition-colors ${
                    activeScenario === "SCENARIO_3_FEE_GATING"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-indigo-100/60"
                  }`}
                  title="STU-1095: Privacy & Fee Gating"
                >
                  3: Privacy Gate
                </button>
                <button
                  onClick={() => loadScenario(4)}
                  className={`px-2 py-1 rounded text-left truncate font-medium transition-colors ${
                    activeScenario === "SCENARIO_4_OVERDUE_ESCALATION"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-indigo-100/60"
                  }`}
                  title="STU-1014: SLA Breach Escalation"
                >
                  4: Escalation
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Section: Main */}
          <div className="px-4 py-2">
            <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Main Operations
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                const isPermitted = currentPersona.permittedViews.includes(item.roleGateKey);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm shadow-slate-900/10 font-semibold"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    } ${!isPermitted ? "opacity-40" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                          item.badgeColor || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {!isPermitted && (
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                        Redacted
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Navigation Section: Governance */}
          <div className="px-4 py-4">
            <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Governance & Sandbox
            </p>
            <nav className="space-y-1">
              {adminItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm font-semibold"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
                  >
                    <item.icon className="w-4 h-4 text-slate-400" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Section: Active Persona Card */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Active Persona
            </span>
            <button
              onClick={resetAllData}
              className="text-slate-400 hover:text-indigo-600 text-xs p-1 rounded hover:bg-white transition-colors"
              title="Reset Database to Pristine Seed"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-indigo-300 transition-all shadow-sm"
          >
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-slate-900 truncate">
                {currentPersona.name}
              </p>
              <p className="text-[10px] text-indigo-600 truncate font-medium">
                {currentPersona.id} Mode
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-8 flex items-center justify-between">
          {/* Left: Quick Search */}
          <div className="relative w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student code (STU-1042), rule ID, case..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs rounded-xl border border-transparent focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Right: Quick Role Switcher Pill & Indicators */}
          <div className="flex items-center gap-4">
            {/* Persona Switcher Dropdown in Top Bar */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/70 border border-slate-200 rounded-full text-xs font-medium text-slate-700 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                <span className="font-semibold text-slate-900">
                  {currentPersona.badge}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900">Switch Persona Mode</p>
                    <p className="text-[11px] text-slate-500">
                      Tests role-gated UI and privacy boundaries
                    </p>
                  </div>
                  <div className="space-y-1">
                    {(Object.keys(PERSONAS) as PersonaRole[]).map((r) => {
                      const p = PERSONAS[r];
                      const isSelected = activeRole === r;
                      return (
                        <button
                          key={r}
                          onClick={() => {
                            setRole(r);
                            setRoleMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 p-2 rounded-xl text-left text-xs transition-colors ${
                            isSelected
                              ? "bg-indigo-50 text-indigo-900 font-semibold"
                              : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <img
                            src={p.avatar}
                            alt={p.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{p.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{p.title}</p>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* SLA Alert Badge */}
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-700 px-3 py-1.5 rounded-full text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>1 Urgent Signal Due &lt; 24h</span>
            </div>

            {/* Quick Demo Reset */}
            <button
              onClick={resetAllData}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              title="Reset synthetic fixture state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sandbox</span>
            </button>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
