// SUTRA Data Layer - Types and Initial Synthetic Fixtures (PRD v1.0 Compliance)

export type PersonaRole = 
  | 'FACULTY' 
  | 'MENTOR' 
  | 'HOD' 
  | 'COUNSELLOR' 
  | 'FINANCE' 
  | 'LEADERSHIP';

export interface Persona {
  id: PersonaRole;
  name: string;
  title: string;
  department: string;
  avatar: string;
  badge: string;
  permittedViews: string[]; // e.g. ['dashboard', 'signals', 'cases', 'students']
  canViewFee: boolean;
  canViewCounselling: boolean;
  canReassignCases: boolean;
  canViewIndividualStudents: boolean;
}

export const PERSONAS: Record<PersonaRole, Persona> = {
  MENTOR: {
    id: 'MENTOR',
    name: 'Prof. Ananya Sharma',
    title: 'Faculty Mentor & Assistant Professor',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: 'Viewing as Prof. Sharma (Mentor & Faculty)',
    permittedViews: ['dashboard', 'signals', 'cases', 'students'],
    canViewFee: false,
    canViewCounselling: false,
    canReassignCases: false,
    canViewIndividualStudents: true,
  },
  FACULTY: {
    id: 'FACULTY',
    name: 'Prof. Arvind Verma',
    title: 'Course Instructor (Data Structures)',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badge: 'Viewing as Prof. Verma (Course Instructor)',
    permittedViews: ['dashboard', 'signals', 'cases', 'students'],
    canViewFee: false,
    canViewCounselling: false,
    canReassignCases: false,
    canViewIndividualStudents: true,
  },
  HOD: {
    id: 'HOD',
    name: 'Dr. Rajeshwar Rao',
    title: 'Head of Department & Professor',
    department: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badge: 'Viewing as Dr. Rao (Head of Department)',
    permittedViews: ['dashboard', 'signals', 'cases', 'analytics', 'admin'],
    canViewFee: false,
    canViewCounselling: false,
    canReassignCases: true,
    canViewIndividualStudents: true,
  },
  COUNSELLOR: {
    id: 'COUNSELLOR',
    name: 'Dr. Meera Nambiar',
    title: 'Senior Student Counsellor',
    department: 'Student Well-being & Guidance Cell',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    badge: 'Viewing as Dr. Nambiar (Confidential Counsellor)',
    permittedViews: ['dashboard', 'signals', 'cases', 'students'],
    canViewFee: false,
    canViewCounselling: true,
    canReassignCases: false,
    canViewIndividualStudents: true,
  },
  FINANCE: {
    id: 'FINANCE',
    name: 'Mr. Vikram Malhotra',
    title: 'Student Financial Aid Officer',
    department: 'Bursar & Student Financial Welfare',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    badge: 'Viewing as Mr. Malhotra (Finance & Welfare)',
    permittedViews: ['dashboard', 'cases', 'students'],
    canViewFee: true,
    canViewCounselling: false,
    canReassignCases: false,
    canViewIndividualStudents: true,
  },
  LEADERSHIP: {
    id: 'LEADERSHIP',
    name: 'Prof. S. K. Kulkarni',
    title: 'Dean of Academic Affairs',
    department: 'Institutional Leadership & Governance',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    badge: 'Viewing as Dean Kulkarni (Institutional Leadership)',
    permittedViews: ['dashboard', 'analytics', 'admin'],
    canViewFee: false,
    canViewCounselling: false,
    canReassignCases: true,
    canViewIndividualStudents: false, // Individual profiling suppressed
  },
};

export type SignalPriority = 'PRIORITY_REVIEW' | 'NEEDS_REVIEW' | 'MONITOR';
export type SignalFamily = 'Attendance' | 'Academic' | 'Submissions' | 'Multi-Factor' | 'Fees' | 'Skills';

