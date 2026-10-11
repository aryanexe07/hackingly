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

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
}

export interface StudentMessage {
  id: string;
  sender: "user" | "student";
  text: string;
  time: string;
}

export interface DiscussionComment {
  id: string;
  author: string;
  authorAvatar: string;
  text: string;
  timeAgo: string;
  likes: number;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New student enrollment",
    desc: "Marvin McKinney enrolled in Typography Masterclass",
    time: "10m ago",
    unread: true,
  },
  {
    id: "notif-2",
    title: "Live session starting soon",
    desc: "Advanced UI/UX Design scheduled for Today, 10:00 AM",
    time: "25m ago",
    unread: true,
  },
  {
    id: "notif-3",
    title: "New community reply",
    desc: "Albert Flores replied to 'How can AI improve UX research?'",
    time: "1h ago",
    unread: false,
  },
];

const INITIAL_MESSAGES: Record<string, StudentMessage[]> = {
  "stu-1": [
    {
      id: "m-1",
      sender: "student",
      text: "Hi Sarah! I just finished Module 2 on Font Pairings. The hierarchy guide was super helpful!",
      time: "10:15 AM",
    },
    {
      id: "m-2",
      sender: "user",
      text: "Great work Marvin! Make sure to experiment with variable weight optical sizing on the headline project.",
      time: "10:20 AM",
    },
  ],
  "stu-2": [
    {
      id: "m-3",
      sender: "student",
      text: "Hey Sarah, will today's Live Session on Design Tokens be recorded?",
      time: "9:45 AM",
    },
    {
      id: "m-4",
      sender: "user",
      text: "Yes Albert! All live sessions and whiteboards are automatically uploaded to your student portal.",
      time: "9:50 AM",
    },
  ],
  "stu-3": [
    {
      id: "m-5",
      sender: "student",
      text: "Thank you for the review notes on my portfolio handoff!",
      time: "Yesterday",
    },
  ],
};

const INITIAL_COMMENTS: Record<string, DiscussionComment[]> = {
  "disc-featured": [
    {
      id: "c-1",
      author: "Albert Flores",
      authorAvatar: "/assets/avatar-albert.jpg",
      text: "AI transcript clustering cut down our qualitative affinity mapping time by almost 60%. Essential for fast user interviews!",
      timeAgo: "2h ago",
      likes: 14,
    },
    {
      id: "c-2",
      author: "Bessie Cooper",
      authorAvatar: "/assets/avatar-bessie.jpg",
      text: "Agree, but human synthesis is still irreplaceable when interpreting subtle vocal hesitations and user friction points.",
      timeAgo: "1h ago",
      likes: 9,
    },
  ],
};

export type TimeframeOption = "This Week" | "This Month" | "This Year";

interface SkillHubContextType {
  user: typeof CURRENT_USER;
  updateUser: (data: Partial<typeof CURRENT_USER>) => void;
  courses: Course[];
  students: Student[];
  discussions: CommunityDiscussion[];
  activeCourseFilter: string;
  setActiveCourseFilter: (filter: string) => void;
  activeStudentFilter: string;
  setActiveStudentFilter: (filter: string) => void;
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
  selectedDiscussion: CommunityDiscussion | null;
  setSelectedDiscussion: (discussion: CommunityDiscussion | null) => void;
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
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  studentMessages: Record<string, StudentMessage[]>;
  sendMessageToStudent: (studentId: string, message: string) => void;
  discussionComments: Record<string, DiscussionComment[]>;
  addDiscussionComment: (discussionId: string, text: string) => void;
  likeDiscussion: (discussionId: string) => void;
  addCourse: (course: Omit<Course, "id">) => void;
  updateCourseStatus: (id: string, status: Course["status"]) => void;
  toggleCourseLive: (id: string) => void;
  deleteCourse: (id: string) => void;
  duplicateCourse: (id: string) => void;
  addDiscussion: (discussion: Omit<CommunityDiscussion, "id">) => void;
  updateStudentStatus: (id: string, status: Student["status"]) => void;
  addStudent: (student: Omit<Student, "id">) => void;
  deleteStudent: (id: string) => void;
  growthTimeframe: TimeframeOption;
  setGrowthTimeframe: (tf: TimeframeOption) => void;
  analyticsTimeframe: TimeframeOption;
  setAnalyticsTimeframe: (tf: TimeframeOption) => void;
}

const SkillHubContext = createContext<SkillHubContextType | undefined>(undefined);

