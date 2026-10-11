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
  X,
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
    notifications,
  } = useSkillHub();

  const unreadNotifCount = notifications.filter((n) => n.unread).length;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen lg:h-screen lg:max-h-screen bg-[#ECEFF3] flex flex-col md:flex-row overflow-x-hidden md:overflow-hidden selection:bg-neutral-900 selection:text-white">
      {/* 0. MOBILE TOP APP BAR (Apple-inspired header for viewports < 768px) */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-3.5 py-2.5 bg-[#ECEFF3]/95 backdrop-blur-md border-b border-neutral-200/50">
        <div className="flex items-center gap-2">
          <SkillHubLogo />
        </div>

        <div className="flex items-center gap-1">
          {/* Quick Search Action */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-white/80 active:bg-white rounded-xl text-neutral-600 hover:text-neutral-900 transition-colors"
            title="Search"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Messages Action */}
          <button
            onClick={() => setIsMessagesOpen(!isMessagesOpen)}
            className="relative p-2 hover:bg-white/80 active:bg-white rounded-xl text-neutral-600 hover:text-neutral-900 transition-colors"
            title="Messages"
            aria-label="Messages"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neutral-900 rounded-full ring-2 ring-[#ECEFF3]" />
          </button>

          {/* Notifications Action */}
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2 hover:bg-white/80 active:bg-white rounded-xl text-neutral-600 hover:text-neutral-900 transition-colors"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-[#ECEFF3]" />
            )}
          </button>

          {/* User Profile & Secondary Menu Action */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1 pl-1 cursor-pointer"
            title="Open Account Menu"
            aria-label="Open Account Menu"
          >
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-white shadow-xs"
            />
          </button>
        </div>
      </header>

      {/* 1. LEFT SIDEBAR: At the back on canvas base (hidden on mobile, compact on tablet, full on desktop) */}
      <aside
        className={`hidden md:flex flex-col justify-between py-6 transition-all duration-300 ease-in-out flex-shrink-0 z-20 ${
          sidebarCollapsed
            ? "w-16 lg:w-20 px-2 lg:px-3"
            : "w-16 lg:w-64 px-2 lg:pl-6 lg:pr-4"
        }`}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo & Collapse Header */}
          <div
            className={`flex items-center pb-7 ${
              sidebarCollapsed
                ? "flex-col gap-4 justify-center"
                : "justify-center lg:justify-between px-1"
            }`}
          >
            {/* Tablet / Collapsed Logo Icon */}
            <div className="lg:hidden flex items-center justify-center">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-10 h-10 flex items-center justify-center text-neutral-900 hover:text-neutral-700 transition-colors"
                title="Sutra"
              >
                <SkillHubLogoIcon className="w-6 h-6" color="currentColor" />
              </button>
            </div>

            {/* Desktop Full Logo */}
            <div className="hidden lg:flex items-center">
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
            </div>

            {/* Desktop Collapse Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 hover:bg-neutral-200/50 rounded-xl text-neutral-400 hover:text-neutral-700 transition-colors items-center justify-center"
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
              {!sidebarCollapsed && (
                <span className="hidden lg:block text-[11px] font-semibold text-neutral-400 mb-2 px-3.5">
                  Main
                </span>
              )}
              {sidebarCollapsed && (
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
                          : "justify-center lg:justify-start w-11 h-11 lg:w-auto lg:h-auto lg:gap-3 px-0 lg:px-3.5 py-2.5 rounded-2xl text-xs"
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
                      {!sidebarCollapsed && (
                        <span className="hidden lg:inline">{item.name}</span>
                      )}

                      {/* Tooltip on collapsed / tablet hover */}
                      <div className="lg:hidden absolute left-full ml-3 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                        {item.name}
                      </div>
                      {sidebarCollapsed && (
                        <div className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
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
              {!sidebarCollapsed && (
                <span className="hidden lg:block text-[11px] font-semibold text-neutral-400 mb-2 px-3.5">
                  Others
                </span>
              )}
              {sidebarCollapsed && (
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
                          : "justify-center lg:justify-start w-11 h-11 lg:w-auto lg:h-auto lg:gap-3 px-0 lg:px-3.5 py-2.5 rounded-2xl text-xs"
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
                      {!sidebarCollapsed && (
                        <span className="hidden lg:inline">{item.name}</span>
                      )}

                      {/* Tooltip on collapsed / tablet hover */}
                      <div className="lg:hidden absolute left-full ml-3 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
                        {item.name}
                      </div>
                      {sidebarCollapsed && (
                        <div className="hidden lg:block absolute left-full ml-3 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-semibold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap z-50">
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
                : "justify-center lg:justify-start p-2 lg:px-3.5 lg:py-2.5 lg:gap-3"
            }`}
            title="View Profile Settings"
          >
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1 hidden lg:block">
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
      <div className="flex-1 min-w-0 p-2 sm:p-3 md:p-3 lg:p-5 md:pl-0 flex flex-col h-full max-w-[1920px] mx-auto w-full">
        <main className="floating-window flex-1 min-w-0 flex flex-col p-4 sm:p-6 lg:p-9 rounded-2xl sm:rounded-3xl lg:rounded-[32px] relative overflow-y-auto">
          {/* Dedicated Floating Window Top Bar: visible on desktop/tablet */}
          <div className="hidden md:flex items-center justify-between gap-4 mb-7 pb-2">
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
                {unreadNotifCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
                )}
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
          <div className="flex-1 pb-20 md:pb-0">{children}</div>
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION DOCK (Apple-inspired Tab Bar for viewports < 768px) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-neutral-200/60 px-2 pt-1.5 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
      >
        <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
          {mainNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/dashboard" && pathname === "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-150 min-h-[44px] ${
                  isActive
                    ? "text-neutral-950 font-bold"
                    : "text-neutral-400 hover:text-neutral-700 font-medium"
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-colors ${
                    isActive ? "bg-neutral-100 text-neutral-950 shadow-2xs" : ""
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-[56px]">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 4. MOBILE ACCOUNT & SECONDARY MENU SHEET (Apple-style Action Sheet) */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-full bg-white rounded-t-[28px] p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl border-t border-neutral-200/50 space-y-4 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-10 h-1 bg-neutral-200 rounded-full mx-auto" />

            {/* User Profile Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-neutral-100 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    {user.fullName}
                  </h4>
                  <p className="text-xs text-neutral-400 font-medium">
                    Instructor • Sutra
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Secondary Navigation Links */}
            <div className="space-y-1 pt-1">
              {othersNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
                >
                  <item.icon className="w-4 h-4 text-neutral-500" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

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
