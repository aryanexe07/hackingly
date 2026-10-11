"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSkillHub } from "@/lib/store";
import { SkillHubLogo } from "./SkillHubLogo";
import { NewCourseModal } from "./NewCourseModal";
import { CreatePostModal } from "./CreatePostModal";
import { StudentProfileModal } from "./StudentProfileModal";
import { GlobalSearchModal } from "./GlobalSearchModal";
import { NotificationPopover, MessagesDrawer } from "./TopBarActionDrawers";
import {
  LayoutGrid,
  Bookmark,
  GraduationCap,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  MessageSquare,
  Bell,
  ChevronLeft,
  ChevronRight,
  Shield,
  RotateCw,
  Share,
  Download,
  Plus,
  PanelLeft,
  Monitor,
  Maximize2,
  Square,
} from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    user,
    setIsSearchOpen,
    isNotificationOpen,
    setIsNotificationOpen,
    isMessagesOpen,
    setIsMessagesOpen,
    browserFrameEnabled,
    setBrowserFrameEnabled,
  } = useSkillHub();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If on login page, render clean auth view without shell chrome
  if (pathname === "/login") {
    return <>{children}</>;
  }

  const mainNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { name: "Courses", href: "/courses", icon: Bookmark },
    { name: "Students", href: "/students", icon: GraduationCap },
    { name: "Community", href: "/community", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
  ];

  const othersNavItems = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
    { name: "Logout", href: "/login", icon: LogOut },
  ];

  return (
    <div
      className={`min-h-screen ${
        browserFrameEnabled
          ? "bg-[#E5E7EB] p-4 md:p-8 flex items-center justify-center"
          : "bg-[#F4F5F7]"
      }`}
    >
      {/* Container: If browser frame enabled, mimics Safari window from Image 1 */}
      <div
        className={`w-full transition-all duration-300 ${
          browserFrameEnabled
            ? "max-w-[1440px] bg-white rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.15)] border border-neutral-300/80 overflow-hidden"
            : "min-h-screen flex"
        }`}
      >
        {/* Safari Browser Top Frame (Visible when browserFrameEnabled is ON, exactly as in Image 1) */}
        {browserFrameEnabled && (
          <div className="bg-[#F8F9FA] border-b border-neutral-200/80 px-4 py-3 flex items-center justify-between text-neutral-500 select-none">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 block" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 block" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 block" />
              <div className="flex items-center gap-2 ml-4 text-neutral-400">
                <PanelLeft className="w-3.5 h-3.5 hover:text-neutral-700 cursor-pointer" />
                <ChevronLeft className="w-3.5 h-3.5 hover:text-neutral-700 cursor-pointer" />
                <ChevronRight className="w-3.5 h-3.5 hover:text-neutral-700 cursor-pointer" />
              </div>
            </div>

            {/* Address bar pill */}
            <div className="flex items-center justify-between w-96 px-3 py-1 bg-white border border-neutral-200/80 rounded-lg text-xs shadow-sm">
              <div className="flex items-center gap-2 text-neutral-400">
                <Shield className="w-3 h-3" />
                <span className="font-medium text-neutral-700">SkillHub</span>
              </div>
              <RotateCw className="w-3 h-3 text-neutral-400 hover:text-neutral-700 cursor-pointer" />
            </div>

            {/* Safari Top Right Controls */}
            <div className="flex items-center gap-3 text-neutral-400">
              <Download className="w-3.5 h-3.5 hover:text-neutral-700 cursor-pointer" />
              <Share className="w-3.5 h-3.5 hover:text-neutral-700 cursor-pointer" />
              <Plus className="w-3.5 h-3.5 hover:text-neutral-700 cursor-pointer" />
              <Square className="w-3.5 h-3.5 hover:text-neutral-700 cursor-pointer" />
            </div>
          </div>
        )}

        {/* SkillHub App Shell Layout */}
        <div
          className={`w-full flex ${
            browserFrameEnabled ? "bg-[#F8F9FA]" : "bg-[#F4F5F7]"
          }`}
        >
          {/* 1. LEFT SIDEBAR */}
          <aside
            className={`${
              sidebarCollapsed ? "w-20" : "w-64"
            } flex-shrink-0 bg-transparent p-6 transition-all duration-300 flex flex-col justify-between`}
          >
            <div>
              {/* Logo & Sidebar toggle */}
              <div className="flex items-center justify-between pb-8">
                {!sidebarCollapsed && <SkillHubLogo />}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-1.5 hover:bg-neutral-200/60 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors"
                  title="Toggle Sidebar"
                >
                  <PanelLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation: Main */}
              <div className="space-y-6">
                <div>
                  {!sidebarCollapsed && (
                    <span className="text-[11px] font-semibold text-neutral-400 block mb-2 px-3">
                      Main
                    </span>
                  )}
                  <nav className="space-y-1.5">
                    {mainNavItems.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        (item.href === "/dashboard" && pathname === "/");

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs transition-all duration-150 ${
                            isActive
                              ? "bg-white text-neutral-900 font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-neutral-100"
                              : "text-neutral-500 hover:text-neutral-900 hover:bg-white/60 font-medium"
                          }`}
                        >
                          <item.icon
                            className={`w-4 h-4 flex-shrink-0 ${
                              isActive ? "text-neutral-900" : "text-neutral-400"
                            }`}
                          />
                          {!sidebarCollapsed && <span>{item.name}</span>}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Navigation: Others */}
                <div>
                  {!sidebarCollapsed && (
                    <span className="text-[11px] font-semibold text-neutral-400 block mb-2 px-3">
                      Others
                    </span>
                  )}
                  <nav className="space-y-1.5">
                    {othersNavItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs transition-all duration-150 ${
                            isActive
                              ? "bg-white text-neutral-900 font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-neutral-100"
                              : "text-neutral-500 hover:text-neutral-900 hover:bg-white/60 font-medium"
                          }`}
                        >
                          <item.icon
                            className={`w-4 h-4 flex-shrink-0 ${
                              isActive ? "text-neutral-900" : "text-neutral-400"
                            }`}
                          />
                          {!sidebarCollapsed && <span>{item.name}</span>}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Sidebar bottom: Frame toggle button */}
            {!sidebarCollapsed && (
              <div className="pt-6 border-t border-neutral-200/50">
                <button
                  onClick={() => setBrowserFrameEnabled(!browserFrameEnabled)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-white/70 hover:bg-white rounded-xl border border-neutral-200/60 text-[11px] font-medium text-neutral-600 transition-colors shadow-sm"
                >
                  <span className="flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Safari Frame View</span>
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                      browserFrameEnabled
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {browserFrameEnabled ? "ON" : "OFF"}
                  </span>
                </button>
              </div>
            )}
          </aside>

          {/* 2. MAIN CONTENT AREA */}
          <main className="flex-1 min-w-0 p-6 md:p-8 flex flex-col">
            {/* Top Bar matching screenshot */}
            <div className="flex items-center justify-between gap-4 mb-6">
              {/* Search Pill Input */}
              <div
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white/80 hover:bg-white border border-neutral-200/60 rounded-2xl w-full max-w-sm cursor-pointer shadow-sm transition-all"
              >
                <Search className="w-4 h-4 text-neutral-400" />
                <span className="text-xs text-neutral-400 select-none">
                  Search anything...
                </span>
                <span className="ml-auto text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">
                  ⌘K
                </span>
              </div>

              {/* Action Icons + User Avatar */}
              <div className="flex items-center gap-3">
                {/* Message Icon */}
                <button
                  onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                  className="relative p-2.5 bg-white/80 hover:bg-white border border-neutral-200/60 rounded-2xl text-neutral-600 hover:text-neutral-900 shadow-sm transition-all"
                  title="Messages"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-neutral-900 rounded-full" />
                </button>

                {/* Notification Bell */}
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-2.5 bg-white/80 hover:bg-white border border-neutral-200/60 rounded-2xl text-neutral-600 hover:text-neutral-900 shadow-sm transition-all"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
                </button>

                {/* Sarah's Profile Avatar */}
                <Link
                  href="/settings"
                  className="flex items-center gap-2 pl-1 cursor-pointer group"
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-neutral-300 transition-all"
                  />
                </Link>
              </div>
            </div>

            {/* Page Dynamic Content */}
            <div className="flex-1">{children}</div>
          </main>
        </div>
      </div>

      {/* Global Modals & Drawers */}
      <NewCourseModal />
      <CreatePostModal />
      <StudentProfileModal />
      <GlobalSearchModal />
      <NotificationPopover />
      <MessagesDrawer />
    </div>
  );
}
