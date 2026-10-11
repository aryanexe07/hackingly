"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSkillHub } from "@/lib/store";
import { SkillHubLogo, SkillHubLogoIcon } from "./SkillHubLogo";
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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {
    user,
    setIsSearchOpen,
    isNotificationOpen,
    setIsNotificationOpen,
    isMessagesOpen,
    setIsMessagesOpen,
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
    <div className="min-h-screen lg:h-screen lg:max-h-screen bg-[#ECEFF3] flex overflow-hidden selection:bg-neutral-900 selection:text-white">
      {/* 1. LEFT SIDEBAR: At the back on the base canvas layer */}
      <aside
        className={`flex flex-col justify-between py-6 transition-all duration-300 ease-in-out flex-shrink-0 z-20 ${
          sidebarCollapsed ? "w-20 px-3" : "w-64 pl-6 pr-4"
        }`}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo & Collapse Header */}
          <div
            className={`flex items-center pb-7 ${
              sidebarCollapsed
                ? "flex-col gap-4 justify-center"
                : "justify-between px-1"
            }`}
          >
            {sidebarCollapsed ? (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="w-10 h-10 flex items-center justify-center text-neutral-900 hover:text-neutral-700 transition-colors"
                title="Expand Sidebar"
              >
                <SkillHubLogoIcon className="w-6 h-6" color="currentColor" />
              </button>
            ) : (
              <SkillHubLogo />
            )}

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 hover:bg-neutral-200/50 rounded-xl text-neutral-400 hover:text-neutral-700 transition-colors flex items-center justify-center"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Section: Scrollable middle area */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-0.5">
            {/* Main Navigation Group */}
            <div>
              {!sidebarCollapsed ? (
                <span className="text-[11px] font-semibold text-neutral-400 block mb-2 px-3.5">
                  Main
                </span>
              ) : (
                <div className="w-8 h-px bg-neutral-200/80 mx-auto my-2" />
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
                      className={`group relative flex items-center transition-all duration-150 ${
                        sidebarCollapsed
                          ? "w-11 h-11 justify-center mx-auto rounded-2xl"
                          : "gap-3 px-3.5 py-2.5 rounded-2xl text-xs"
                      } ${
                        isActive
                          ? "bg-white text-neutral-900 font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-neutral-200/50"
                          : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/40 font-medium"
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-105 ${
                          isActive
                            ? "text-neutral-900"
                            : "text-neutral-400 group-hover:text-neutral-600"
                        }`}
                      />
                      {!sidebarCollapsed && <span>{item.name}</span>}

                      {/* Tooltip on collapsed hover */}
                      {sidebarCollapsed && (
                        <div className="absolute left-full ml-3 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Others Navigation Group */}
            <div>
              {!sidebarCollapsed ? (
                <span className="text-[11px] font-semibold text-neutral-400 block mb-2 px-3.5">
                  Others
                </span>
              ) : (
                <div className="w-8 h-px bg-neutral-200/80 mx-auto my-2" />
              )}

              <nav className="space-y-1.5">
                {othersNavItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center transition-all duration-150 ${
                        sidebarCollapsed
                          ? "w-11 h-11 justify-center mx-auto rounded-2xl"
                          : "gap-3 px-3.5 py-2.5 rounded-2xl text-xs"
                      } ${
                        isActive
                          ? "bg-white text-neutral-900 font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-neutral-200/50"
                          : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/40 font-medium"
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-105 ${
                          isActive
                            ? "text-neutral-900"
                            : "text-neutral-400 group-hover:text-neutral-600"
                        }`}
                      />
                      {!sidebarCollapsed && <span>{item.name}</span>}

                      {sidebarCollapsed && (
                        <div className="absolute left-full ml-3 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom User Profile Section */}
        <div className="pt-4 border-t border-neutral-200/60 flex-shrink-0">
          <Link
            href="/settings"
            className={`group flex items-center transition-all duration-150 rounded-2xl hover:bg-neutral-200/40 ${
              sidebarCollapsed
                ? "justify-center p-2 mx-auto"
                : "gap-3 px-3.5 py-2.5"
            }`}
            title="View Profile Settings"
          >
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-neutral-900 truncate group-hover:text-neutral-950">
                  {user.fullName}
                </p>
                <p className="text-[11px] text-neutral-400 truncate font-medium">
                  Instructor
                </p>
              </div>
            )}
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CONTENT BLOCK: Solid White Card overlayed on the navbar layer */}
      <div className="flex-1 min-w-0 p-3 sm:p-4 lg:p-5 pl-0 sm:pl-0 lg:pl-0 flex flex-col h-full">
        <main className="floating-window flex-1 min-w-0 flex flex-col p-6 sm:p-8 lg:p-9 relative overflow-y-auto">
          {/* Dedicated Floating Window Top Bar matching Image 1 & Image 4 */}
          <div className="flex items-center justify-between gap-4 mb-7 pb-2">
            {/* Quick Search Pill Input with subtle greyish bg */}
            <div
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-[#F8F9FA] hover:bg-[#F1F3F6] border border-neutral-200/70 rounded-2xl w-full max-w-sm cursor-pointer shadow-sm transition-all"
            >
              <Search className="w-4 h-4 text-neutral-400" />
              <span className="text-xs text-neutral-400 select-none">
                Search anything...
              </span>
              <span className="ml-auto text-[10px] font-mono text-neutral-400 bg-white border border-neutral-200/60 px-1.5 py-0.5 rounded shadow-2xs">
                ⌘K
              </span>
            </div>

            {/* Actions: Messages + Notifications + Profile Avatar */}
            <div className="flex items-center gap-2.5">
              {/* Messages Trigger */}
              <button
                onClick={() => setIsMessagesOpen(!isMessagesOpen)}
                className="relative p-2.5 bg-[#F8F9FA] hover:bg-[#F1F3F6] border border-neutral-200/70 rounded-2xl text-neutral-600 hover:text-neutral-900 shadow-sm transition-all"
                title="Messages"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-neutral-900 rounded-full ring-2 ring-white" />
              </button>

              {/* Notifications Trigger */}
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2.5 bg-[#F8F9FA] hover:bg-[#F1F3F6] border border-neutral-200/70 rounded-2xl text-neutral-600 hover:text-neutral-900 shadow-sm transition-all"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
              </button>

              {/* Sarah's Profile Avatar */}
              <Link
                href="/settings"
                className="flex items-center gap-2 pl-1 cursor-pointer group"
                title="View Profile Settings"
              >
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-100 group-hover:ring-neutral-300 shadow-sm transition-all"
                />
              </Link>
            </div>
          </div>

          {/* Floating Window Core Dynamic Page Content */}
          <div className="flex-1">{children}</div>
        </main>
      </div>

      {/* Global Interactive Modals & Slide-over Drawers */}
      <NewCourseModal />
      <CreatePostModal />
      <StudentProfileModal />
      <GlobalSearchModal />
      <NotificationPopover />
      <MessagesDrawer />
    </div>
  );
}
