"use client";

import React, { createContext, useContext, useState } from "react";
import {
  Course,
  Student,
  CommunityDiscussion,
  INITIAL_COURSES,
  INITIAL_STUDENTS,
  INITIAL_DISCUSSIONS,
  CURRENT_USER,
} from "./skillhub-data";

interface SkillHubContextType {
  user: typeof CURRENT_USER;
  courses: Course[];
  students: Student[];
  discussions: CommunityDiscussion[];
  activeCourseFilter: string;
  setActiveCourseFilter: (filter: string) => void;
  activeStudentFilter: string;
  setActiveStudentFilter: (filter: string) => void;
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  isNewCourseModalOpen: boolean;
  setIsNewCourseModalOpen: (open: boolean) => void;
  isCreatePostModalOpen: boolean;
  setIsCreatePostModalOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  isMessagesOpen: boolean;
  setIsMessagesOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addCourse: (course: Omit<Course, "id">) => void;
  addDiscussion: (discussion: Omit<CommunityDiscussion, "id">) => void;
  sendMessageToStudent: (studentId: string, message: string) => void;
}

const SkillHubContext = createContext<SkillHubContextType | undefined>(undefined);

export function SkillHubProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(CURRENT_USER);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [discussions, setDiscussions] = useState<CommunityDiscussion[]>(INITIAL_DISCUSSIONS);
  const [activeCourseFilter, setActiveCourseFilter] = useState("All Courses");
  const [activeStudentFilter, setActiveStudentFilter] = useState("All Students");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addCourse = (newCourse: Omit<Course, "id">) => {
    const course: Course = {
      ...newCourse,
      id: `course-${Date.now()}`,
    };
    setCourses((prev) => [course, ...prev]);
  };

  const addDiscussion = (newDiscussion: Omit<CommunityDiscussion, "id">) => {
    const discussion: CommunityDiscussion = {
      ...newDiscussion,
      id: `disc-${Date.now()}`,
    };
    setDiscussions((prev) => [discussion, ...prev]);
  };

  const sendMessageToStudent = (studentId: string, message: string) => {
    console.log(`Message sent to student ${studentId}:`, message);
  };

  return (
    <SkillHubContext.Provider
      value={{
        user,
        courses,
        students,
        discussions,
        activeCourseFilter,
        setActiveCourseFilter,
        activeStudentFilter,
        setActiveStudentFilter,
        selectedStudent,
        setSelectedStudent,
        isNewCourseModalOpen,
        setIsNewCourseModalOpen,
        isCreatePostModalOpen,
        setIsCreatePostModalOpen,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationOpen,
        setIsNotificationOpen,
        isMessagesOpen,
        setIsMessagesOpen,
        searchQuery,
        setSearchQuery,
        addCourse,
        addDiscussion,
        sendMessageToStudent,
      }}
    >
      {children}
    </SkillHubContext.Provider>
  );
}

export function useSkillHub() {
  const context = useContext(SkillHubContext);
  if (!context) {
    throw new Error("useSkillHub must be used within a SkillHubProvider");
  }
  return context;
}
