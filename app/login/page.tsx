"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SkillHubLogo, SkillHubLogoIcon } from "@/components/SkillHubLogo";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-[32px] shadow-[0_20px_60px_rgba(15,23,42,0.06)] border border-neutral-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* LEFT COLUMN: Visual Student Showcase Hero (matching Image 3 1:1) */}
        <div className="lg:col-span-6 relative p-8 md:p-10 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-neutral-100 to-amber-50/30">
          {/* Background Photo */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/login-students.jpg"
              alt="Students collaborating"
              className="w-full h-full object-cover object-center filter contrast-[1.03]"
            />
            {/* Soft luminous gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-black/30" />
          </div>

          {/* Top Logo */}
          <div className="relative z-10">
            <SkillHubLogo light={false} />
          </div>

          {/* Bottom Hero Copy */}
          <div className="relative z-10 pt-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight font-heading">
              Learn, connect &amp; grow with SkillHub.
            </h2>
            <p className="text-sm font-medium text-neutral-700 mt-3 leading-relaxed max-w-sm">
              Your all-in-one platform for courses, community and continuous learning.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Clean Auth Card (matching Image 3 1:1) */}
        <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between bg-white">
          <div className="max-w-sm w-full mx-auto my-auto py-6">
            {/* Center Asterisk Logo Icon */}
            <div className="flex justify-center mb-5 text-neutral-900">
              <SkillHubLogoIcon className="w-8 h-8" color="currentColor" />
            </div>

            {/* Header Titles */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight font-heading">
                {isSignUp ? "Create Your Account" : "Sign In to SkillHub"}
              </h1>
              <p className="text-xs text-neutral-400 mt-1.5 font-medium">
                {isSignUp
                  ? "Welcome! Please enter your details."
                  : "Welcome back! Please enter your credentials."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-white border border-neutral-200/90 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] text-white rounded-xl text-xs font-semibold shadow-md shadow-neutral-900/10 transition-all mt-2"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>

              {/* Mode Toggle */}
              <div className="text-center pt-2">
                <span className="text-xs text-neutral-500">
                  {isSignUp
                    ? "Do you have an account? "
                    : "Don't have an account? "}
                </span>
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs font-bold text-neutral-900 underline hover:text-neutral-700 cursor-pointer"
                >
                  {isSignUp ? "Sign in" : "Create one"}
                </button>
              </div>

              {/* Divider: "or continue with" */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200/60" />
                </div>
                <span className="relative px-3 bg-white text-[11px] font-medium text-neutral-400">
                  or continue with
                </span>
              </div>

              {/* OAuth buttons matching Image 3 (Apple, Google, GitHub) */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* Apple */}
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 border border-neutral-200/80 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.47c.65-.79 1.1-1.9 0.98-3-.94.04-2.08.63-2.75 1.42-.59.68-1.11 1.77-.97 2.84 1.05.08 2.12-.54 2.74-1.26z" />
                  </svg>
                  <span>Apple</span>
                </button>

                {/* Google */}
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 border border-neutral-200/80 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                {/* GitHub */}
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 border border-neutral-200/80 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer copyright */}
          <div className="text-center text-[11px] text-neutral-400 font-medium pt-4">
            © SkillHub 2026
          </div>
        </div>
      </div>
    </div>
  );
}