export interface Signal {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  semester: string;
  mentorName: string;
  priority: SignalPriority;
  family: SignalFamily;
  ruleId: string;
  dataQuality: string;
  dataQualityState: 'complete' | 'flagged' | 'partial';
  explanation: string;
  createdAt: string;
  slaHoursRemaining: number;
  isOverdue?: boolean;
  status: 'PENDING_TRIAGE' | 'CONVERTED_TO_CASE' | 'SNOOZED' | 'DISMISSED';
  
  // Section A: Sparklines & Data
  evidenceData: {
    attendanceTrend: { week: string; value: number; threshold: number }[];
    assessments: { name: string; score: number; maxScore: number; date: string }[];
    lmsSync: { status: string; lastSync: string; daysTracked: number };
  };
  
  // Section B & C: Recommendations
  matchedInterventions: {
    id: string;
    title: string;
    role: string;
    slaDays: number;
    isRecommended: boolean;
    rationale: string;
  }[];
}

export interface CaseTimelineEvent {
  id: string;
  timestamp: string;
  author: string;
  authorRole: string;
  type: 'SIGNAL_CREATED' | 'ASSIGNED' | 'CHECKIN_LOGGED' | 'REMEDIAL_SCHEDULED' | 'ESCALATED' | 'RESOLVED';
  note: string;
}

export interface SupportCase {
  id: string;
  signalId: string;
  studentId: string;
  studentName: string;
  program: string;
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'ESCALATED' | 'AWAITING_REVIEW' | 'RESOLVED';
  assignedOwner: string;
  ownerRole: string;
  ownerAvatar: string;
  interventionType: string;
  dueDate: string;
  createdAt: string;
  isOverdue: boolean;
  overdueDays?: number;
  escalationNote?: string;
  timeline: CaseTimelineEvent[];
  outcomeNote?: string;
  outcomeStatus?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  program: string;
  department: string;
  batch: string;
  mentor: string;
  consentVerified: boolean;
  lastActive: string;
  avatar: string;
  
  // 6 Data streams
  attendance: {
    overallRate: number;
    lecturesRate: number;
    labsRate: number;
    fourWeekTrend: { week: string; rate: number }[];
    recentAbsences: { date: string; session: string; reason: string }[];
  };
  academics: {
    cgpa: number;
    currentSemesterAvg: number;
    punctualityRate: number;
    assessments: { course: string; test: string; score: number; classAvg: number }[];
  };
  lms: {
    quizCompletionRate: number;
    discussionPostsCount: number;
    turnInPunctuality: number;
    lastLmsActive: string;
    status: 'HEALTHY' | 'SYNC_FLAGGED' | 'INSUFFICIENT';
  };
  feeStatus: {
    // Role-gated
    hasArrears: boolean;
    balanceDue: number;
    dueDate: string;
    scholarshipEligible: boolean;
    scholarshipName?: string;
    installmentPlanActive: boolean;
  };
  skills: {
    verifiedBadges: string[];
    placementReadinessScore: number;
    mockTestParticipation: string;
    codingProfileSolved: number;
  };
  facultyNotes: {
    date: string;
    faculty: string;
    course: string;
    category: string;
    observation: string;
  }[];
}

// ---------------- INITIAL DATA SEED ----------------

