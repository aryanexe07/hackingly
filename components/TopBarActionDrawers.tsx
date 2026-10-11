"use client";

import React from "react";
import { useSkillHub } from "@/lib/store";
import { Bell, MessageSquare, Check, X, ArrowUpRight } from "lucide-react";

export function NotificationPopover() {
  const { isNotificationOpen, setIsNotificationOpen } = useSkillHub();

  if (!isNotificationOpen) return null;

  const notifications = [
    {
      id: "1",
      title: "New student enrollment",
      desc: "Marvin McKinney enrolled in Typography Masterclass",
      time: "10m ago",
      unread: true,
    },
    {
      id: "2",
      title: "Live session starting soon",
      desc: "Advanced UI/UX Design scheduled for Today, 10:00 AM",
      time: "25m ago",
      unread: true,
    },
    {
      id: "3",
      title: "New community reply",
      desc: "Sarah Wilson replied to 'How can AI improve UX research?'",
      time: "1h ago",
      unread: false,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-40 bg-transparent"
      onClick={() => setIsNotificationOpen(false)}
    >
      <div
        className="absolute top-16 right-20 w-80 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-neutral-800" />
            <h4 className="text-xs font-bold text-neutral-900">Notifications</h4>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            2 new
          </span>
        </div>

        <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-2.5 rounded-xl transition-colors ${
                n.unread ? "bg-neutral-50/80" : "hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-900">
                  {n.title}
                </span>
                <span className="text-[10px] text-neutral-400">{n.time}</span>
              </div>
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                {n.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MessagesDrawer() {
  const { isMessagesOpen, setIsMessagesOpen, setSelectedStudent, students } = useSkillHub();

  if (!isMessagesOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-transparent"
      onClick={() => setIsMessagesOpen(false)}
    >
      <div
        className="absolute top-16 right-28 w-84 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-neutral-800" />
            <h4 className="text-xs font-bold text-neutral-900">Direct Messages</h4>
          </div>
          <span className="text-[10px] text-neutral-400">3 conversations</span>
        </div>

        <div className="py-2 space-y-2">
          {students.slice(0, 3).map((stu) => (
            <div
              key={stu.id}
              onClick={() => {
                setIsMessagesOpen(false);
                setSelectedStudent(stu);
              }}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              <div className="relative">
                <img
                  src={stu.avatar}
                  alt={stu.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {stu.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-neutral-900 truncate">
                  {stu.name}
                </p>
                <p className="text-[10px] text-neutral-400 truncate">
                  {stu.course}
                </p>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">Chat</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
