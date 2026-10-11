"use client";

import React, { useState } from "react";
import { useSkillHub } from "@/lib/store";
import { X, Plus, Sparkles, BookOpen } from "lucide-react";

export function NewCourseModal() {
  const { isNewCourseModalOpen, setIsNewCourseModalOpen, addCourse } = useSkillHub();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("Create beautiful and intuitive user experiences");
  const [category, setCategory] = useState("UI/UX Design");
  const [image, setImage] = useState("/assets/course-figma.jpg");
  const [status, setStatus] = useState<"Published" | "Drafts">("Published");

  if (!isNewCourseModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCourse({
      title,
      subtitle,
      category,
      image,
      studentsCount: "1",
      progress: 0,
      status,
      lessonsCount: 12,
      duration: "8h 30m",
      rating: 5.0,
      instructor: "Sarah Wilson",
    });

    setIsNewCourseModalOpen(false);
    setTitle("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 font-heading">
                Create New Course
              </h3>
              <p className="text-xs text-neutral-500">
                Publish a new interactive learning curriculum
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsNewCourseModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
              Course Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Design Systems with Token Engines"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
              Course Tagline / Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-all"
              >
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Typography">Typography</option>
                <option value="Web Design">Web Design</option>
                <option value="Development">Development</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "Published" | "Drafts")}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 transition-all"
              >
                <option value="Published">Published</option>
                <option value="Drafts">Drafts</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 block mb-1.5">
              3D Course Artwork
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Figma 3D", src: "/assets/course-figma.jpg" },
                { label: "Wireframe 3D", src: "/assets/course-uiux.jpg" },
                { label: "Type 3D", src: "/assets/course-typography.jpg" },
                { label: "Workspace 3D", src: "/assets/course-webdesign.jpg" },
              ].map((opt) => (
                <div
                  key={opt.src}
                  onClick={() => setImage(opt.src)}
                  className={`border-2 rounded-2xl p-1 cursor-pointer transition-all ${
                    image === opt.src
                      ? "border-neutral-900 shadow-md ring-2 ring-neutral-900/10"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={opt.src}
                    alt={opt.label}
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                  <span className="block text-[10px] text-center font-medium text-neutral-700 mt-1 truncate">
                    {opt.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setIsNewCourseModalOpen(false)}
              className="px-4 py-2 border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-xs font-semibold rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
            >
              Publish Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