export const INITIAL_SIGNALS: Signal[] = [
  {
    id: 'SIG-1042',
    studentId: 'STU-1042',
    studentName: 'Aarav Mehta',
    program: 'B.Tech CS',
    semester: '3rd Semester',
    mentorName: 'Prof. Ananya Sharma',
    priority: 'PRIORITY_REVIEW',
    family: 'Multi-Factor',
    ruleId: 'RULE-MULTI-02 v1.4',
    dataQuality: 'Complete Window (28/28 Days)',
    dataQualityState: 'complete',
    explanation: 'Attendance dropped by 24% over 4 weeks AND last 2 quiz scores down by 13%. Dual-factor indicator warrants structured check-in.',
    createdAt: '2026-10-11T10:15:00Z',
    slaHoursRemaining: 36,
    status: 'PENDING_TRIAGE',
    evidenceData: {
      attendanceTrend: [
        { week: 'W1', value: 88, threshold: 75 },
        { week: 'W2', value: 84, threshold: 75 },
        { week: 'W3', value: 70, threshold: 75 },
        { week: 'W4', value: 62, threshold: 75 },
      ],
      assessments: [
        { name: 'Midterm Assessment', score: 71, maxScore: 100, date: 'Sep 24' },
        { name: 'Quiz 3 (Data Structures)', score: 58, maxScore: 100, date: 'Oct 08' },
      ],
      lmsSync: {
        status: 'Canvas LMS Active',
        lastSync: 'Today, 08:30 AM',
        daysTracked: 28,
      },
    },
    matchedInterventions: [
      {
        id: 'INT-01',
        title: 'Mentor Check-in & Course Review',
        role: 'Assigned Mentor (Prof. Sharma)',
        slaDays: 3,
        isRecommended: true,
        rationale: 'Matched because: Dual-factor drop in attendance + consecutive assessment drop.',
      },
      {
        id: 'INT-02',
        title: 'Academic Remedial Tutoring Referral',
        role: 'Course Faculty (Prof. Verma)',
        slaDays: 7,
        isRecommended: false,
        rationale: 'Matched because: Data Structures quiz drop below course mean.',
      },
    ],
  },
  {
    id: 'SIG-1088',
    studentId: 'STU-1088',
    studentName: 'Priya Nair',
    program: 'B.Tech CS',
    semester: '3rd Semester',
    mentorName: 'Prof. Ananya Sharma',
    priority: 'MONITOR',
    family: 'Academic',
    ruleId: 'RULE-ATT-04 v1.2',
    dataQuality: 'Missing LMS Sync (Flagged)',
    dataQualityState: 'flagged',
    explanation: 'LMS Assessment sync interrupted for 14 days. Insufficient baseline data to evaluate academic signal.',
    createdAt: '2026-10-10T14:20:00Z',
    slaHoursRemaining: 72,
    status: 'PENDING_TRIAGE',
    evidenceData: {
      attendanceTrend: [
        { week: 'W1', value: 82, threshold: 75 },
        { week: 'W2', value: 80, threshold: 75 },
        { week: 'W3', value: 81, threshold: 75 },
        { week: 'W4', value: 83, threshold: 75 },
      ],
      assessments: [],
      lmsSync: {
        status: 'Sync Interrupted',
        lastSync: '14 days ago',
        daysTracked: 14,
      },
    },
    matchedInterventions: [
      {
        id: 'INT-DATA-01',
        title: 'Request Data Pipeline Re-Sync',
        role: 'System Administrator',
        slaDays: 2,
        isRecommended: true,
        rationale: 'Missing LMS feed; baseline verification required before human triage.',
      },
    ],
  },
  {
    id: 'SIG-1095',
    studentId: 'STU-1095',
    studentName: 'Rohan Deshmukh',
    program: 'B.Tech CS',
    semester: '3rd Semester',
    mentorName: 'Prof. Ananya Sharma',
    priority: 'NEEDS_REVIEW',
    family: 'Fees',
    ruleId: 'RULE-FIN-01 v1.0',
    dataQuality: 'Complete Window (28/28 Days)',
    dataQualityState: 'complete',
    explanation: 'Pending tuition installment balance overdue by 21 days; academic performance steady.',
    createdAt: '2026-10-09T09:00:00Z',
    slaHoursRemaining: 48,
    status: 'PENDING_TRIAGE',
    evidenceData: {
      attendanceTrend: [
        { week: 'W1', value: 92, threshold: 75 },
        { week: 'W2', value: 90, threshold: 75 },
        { week: 'W3', value: 89, threshold: 75 },
        { week: 'W4', value: 91, threshold: 75 },
      ],
      assessments: [
        { name: 'Midterm Assessment', score: 84, maxScore: 100, date: 'Sep 24' },
      ],
      lmsSync: {
        status: 'Canvas LMS Active',
        lastSync: 'Today, 09:15 AM',
        daysTracked: 28,
      },
    },
    matchedInterventions: [
      {
        id: 'INT-FIN-01',
        title: 'Confidential Welfare Aid & Installment Consultation',
        role: 'Student Financial Aid Officer',
        slaDays: 5,
        isRecommended: true,
        rationale: 'Tuition installment due date passed; welfare assistance scheme check recommended.',
      },
    ],
  },
  {
    id: 'SIG-1014',
    studentId: 'STU-1014',
    studentName: 'Devika Pillai',
    program: 'B.Tech CS',
    semester: '5th Semester',
    mentorName: 'Prof. Arvind Verma',
    priority: 'PRIORITY_REVIEW',
    family: 'Attendance',
    ruleId: 'RULE-ATT-01 v2.0',
    dataQuality: 'Complete Window (28/28 Days)',
    dataQualityState: 'complete',
    explanation: 'Consecutive absence across 8 morning lab sessions. Exceeds critical threshold.',
    createdAt: '2026-10-06T11:00:00Z',
    slaHoursRemaining: -72,
    isOverdue: true,
    status: 'CONVERTED_TO_CASE',
    evidenceData: {
      attendanceTrend: [
        { week: 'W1', value: 78, threshold: 75 },
        { week: 'W2', value: 65, threshold: 75 },
        { week: 'W3', value: 52, threshold: 75 },
        { week: 'W4', value: 48, threshold: 75 },
      ],
      assessments: [
        { name: 'Lab Practical 2', score: 42, maxScore: 100, date: 'Oct 02' },
      ],
      lmsSync: {
        status: 'Canvas LMS Active',
        lastSync: 'Yesterday',
        daysTracked: 28,
      },
    },
    matchedInterventions: [
      {
        id: 'INT-ATT-01',
        title: 'Department Chair & Mentor Review',
        role: 'Head of Department (Dr. Rao)',
        slaDays: 2,
        isRecommended: true,
        rationale: 'Overdue SLA escalated to Department Leadership.',
      },
    ],
  },
  {
    id: 'SIG-1055',
    studentId: 'STU-1055',
    studentName: 'Kavya Iyer',
    program: 'B.Tech CS',
    semester: '3rd Semester',
    mentorName: 'Prof. Ananya Sharma',
    priority: 'NEEDS_REVIEW',
    family: 'Submissions',
    ruleId: 'RULE-SUB-03 v1.1',
    dataQuality: 'Complete Window (28/28 Days)',
    dataQualityState: 'complete',
    explanation: 'Missed 2 consecutive lab assignment deadlines; lecture attendance remains 89%.',
    createdAt: '2026-10-10T16:45:00Z',
    slaHoursRemaining: 54,
    status: 'PENDING_TRIAGE',
    evidenceData: {
      attendanceTrend: [
        { week: 'W1', value: 90, threshold: 75 },
        { week: 'W2', value: 89, threshold: 75 },
        { week: 'W3', value: 88, threshold: 75 },
        { week: 'W4', value: 89, threshold: 75 },
      ],
      assessments: [
        { name: 'Lab 3 (Algorithms)', score: 0, maxScore: 100, date: 'Oct 04' },
      ],
      lmsSync: {
        status: 'Canvas LMS Active',
        lastSync: 'Today, 07:00 AM',
        daysTracked: 28,
      },
    },
    matchedInterventions: [
      {
        id: 'INT-SUB-01',
        title: 'Lab Assistance & Technical Help Session',
        role: 'Lab Teaching Assistant & Faculty',
        slaDays: 4,
        isRecommended: true,
        rationale: 'Submission roadblock isolated to programming lab.',
      },
    ],
  },
];

