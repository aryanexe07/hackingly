"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSutra } from "@/lib/store";
import {
  Users,
  Search,
  ShieldCheck,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Award,
  Lock,
} from "lucide-react";

export default function StudentsDirectoryPage() {
  const { students, currentPersona } = useSutra();
  const [search, setSearch] = useState("");

  const studentList = Object.values(students).filter((s) => {
    if (!search) return true;
    return (
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.program.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-indigo-600 uppercase font-mono tracking-wider bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Holistic Directory
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Student 360° Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Authorized, consent-aware view of student progression across the 6 mandated dimensions.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pseudonym (STU-1042)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 text-xs rounded-xl shadow-sm focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>
      </div>

      {/* Directory Grid (SkillHub-inspired student rows) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {studentList.map((st) => (
          <div
            key={st.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        {st.name}
                      </h3>
                      <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded-md">
                        {st.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{st.program}</p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Consent Verified
                </span>
              </div>

              {/* Attendance & Academics Bar preview */}
              <div className="grid grid-cols-3 gap-2.5 my-4 p-3 bg-slate-50/80 rounded-2xl border border-slate-100">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-500 uppercase font-semibold">Attendance</span>
                  <span className={`block text-sm font-bold font-mono ${st.attendance.overallRate < 75 ? "text-rose-600" : "text-slate-800"}`}>
                    {st.attendance.overallRate}%
                  </span>
                </div>
                <div className="text-center border-x border-slate-200/60">
                  <span className="block text-[10px] text-slate-500 uppercase font-semibold">CGPA</span>
                  <span className="block text-sm font-bold font-mono text-slate-800">
                    {st.academics.cgpa}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-500 uppercase font-semibold">LMS Health</span>
                  <span className={`block text-xs font-bold font-mono ${st.lms.status === "INSUFFICIENT" ? "text-amber-600" : "text-emerald-700"}`}>
                    {st.lms.status}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Mentor: <strong className="text-slate-700">{st.mentor}</strong>
              </span>

              <Link
                href={`/students/${st.id}`}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>View 360° Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
