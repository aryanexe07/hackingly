export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  studentsCount: string;
  progress: number;
  status: "Published" | "Drafts" | "Archived";
  lessonsCount: number;
  duration: string;
  rating: number;
  instructor: string;
  isUpcomingLive?: boolean;
  liveTime?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  status: "Active" | "At Risk" | "Completed" | "Inactive";
  avatar: string;
  isOnline: boolean;
  enrolledDate: string;
  lastActive: string;
  grade: string;
  attendance: string;
  completedLessons: number;
  totalLessons: number;
  bio?: string;
}

export interface CommunityDiscussion {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  repliesCount: number;
  viewsCount: string;
  participantsCount: number;
  timeAgo: string;
  tags: string[];
  isFeatured?: boolean;
  summary?: string;
}

export interface RecentActivityItem {
  id: string;
  courseTitle: string;
  actionText: string;
  timeAgo: string;
  type: "enrollment" | "update";
}

export const CURRENT_USER = {
  name: "Sarah",
  fullName: "Sarah Wilson",
  role: "Lead Product Designer & Educator",
  avatar: "/assets/avatar-sarah.jpg",
  unreadMessages: 3,
  unreadNotifications: 5,
};

export const INITIAL_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Figma for Beginner",
    subtitle: "Create beautiful and intuitive user experiences",
    category: "Design",
    image: "/assets/course-figma.jpg",
    studentsCount: "25+",
    progress: 45.6,
    status: "Published",
    lessonsCount: 24,
    duration: "14h 30m",
    rating: 4.9,
    instructor: "Sarah Wilson",
  },
  {
    id: "course-2",
    title: "Advanced UI/UX Design",
    subtitle: "Create beautiful and intuitive user experiences",
    category: "UI/UX",
    image: "/assets/course-uiux.jpg",
    studentsCount: "2k+",
    progress: 20.6,
    status: "Published",
    lessonsCount: 36,
    duration: "28h 15m",
    rating: 4.95,
    instructor: "Sarah Wilson",
    isUpcomingLive: true,
    liveTime: "Today, 10:00 AM",
  },
  {
    id: "course-3",
    title: "Typography Masterclass",
    subtitle: "Master typographic hierarchy, font pairings, and responsive type",
    category: "Typography",
    image: "/assets/course-typography.jpg",
    studentsCount: "1.4k+",
    progress: 64.2,
    status: "Published",
    lessonsCount: 18,
    duration: "10h 40m",
    rating: 4.85,
    instructor: "Sarah Wilson",
  },
  {
    id: "course-4",
    title: "Web Design Fundamentals",
    subtitle: "Learn modern layout engines, fluid design systems, and responsive grids",
    category: "Web Design",
    image: "/assets/course-webdesign.jpg",
    studentsCount: "3.1k+",
    progress: 88.5,
    status: "Published",
    lessonsCount: 42,
    duration: "32h 00m",
    rating: 4.92,
    instructor: "Sarah Wilson",
  },
  {
    id: "course-5",
    title: "Design System Architecture",
    subtitle: "Build token-based design systems with multi-brand consistency",
    category: "Design Systems",
    image: "/assets/course-uiux.jpg",
    studentsCount: "850+",
    progress: 15.0,
    status: "Drafts",
    lessonsCount: 28,
    duration: "18h 20m",
    rating: 4.9,
    instructor: "Sarah Wilson",
  },
  {
    id: "course-6",
    title: "Legacy Interactive Prototyping",
    subtitle: "Advanced micro-interactions and high-fidelity transitions",
    category: "Prototyping",
    image: "/assets/course-figma.jpg",
    studentsCount: "4.2k+",
    progress: 100,
    status: "Archived",
    lessonsCount: 30,
    duration: "22h 00m",
    rating: 4.8,
    instructor: "Sarah Wilson",
  },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "stu-1",
    name: "Marvin McKinney",
    email: "marvin.inney@example.com",
    course: "Typography Masterclass",
    progress: 30.6,
    status: "Active",
    avatar: "/assets/avatar-marvin.jpg",
    isOnline: true,
    enrolledDate: "March 12, 2026",
    lastActive: "10 minutes ago",
    grade: "A-",
    attendance: "94%",
    completedLessons: 6,
    totalLessons: 18,
    bio: "Product designer aspiring to elevate editorial typography and micro-interactions in digital products.",
  },
  {
    id: "stu-2",
    name: "Albert Flores",
    email: "jessica.hanson@example.com",
    course: "UI/UX Design Mastery",
    progress: 52.4,
    status: "Active",
    avatar: "/assets/avatar-albert.jpg",
    isOnline: true,
    enrolledDate: "February 28, 2026",
    lastActive: "1 hour ago",
    grade: "A",
    attendance: "98%",
    completedLessons: 19,
    totalLessons: 36,
    bio: "Senior product manager transitioning deeper into human-centered UX design and research frameworks.",
  },
  {
    id: "stu-3",
    name: "Bessie Cooper",
    email: "jackson.graham@example.com",
    course: "Product Design Fundamentals",
    progress: 80.0,
    status: "Completed",
    avatar: "/assets/avatar-bessie.jpg",
    isOnline: true,
    enrolledDate: "January 15, 2026",
    lastActive: "Today, 9:20 AM",
    grade: "A+",
    attendance: "100%",
    completedLessons: 32,
    totalLessons: 32,
    bio: "Self-taught visual artist mastering full-cycle digital product architecture and design handoff.",
  },
  {
    id: "stu-4",
    name: "Jane Cooper",
    email: "debra.holt@example.com",
    course: "Figma for Beginners",
    progress: 67.5,
    status: "Active",
    avatar: "/assets/avatar-jane.jpg",
    isOnline: true,
    enrolledDate: "April 02, 2026",
    lastActive: "3 hours ago",
    grade: "B+",
    attendance: "88%",
    completedLessons: 16,
    totalLessons: 24,
    bio: "Junior UX researcher leveling up in design system components and autolayout prototypes.",
  },
  {
    id: "stu-5",
    name: "Brooklyn Williamson",
    email: "brooklyn.w@example.com",
    course: "Design System Architecture",
    progress: 94.0,
    status: "Active",
    avatar: "/assets/avatar-marvin.jpg",
    isOnline: true,
    enrolledDate: "March 05, 2026",
    lastActive: "Just now",
    grade: "A",
    attendance: "96%",
    completedLessons: 26,
    totalLessons: 28,
    bio: "Design technologist focusing on code-aligned token architectures and accessible design patterns.",
  },
  {
    id: "stu-6",
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    course: "Web Design Fundamentals",
    progress: 18.2,
    status: "At Risk",
    avatar: "/assets/avatar-sarah.jpg",
    isOnline: false,
    enrolledDate: "April 10, 2026",
    lastActive: "6 days ago",
    grade: "C",
    attendance: "62%",
    completedLessons: 7,
    totalLessons: 42,
    bio: "Needs dedicated mentor check-in due to missed project milestones in responsive grid layouts.",
  },
  {
    id: "stu-7",
    name: "Darrell Steward",
    email: "darrell.steward@example.com",
    course: "Advanced UI/UX Design",
    progress: 12.0,
    status: "Inactive",
    avatar: "/assets/avatar-albert.jpg",
    isOnline: false,
    enrolledDate: "January 20, 2026",
    lastActive: "3 weeks ago",
    grade: "Incomplete",
    attendance: "45%",
    completedLessons: 4,
    totalLessons: 36,
    bio: "On temporary sabbatical, pending course restart next academic term.",
  },
];