export const INITIAL_CASES: SupportCase[] = [
  {
    id: 'CASE-2026-089',
    signalId: 'SIG-1042',
    studentId: 'STU-1042',
    studentName: 'Aarav Mehta',
    program: 'B.Tech CS (3rd Sem)',
    status: 'IN_PROGRESS',
    assignedOwner: 'Prof. Ananya Sharma',
    ownerRole: 'Faculty Mentor',
    ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    interventionType: 'Mentor Check-in & Course Review',
    dueDate: '2026-10-16',
    createdAt: '2026-10-11T14:30:00Z',
    isOverdue: false,
    timeline: [
      {
        id: 'EVT-1',
        timestamp: 'Oct 11, 10:15 AM',
        author: 'SUTRA Engine',
        authorRole: 'System Evaluation',
        type: 'SIGNAL_CREATED',
        note: 'Support signal generated by RULE-MULTI-02 v1.4: Dual drop in attendance (86% -> 62%) and assessment score (-13 pts).',
      },
      {
        id: 'EVT-2',
        timestamp: 'Oct 11, 02:30 PM',
        author: 'Dr. Rajeshwar Rao',
        authorRole: 'Head of Department',
        type: 'ASSIGNED',
        note: 'Triage reviewed; assigned to Mentor Prof. Ananya Sharma with 5-day resolution SLA.',
      },
      {
        id: 'EVT-3',
        timestamp: 'Oct 13, 11:00 AM',
        author: 'Prof. Ananya Sharma',
        authorRole: 'Faculty Mentor',
        type: 'CHECKIN_LOGGED',
        note: 'Met student in office. Student reported commuting difficulties due to road construction, leading to missed 8:30 AM lab sessions. Arranged review with lab instructor.',
      },
    ],
  },
  {
    id: 'CASE-2026-064',
    signalId: 'SIG-1014',
    studentId: 'STU-1014',
    studentName: 'Devika Pillai',
    program: 'B.Tech CS (5th Sem)',
    status: 'ESCALATED',
    assignedOwner: 'Dr. Rajeshwar Rao',
    ownerRole: 'Head of Department',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    interventionType: 'Attendance Policy Review & Parental Coordination',
    dueDate: '2026-10-09',
    createdAt: '2026-10-04T09:00:00Z',
    isOverdue: true,
    overdueDays: 3,
    escalationNote: 'Overdue by 3 days. Automatically escalated to HOD Dr. Rajeshwar Rao on Oct 14 pursuant to Institute SLA Policy.',
    timeline: [
      {
        id: 'EVT-10',
        timestamp: 'Oct 04, 09:00 AM',
        author: 'SUTRA Engine',
        authorRole: 'System',
        type: 'SIGNAL_CREATED',
        note: 'Signal triggered: Attendance dropped to 48% in Practical Labs.',
      },
      {
        id: 'EVT-11',
        timestamp: 'Oct 04, 11:30 AM',
        author: 'Prof. Arvind Verma',
        authorRole: 'Course Faculty',
        type: 'ASSIGNED',
        note: 'Case initiated. Check-in due by Oct 09.',
      },
      {
        id: 'EVT-12',
        timestamp: 'Oct 10, 00:01 AM',
        author: 'SUTRA SLA Daemon',
        authorRole: 'Automated Governance',
        type: 'ESCALATED',
        note: 'SLA breach: 72 hours passed without logged follow-up. Escalated to Department Coordinator Dr. Rao.',
      },
    ],
  },
  {
    id: 'CASE-2026-051',
    signalId: 'SIG-1020',
    studentId: 'STU-1020',
    studentName: 'Karan Joshi',
    program: 'B.Tech CS (3rd Sem)',
    status: 'RESOLVED',
    assignedOwner: 'Prof. Ananya Sharma',
    ownerRole: 'Faculty Mentor',
    ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    interventionType: 'Peer Study Group Placement',
    dueDate: '2026-10-05',
    createdAt: '2026-09-28T10:00:00Z',
    isOverdue: false,
    outcomeStatus: 'Positive Improvement Observed',
    outcomeNote: 'Student attended 4 peer sessions. Attendance stabilized at 88% and Quiz 4 score improved to 76/100.',
    timeline: [
      {
        id: 'EVT-20',
        timestamp: 'Sep 28, 10:00 AM',
        author: 'SUTRA Engine',
        authorRole: 'System',
        type: 'SIGNAL_CREATED',
        note: 'Signal: Quiz 1 and Quiz 2 scores under 45%.',
      },
      {
        id: 'EVT-21',
        timestamp: 'Oct 01, 03:00 PM',
        author: 'Prof. Ananya Sharma',
        authorRole: 'Faculty Mentor',
        type: 'CHECKIN_LOGGED',
        note: 'Paired student with Student Academic Society study cohort.',
      },
      {
        id: 'EVT-22',
        timestamp: 'Oct 08, 04:30 PM',
        author: 'Prof. Ananya Sharma',
        authorRole: 'Faculty Mentor',
        type: 'RESOLVED',
        note: 'Outcome verified: Quiz 4 score reached 76%. Closing case with positive resolution.',
      },
    ],
  },
];

