"use client";

import React from "react";
import { useSkillHub } from "@/lib/store";
import { Bell, MessageSquare, Check, X, ArrowUpRight } from "lucide-react";

export function NotificationPopover() {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
  } = useSkillHub();

  if (!isNotificationOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] md:bg-transparent"
      onClick={() => setIsNotificationOpen(false)}
    >
      <div
        className="absolute top-14 sm:top-16 right-3 sm:right-6 md:right-20 w-[calc(100vw-1.5rem)] sm:w-80 max-w-sm bg-white rounded-2xl shadow-2xl border border-neutral-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-neutral-800" />
            <h4 className="text-xs font-bold text-neutral-900">Notifications</h4>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 ? (
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            ) : (
              <span className="text-[10px] text-neutral-400">All caught up</span>
            )}
            {notifications.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markAllNotificationsAsRead();
                }}
                className="text-[10px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
                title="Mark all as read"
              >
                Read all
              </button>
            )}
          </div>
        </div>

        <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationAsRead(n.id)}
              className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                n.unread ? "bg-neutral-50/90 border border-neutral-200/50" : "hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
                  {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  {n.title}
                </span>
                <span className="text-[10px] text-neutral-400">{n.time}</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                {n.desc}
              </p>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-6 text-xs text-neutral-400">
              No notifications yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function MessagesDrawer() {
  const {
    isMessagesOpen,
    setIsMessagesOpen,
    setSelectedStudent,
    students,
    studentMessages,
  } = useSkillHub();

  if (!isMessagesOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] md:bg-transparent"
      onClick={() => setIsMessagesOpen(false)}
    >
      <div
        className="absolute top-14 sm:top-16 right-3 sm:right-6 md:right-28 w-[calc(100vw-1.5rem)] sm:w-84 max-w-sm bg-white rounded-2xl shadow-2xl border border-neutral-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-neutral-800" />
            <h4 className="text-xs font-bold text-neutral-900">Direct Messages</h4>
          </div>
          <span className="text-[10px] text-neutral-400">{students.length} students</span>
        </div>

        <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
          {students.map((stu) => {
            const thread = studentMessages[stu.id] || [];
            const lastMsg = thread.length > 0 ? thread[thread.length - 1] : null;

            return (
              <div
                key={stu.id}
                onClick={() => {
                  setIsMessagesOpen(false);
                  setSelectedStudent(stu);
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors min-h-[44px]"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={stu.avatar}
                    alt={stu.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  {stu.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-neutral-900 truncate">
                      {stu.name}
                    </p>
                    {lastMsg && (
                      <span className="text-[9px] text-neutral-400">{lastMsg.time}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {lastMsg ? lastMsg.text : stu.course}
                  </p>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono flex-shrink-0 bg-neutral-100 px-1.5 py-0.5 rounded">
                  Chat
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