export function SkillHubProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(CURRENT_USER);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [discussions, setDiscussions] = useState<CommunityDiscussion[]>(INITIAL_DISCUSSIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [studentMessages, setStudentMessages] = useState<Record<string, StudentMessage[]>>(INITIAL_MESSAGES);
  const [discussionComments, setDiscussionComments] = useState<Record<string, DiscussionComment[]>>(INITIAL_COMMENTS);
  const [growthTimeframe, setGrowthTimeframe] = useState<TimeframeOption>("This Month");
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<TimeframeOption>("This Month");

  const [activeCourseFilter, setActiveCourseFilter] = useState("All Courses");
  const [activeStudentFilter, setActiveStudentFilter] = useState("All Students");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState<CommunityDiscussion | null>(null);

  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const updateUser = (data: Partial<typeof CURRENT_USER>) => {
    setUser((prev) => ({
      ...prev,
      ...data,
      name: data.fullName ? data.fullName.split(" ")[0] : prev.name,
    }));
  };

  const addCourse = (newCourse: Omit<Course, "id">) => {
    const course: Course = {
      ...newCourse,
      id: `course-${Date.now()}`,
    };
    setCourses((prev) => [course, ...prev]);

    // Automatically generate notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Course Published",
      desc: `"${newCourse.title}" is now available to learners worldwide`,
      time: "Just now",
      unread: true,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateCourseStatus = (id: string, status: Course["status"]) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const toggleCourseLive = (id: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              isUpcomingLive: !c.isUpcomingLive,
              liveTime: !c.isUpcomingLive ? "Live Now" : "Scheduled",
            }
          : c
      )
    );
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const duplicateCourse = (id: string) => {
    const target = courses.find((c) => c.id === id);
    if (!target) return;
    const duplicated: Course = {
      ...target,
      id: `course-${Date.now()}`,
      title: `${target.title} (Copy)`,
      status: "Drafts",
    };
    setCourses((prev) => [duplicated, ...prev]);
  };

  const addDiscussion = (newDiscussion: Omit<CommunityDiscussion, "id">) => {
    const discussion: CommunityDiscussion = {
      ...newDiscussion,
      id: `disc-${Date.now()}`,
    };
    setDiscussions((prev) => [discussion, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Community Post Live",
      desc: `Your discussion "${newDiscussion.title}" was posted`,
      time: "Just now",
      unread: true,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateStudentStatus = (id: string, status: Student["status"]) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const addStudent = (newStudent: Omit<Student, "id">) => {
    const student: Student = {
      ...newStudent,
      id: `stud-${Date.now()}`,
    };
    setStudents((prev) => [student, ...prev]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: "Student Enrolled",
        desc: `${newStudent.name} enrolled in ${newStudent.course}`,
        time: "Just now",
        unread: true,
      },
      ...prev,
    ]);
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
    }
  };

  const sendMessageToStudent = (studentId: string, messageText: string) => {
    const userMsg: StudentMessage = {
      id: `m-${Date.now()}`,
      sender: "user",
      text: messageText,
      time: "Just now",
    };

    setStudentMessages((prev) => ({
      ...prev,
      [studentId]: [...(prev[studentId] || []), userMsg],
    }));

    // Simulate smart auto-reply from student after 1.5 seconds for true dynamic UX
    setTimeout(() => {
      const student = students.find((s) => s.id === studentId);
      const studentName = student ? student.name.split(" ")[0] : "Student";
      const autoReply: StudentMessage = {
        id: `m-${Date.now() + 1}`,
        sender: "student",
        text: `Thanks Sarah! Appreciate the feedback on my coursework. Working on it right now!`,
        time: "Just now",
      };

      setStudentMessages((prev) => ({
        ...prev,
        [studentId]: [...(prev[studentId] || []), autoReply],
      }));

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: `Reply from ${studentName}`,
          desc: autoReply.text,
          time: "Just now",
          unread: true,
        },
        ...prev,
      ]);
    }, 1500);
  };

  const addDiscussionComment = (discussionId: string, text: string) => {
    const newComment: DiscussionComment = {
      id: `c-${Date.now()}`,
      author: user.fullName,
      authorAvatar: user.avatar,
      text,
      timeAgo: "Just now",
      likes: 0,
    };

    setDiscussionComments((prev) => ({
      ...prev,
      [discussionId]: [newComment, ...(prev[discussionId] || [])],
    }));

    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === discussionId ? { ...d, repliesCount: d.repliesCount + 1 } : d
      )
    );
  };

  const likeDiscussion = (discussionId: string) => {
    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === discussionId
          ? {
              ...d,
              viewsCount: `${parseInt(d.viewsCount.replace(/[^0-9]/g, "") || "10") + 1}`,
            }
          : d
      )
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <SkillHubContext.Provider
      value={{
        user,
        updateUser,
        courses,
        students,
        discussions,
        activeCourseFilter,
        setActiveCourseFilter,
        activeStudentFilter,
        setActiveStudentFilter,
        selectedStudent,
        setSelectedStudent,
        selectedDiscussion,
        setSelectedDiscussion,
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
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        studentMessages,
        sendMessageToStudent,
        discussionComments,
        addDiscussionComment,
        likeDiscussion,
        addCourse,
        updateCourseStatus,
        toggleCourseLive,
        deleteCourse,
        duplicateCourse,
        addDiscussion,
        updateStudentStatus,
        addStudent,
        deleteStudent,
        growthTimeframe,
        setGrowthTimeframe,
        analyticsTimeframe,
        setAnalyticsTimeframe,
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