export const INITIAL_STUDENTS: Record<string, StudentProfile> = {
  'STU-1042': {
    id: 'STU-1042',
    name: 'Aarav Mehta',
    program: 'B.Tech in Computer Science & Engineering',
    department: 'Department of Computer Science',
    batch: 'Class of 2028 (Year 2, Sem 3)',
    mentor: 'Prof. Ananya Sharma',
    consentVerified: true,
    lastActive: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    attendance: {
      overallRate: 62,
      lecturesRate: 68,
      labsRate: 54,
      fourWeekTrend: [
        { week: 'W1', rate: 88 },
        { week: 'W2', rate: 84 },
        { week: 'W3', rate: 70 },
        { week: 'W4', rate: 62 },
      ],
      recentAbsences: [
        { date: 'Oct 10, 08:30 AM', session: 'CS201 Data Structures Lab', reason: 'Unexcused / Missed Morning Transit' },
        { date: 'Oct 08, 08:30 AM', session: 'CS201 Data Structures Lab', reason: 'Unexcused' },
        { date: 'Oct 03, 10:30 AM', session: 'MA201 Discrete Mathematics', reason: 'Excused (Medical Slip submitted)' },
      ],
    },
    academics: {
      cgpa: 7.42,
      currentSemesterAvg: 64.5,
      punctualityRate: 78,
      assessments: [
        { course: 'CS201 Data Structures', test: 'Midterm', score: 71, classAvg: 74 },
        { course: 'CS201 Data Structures', test: 'Quiz 3', score: 58, classAvg: 72 },
        { course: 'CS202 Computer Organization', test: 'Midterm', score: 68, classAvg: 69 },
        { course: 'MA201 Discrete Mathematics', test: 'Quiz 2', score: 61, classAvg: 66 },
      ],
    },
    lms: {
      quizCompletionRate: 75,
      discussionPostsCount: 4,
      turnInPunctuality: 80,
      lastLmsActive: 'Today, 08:14 AM',
      status: 'HEALTHY',
    },
    feeStatus: {
      hasArrears: false,
      balanceDue: 0,
      dueDate: 'N/A (Cleared)',
      scholarshipEligible: true,
      scholarshipName: 'Merit-Cum-Means Tuition Grant (Tier 2)',
      installmentPlanActive: false,
    },
    skills: {
      verifiedBadges: ['C++ Fundamentals', 'Git/GitHub Essentials', 'Linux Terminal'],
      placementReadinessScore: 68,
      mockTestParticipation: 'Completed 2 of 3 Mock Quizzes',
      codingProfileSolved: 84,
    },
    facultyNotes: [
      {
        date: 'Oct 11, 2026',
        faculty: 'Prof. Arvind Verma',
        course: 'CS201 Data Structures',
        category: 'Participation',
        observation: 'Student is attentive during algorithmic explanations but struggled in Lab 3 recursion exercises.',
      },
      {
        date: 'Sep 26, 2026',
        faculty: 'Dr. P. Sen',
        course: 'MA201 Discrete Math',
        category: 'Academic Progress',
        observation: 'Good grasp of set theory proofs; missed one homework sheet.',
      },
    ],
  },
  'STU-1088': {
    id: 'STU-1088',
    name: 'Priya Nair',
    program: 'B.Tech in Computer Science & Engineering',
    department: 'Department of Computer Science',
    batch: 'Class of 2028 (Year 2, Sem 3)',
    mentor: 'Prof. Ananya Sharma',
    consentVerified: true,
    lastActive: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    attendance: {
      overallRate: 83,
      lecturesRate: 85,
      labsRate: 80,
      fourWeekTrend: [
        { week: 'W1', rate: 82 },
        { week: 'W2', rate: 80 },
        { week: 'W3', rate: 81 },
        { week: 'W4', rate: 83 },
      ],
      recentAbsences: [],
    },
    academics: {
      cgpa: 8.1,
      currentSemesterAvg: 78.0,
      punctualityRate: 92,
      assessments: [],
    },
    lms: {
      quizCompletionRate: 0,
      discussionPostsCount: 0,
      turnInPunctuality: 0,
      lastLmsActive: '14 days ago',
      status: 'INSUFFICIENT',
    },
    feeStatus: {
      hasArrears: false,
      balanceDue: 0,
      dueDate: 'Cleared',
      scholarshipEligible: false,
      installmentPlanActive: false,
    },
    skills: {
      verifiedBadges: ['Python Data Science', 'SQL Foundations'],
      placementReadinessScore: 74,
      mockTestParticipation: 'Not recorded in current window',
      codingProfileSolved: 110,
    },
    facultyNotes: [],
  },
  'STU-1095': {
    id: 'STU-1095',
    name: 'Rohan Deshmukh',
    program: 'B.Tech in Computer Science & Engineering',
    department: 'Department of Computer Science',
    batch: 'Class of 2028 (Year 2, Sem 3)',
    mentor: 'Prof. Ananya Sharma',
    consentVerified: true,
    lastActive: 'Today, 10:15 AM',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    attendance: {
      overallRate: 91,
      lecturesRate: 92,
      labsRate: 90,
      fourWeekTrend: [
        { week: 'W1', rate: 92 },
        { week: 'W2', rate: 90 },
        { week: 'W3', rate: 89 },
        { week: 'W4', rate: 91 },
      ],
      recentAbsences: [],
    },
    academics: {
      cgpa: 8.45,
      currentSemesterAvg: 82.0,
      punctualityRate: 95,
      assessments: [
        { course: 'CS201 Data Structures', test: 'Midterm', score: 84, classAvg: 74 },
      ],
    },
    lms: {
      quizCompletionRate: 94,
      discussionPostsCount: 8,
      turnInPunctuality: 96,
      lastLmsActive: 'Today, 09:15 AM',
      status: 'HEALTHY',
    },
    feeStatus: {
      hasArrears: true,
      balanceDue: 42500, // INR 42,500 overdue
      dueDate: 'Sep 21, 2026 (Overdue by 21 days)',
      scholarshipEligible: true,
      scholarshipName: 'Emergency Student Welfare Bursary (Eligible)',
      installmentPlanActive: true,
    },
    skills: {
      verifiedBadges: ['Full-Stack Web', 'Docker Containers', 'Java OCA'],
      placementReadinessScore: 82,
      mockTestParticipation: 'Completed 3 of 3',
      codingProfileSolved: 142,
    },
    facultyNotes: [
      {
        date: 'Oct 02, 2026',
        faculty: 'Prof. Arvind Verma',
        course: 'CS201 Data Structures',
        category: 'Excellence',
        observation: 'High performer in assignment coding benchmarks.',
      },
    ],
  },
  'STU-1014': {
    id: 'STU-1014',
    name: 'Devika Pillai',
    program: 'B.Tech in Computer Science & Engineering',
    department: 'Department of Computer Science',
    batch: 'Class of 2027 (Year 3, Sem 5)',
    mentor: 'Prof. Arvind Verma',
    consentVerified: true,
    lastActive: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    attendance: {
      overallRate: 48,
      lecturesRate: 52,
      labsRate: 42,
      fourWeekTrend: [
        { week: 'W1', rate: 78 },
        { week: 'W2', rate: 65 },
        { week: 'W3', rate: 52 },
        { week: 'W4', rate: 48 },
      ],
      recentAbsences: [
        { date: 'Oct 11, 08:30 AM', session: 'CS301 OS Lab', reason: 'Unexcused' },
        { date: 'Oct 09, 08:30 AM', session: 'CS301 OS Lab', reason: 'Unexcused' },
        { date: 'Oct 07, 10:30 AM', session: 'CS302 Networks', reason: 'Unexcused' },
      ],
    },
    academics: {
      cgpa: 6.8,
      currentSemesterAvg: 51.0,
      punctualityRate: 50,
      assessments: [
        { course: 'CS301 Operating Systems', test: 'Lab Practical', score: 42, classAvg: 70 },
      ],
    },
    lms: {
      quizCompletionRate: 40,
      discussionPostsCount: 1,
      turnInPunctuality: 45,
      lastLmsActive: '5 days ago',
      status: 'HEALTHY',
    },
    feeStatus: {
      hasArrears: false,
      balanceDue: 0,
      dueDate: 'Cleared',
      scholarshipEligible: false,
      installmentPlanActive: false,
    },
    skills: {
      verifiedBadges: ['C Programming'],
      placementReadinessScore: 50,
      mockTestParticipation: 'Missed October Mock',
      codingProfileSolved: 32,
    },
    facultyNotes: [
      {
        date: 'Oct 05, 2026',
        faculty: 'Prof. Arvind Verma',
        course: 'CS301 Operating Systems',
        category: 'Attendance Concern',
        observation: 'Student has not logged into remote VM environment for 10 days.',
      },
    ],
  },
};