export const INITIAL_DISCUSSIONS: CommunityDiscussion[] = [
  {
    id: "disc-featured",
    title: "How can AI improve UX research?",
    author: "Sarah Wilson",
    authorRole: "Educator & Lead",
    authorAvatar: "/assets/avatar-sarah.jpg",
    repliesCount: 245,
    viewsCount: "1.2K",
    participantsCount: 48,
    timeAgo: "Pinned",
    tags: ["AI", "UX Research", "Synthesis"],
    isFeatured: true,
    summary:
      "Exploring how generative clustering, semantic sentiment analysis, and interview transcript summarization enhance rapid customer insights without losing genuine human empathy.",
  },
  {
    id: "disc-1",
    title: "Building your first portfolio",
    author: "Sarah Wilson",
    authorRole: "Author",
    authorAvatar: "/assets/avatar-sarah.jpg",
    repliesCount: 18,
    viewsCount: "640",
    participantsCount: 12,
    timeAgo: "2h ago",
    tags: ["Portfolio", "Career"],
  },
  {
    id: "disc-2",
    title: "Best Figma plugins in 2026",
    author: "Mike Chen",
    authorRole: "Community Member",
    authorAvatar: "/assets/avatar-marvin.jpg",
    repliesCount: 24,
    viewsCount: "890",
    participantsCount: 19,
    timeAgo: "Yesterday",
    tags: ["Figma", "Workflow"],
  },
  {
    id: "disc-3",
    title: "Best Figma plugins in 2026 (Part 2)",
    author: "Mike Chen",
    authorRole: "Community Member",
    authorAvatar: "/assets/avatar-albert.jpg",
    repliesCount: 24,
    viewsCount: "510",
    participantsCount: 16,
    timeAgo: "Yesterday",
    tags: ["Figma", "Plugins"],
  },
  {
    id: "disc-4",
    title: "Design System Tips",
    author: "Emma Davis",
    authorRole: "Design Technologist",
    authorAvatar: "/assets/avatar-jane.jpg",
    repliesCount: 12,
    viewsCount: "430",
    participantsCount: 9,
    timeAgo: "Today",
    tags: ["Design Systems", "Tokens"],
  },
];

