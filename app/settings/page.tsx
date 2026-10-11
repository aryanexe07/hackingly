"use client";

import React, { useState } from "react";
import { useSkillHub } from "@/lib/store";
import { User, Bell, Shield, Key, Check } from "lucide-react";

export default function SettingsPage() {
  const { user, updateUser } = useSkillHub();
  const [name, setName] = useState(user.fullName);
  const [role, setRole] = useState(user.role);
  const [email, setEmail] = useState("sarah.wilson@sutra.edu");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ fullName: name, role });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
          Settings &amp; Preferences
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Manage your account profile, notification alerts, and academy workspace
        </p>
      </div>

      <div className="skill-card bg-white p-5 sm:p-6 md:p-8 space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 pb-6 border-b border-neutral-100">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-neutral-100 flex-shrink-0"
          />
          <div>
            <h3 className="text-lg font-bold text-neutral-900">{user.fullName}</h3>
            <p className="text-xs text-neutral-400">{user.role}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                Verified Educator
              </span>
              <span className="text-[10px] font-mono text-neutral-400">
                ID: SUTRA-9042
              </span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all min-h-[44px]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all min-h-[44px]"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
              Academy Bio
            </label>
            <textarea
              rows={3}
              defaultValue="Lead Product Designer & Educator with 8+ years experience guiding students through design systems, UI heuristics, and intuitive interaction frameworks."
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-neutral-100">
            <span className="text-xs text-neutral-400">
              Changes sync automatically across academy cohorts
            </span>
            <button
              type="submit"
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5 min-h-[44px] self-start sm:self-auto"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Changes Saved</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