// Rules Registry for /admin inspection
export const RULES_REGISTRY = [
  {
    id: 'RULE-MULTI-02',
    name: 'Compound Attendance & Assessment Divergence',
    version: 'v1.4',
    category: 'Multi-Factor',
    parameters: 'Attendance drop >= 15% AND assessment score drop >= 10 pts within 4-week moving window',
    defaultSlaHours: 48,
    actionTemplate: 'Mentor Check-in + Remedial Tutoring Candidate',
    status: 'ACTIVE',
  },
  {
    id: 'RULE-ATT-01',
    name: 'Critical Laboratory Session Absence',
    version: 'v2.0',
    category: 'Attendance',
    parameters: 'Consecutive absence in >= 3 practical laboratory sessions or aggregate attendance < 60%',
    defaultSlaHours: 24,
    actionTemplate: 'Direct Mentor Outreach & Chair Alert',
    status: 'ACTIVE',
  },
  {
    id: 'RULE-ATT-04',
    name: 'Baseline Data Completeness Gate',
    version: 'v1.2',
    category: 'Data Governance',
    parameters: 'Require minimum 21 days LMS sync & 14 attendance records before computing signal score',
    defaultSlaHours: 72,
    actionTemplate: 'Data Source Re-Sync Request',
    status: 'ACTIVE',
  },
  {
    id: 'RULE-SUB-03',
    name: 'Consecutive Assignment Deadlines Missed',
    version: 'v1.1',
    category: 'Submissions',
    parameters: '2 unexcused missed assignment deadlines where student was marked present in class',
    defaultSlaHours: 72,
    actionTemplate: 'Teaching Assistant Technical Check-in',
    status: 'ACTIVE',
  },
  {
    id: 'RULE-FIN-01',
    name: 'Gentle Tuition Balance Installment Notice',
    version: 'v1.0',
    category: 'Financial Aid',
    parameters: 'Installment unpaid past 14-day grace window without existing student welfare scholarship',
    defaultSlaHours: 120,
    actionTemplate: 'Confidential Welfare Aid Consultation (Restricted to Finance Staff)',
    status: 'ACTIVE',
  },
];
