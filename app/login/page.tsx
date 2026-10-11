"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSutra } from "@/lib/store";
import { PERSONAS, PersonaRole } from "@/lib/data";
import {
  Layers,
  Shield,
  ArrowRight,
  CheckCircle2,
  Lock,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useSutra();
  const [selectedRole, setSelectedRole] = useState<PersonaRole>("MENTOR");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-lg space-y-8">
        {/* Logo and Platform Tagline */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-500/20">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              SUTRA
            </h1>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-mono mt-0.5">
              No Alert Without Action
            </p>
          </div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Student Support Orchestration Platform with policy-governed intervention matching and auditable SLAs.
          </p>
        </div>

        {/* Role Selector Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xl space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Select Evaluation Persona
            </h2>
            <p className="text-xs text-slate-500">
              Pick a role to inspect its specific navigation, triage rights, and sensitive data guardrails.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              {(Object.keys(PERSONAS) as PersonaRole[]).map((r) => {
                const p = PERSONAS[r];
                const isSelected = selectedRole === r;

                return (
                  <div
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-indigo-50/80 border-indigo-500 ring-1 ring-indigo-500/30 shadow-sm"
                        : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            {p.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-white border border-slate-200 px-1.5 py-0.2 rounded text-indigo-700">
                            {p.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {p.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-indigo-600 active:scale-[0.99] text-white text-xs font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <span>Enter Workspace as {PERSONAS[selectedRole].name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Demo Quick Notice */}
        <div className="text-center text-[11px] text-slate-400 font-mono">
          Institute Authentication Gateway • Session ID: SUTRA-DEV-2026
        </div>
      </div>
    </div>
  );
}