export const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: "act-1",
    courseTitle: "Advanced UI/UX Design",
    actionText: "12 new enrollments",
    timeAgo: "1h ago",
    type: "enrollment",
  },
  {
    id: "act-2",
    courseTitle: "React.js Masterclass",
    actionText: "Lesson updated",
    timeAgo: "3h ago",
    type: "update",
  },
  {
    id: "act-3",
    courseTitle: "React.js Masterclass",
    actionText: "12 new enrollments",
    timeAgo: "5h ago",
    type: "enrollment",
  },
  {
    id: "act-4",
    courseTitle: "Design System Essentials",
    actionText: "12 new enrollments",
    timeAgo: "2h ago",
    type: "enrollment",
  },
];

export const ANALYTICS_DATA = {
  growthOverview: {
    activeLearners: "25k",
    newEnrollments: "12K",
    totalEnrollments: "15K",
    growthPercentage: 42,
  },
  learningAnalytics: {
    totalStudents: { value: "28K", change: "+15% vs last week", isPositive: true },
    avgLearningTime: { value: "4h32m", change: "-15% vs last week", isPositive: false },
    completionRate: { value: "68.4%", change: "+12% vs last week", isPositive: true },
  },
  studentEngagementTrend: {
    consistentEngagement: "+ 6.91%",
    points: [
      { month: "Jan", value: 320 },
      { month: "Feb", value: 340 },
      { month: "Mar", value: 410 },
      { month: "Apr", value: 780 },
      { month: "May", value: 1450 },
      { month: "Jun", value: 2600 },
      { month: "Jul", value: 4000 },
    ],
  },
  learningProgressOverview: [
    { month: "Jan", value: 3200, label: "3.2K" },
    { month: "Feb", value: 2400, label: "2.4K" },
    { month: "Mar", value: 3000, label: "3.0K" },
    { month: "Apr", value: 3800, label: "3.8K", isHighlight: true },
    { month: "May", value: 2700, label: "2.7K" },
    { month: "Jun", value: 3500, label: "3.5K" },
    { month: "Jul", value: 4100, label: "4.1K" },
  ],
  coursePerformance: {
    overallRate: 78,
    categories: [
      { name: "UI Design", rate: 82 },
      { name: "React Development", rate: 75 },
      { name: "JavaScript", rate: 82 },
      { name: "UX Research", rate: 63 },
    ],
  },
  activityByDay: {
    hours: ["12 PM", "6 PM", "3 PM"],
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    // matrix intensity: 0 (subtle), 1 (medium), 2 (high)
    matrix: [
      [2, 0, 0, 0, 0, 0, 0], // 12 PM: Mon active
      [0, 1, 1, 0, 0, 1, 0], // 6 PM: Tue, Wed, Sat active
      [0, 0, 0, 1, 0, 0, 1], // 3 PM: Thu, Sun active
    ],
  },
};
