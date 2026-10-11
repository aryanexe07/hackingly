# SUTRA — Student Support Orchestration Platform
## Frontend & UI/UX Product Requirements Document (PRD)

> **Tagline:** *No Alert Without Action.*  
> **Target Framework:** Next.js (App Router), Tailwind CSS, shadcn/ui, Lucide Icons, Recharts  
> **Role Scope:** UI/UX Design System, Component Architecture & Screen Workflows  
> **Document Version:** v1.0 (UI/UX Blueprint)

---

## 1. Executive Summary & Design Philosophy

### 1.1 The Core UX Problem
Most EdTech and institutional analytics tools fail at the last mile: they are **passive dashboards** full of red charts and opaque "risk scores" that cause alert fatigue. When an alert fires, no one knows *who* owns it, *why* it triggered, *what* action is pedagogically or ethically sound, or *when* follow-up is due.

### 1.2 The SUTRA UX Mandate
**SUTRA is an intervention orchestration engine, not a dropout predictor or attendance dashboard.**
The primary unit of user experience is not a metric or chart, but an **accountable, evidence-backed Support Case**.

```
[Authorized Data Observation] 
       ↓ 
[Explainable Signal with Provenance] 
       ↓ 
[Human Review & Triage] 
       ↓ 
[Policy-Governed Intervention Match] 
       ↓ 
[Owned Case + Strict SLA / Due Date] 
       ↓ 
[Auditable Follow-Up & Escalation] 
       ↓ 
[Recorded Outcome & Cohort Insights]
```

### 1.3 Core UI/UX Tenets
1. **Evidence Before Label:** Never show a vague "At-Risk 78%" score. Always surface the tangible facts: e.g., *"Attendance dropped from 86% to 62% over 4 weeks; 2 consecutive assessments down by 13 pts."*
2. **Action Over Alert:** An alert card must immediately present an action path (Review, Snooze, Convert to Case with assigned Owner & Due Date).
3. **No Stigmatizing or Diagnostic UI:** Zero psychological diagnoses, zero automated disciplinary labels, zero automated punitive notifications. Signals are titled *"Support Indicators"* or *"Check-in Triggers"*.
4. **Data Honesty & "Insufficient Data" as a First-Class State:** If LMS or attendance data is missing or out-of-window, the UI renders clear grey/neutral *“Insufficient baseline data”* banners rather than assuming failure or generating false alarms.
5. **Purpose-Aware & Role-Gated Surfaces:** UI components dynamically redact or hide sensitive data (e.g., fee arrears are visible exclusively to Finance staff; counselling notes are sealed behind Counsellor keys).

---

## 2. User Personas & Role-Specific UX Modes

The UI adapts navigation, visible widgets, and action capabilities based on the active persona switcher in the app shell:

| Persona | Primary Needs & Mental Model | Core UI Views | Sensitive Data Guardrails |
|---|---|---|---|
| **Faculty / Instructor** | Wants to know which students in their courses are falling behind in coursework or attendance; wants quick referral workflows. | Course Roster, Academic & Attendance Signals, Remedial Action logger. | Cannot view fee status, confidential counselling notes, or unrelated students. |
| **Faculty Mentor** | Responsible for holistic well-being and mentoring of 20–30 assigned mentees; needs early trend awareness and check-in logs. | Mentee 360° overview, Check-in scheduler, Active Mentorship Cases, Follow-up logger. | Cannot view detailed billing breakdowns or clinical counselling records. |
| **HOD / Department Coordinator** | High-level triage, department case distribution, bottleneck monitoring, escalation approvals. | Department Queue, Escalation Inbox, Triage Board, SLA tracker. | Sees aggregated department metrics; can reassign cases across faculty. |
| **Student Counsellor** | Private, sensitive, human-first support referrals; strictly confidential case tracking. | Confidential Referrals Inbox, Private Session Logs, Safeguarded Outcomes. | Counselling notes are completely isolated from Faculty and Leadership views. |
| **Finance / Welfare Officer** | Gentle, non-punitive fee assistance, scholarship follow-up, installment coordination. | Fee-Support Queue, Aid Schemes Matcher, Finance Case Details. | Operates in a dedicated, isolated financial support queue; invisible to academic staff. |
| **Institutional Leadership** | Cohort health, intervention throughput, SLA compliance rates, resource allocation. | Cohort Insights, SLA Bottleneck Heatmaps, Outcomes Distribution. | High-level aggregated views only; individual student profiling is suppressed by default. |

---

## 3. Information Architecture (Site Map)

```
/ (Root)
│
├── (auth)/
│   └── login                          # Role selector & campus login for judging demo
│
└── (workspace)/
    ├── dashboard                      # Command Center (KPIs, Urgent Cases, Signals needing triage)
    │
    ├── signals                        # Signal Inbox & Triage Drawer
    │   ├── [signalId] (Drawer/Modal)  # Detailed evidence breakdown & Recommendation Matcher
    │
    ├── cases                          # Active Support Cases Board (Kanban / List Views)
    │   ├── [caseId]                   # Case Detail, Timeline, Follow-up Logger, Escalation Badge
    │
    ├── students                       # Student Directory & Search
    │   └── [studentId]                # Student 360° Profile (6 Data Streams + Audit Provenance)
    │
    ├── analytics                      # Cohort & Outcome Insights (Cohort Trends, SLA, Interventions)
    │
    └── admin                          # Demo Fixture Switcher, Rule Thresholds & Synthetic Reset
```

---

## 4. Detailed Screen Specifications

### 4.1 Screen 1: Command Center (`/dashboard`)
*The daily operational hub for staff members to act immediately without navigating complex sub-menus.*

* **Hero Action Strip:**
  * Greeting + Active Persona Badge (e.g., `Viewing as Prof. Sharma (Mentor & Faculty)`).
  * Quick Stats Counters:
    * **Urgent Signals Needing Triage** (Count + SLA countdown).
    * **My Active Cases Due This Week** (Count + overdue counter).
    * **Escalations Requiring Intervention** (Pulsing amber indicator).
    * **Follow-ups Logged This Month** (Resolution throughput).
* **Two-Column Split Layout:**
  * **Left (60%): "Immediate Attention" Feed:**
    * Filter tabs: `All`, `My Assigned`, `Overdue`, `Needs Triage`.
    * Signal & Case actionable cards showing student pseudonym (`STU-1042`), avatar placeholder, trigger rationale, SLA countdown chip (e.g. `Due in 48h` or `Overdue by 1d`), and direct `[Take Action]` CTA.
  * **Right (40%): Quick Workflow Snapshot & Activity Stream:**
    * SLA health radial progress chart.
    * Recent Timeline Feed: *"Dr. Rao logged follow-up on Case #402"*, *"STU-1042 escalated to HOD (SLA breach)"*.
    * Synthetic Demo Fixture Bar: Quick-load buttons for judging rehearsal (e.g., `Load STU-1042 Scenario`, `Reset Sandbox Data`).

---

### 4.2 Screen 2: Explainable Signals Inbox (`/signals`)
*The triage engine where raw rule-evaluations become human-reviewed intervention proposals.*

* **Header Controls:**
  * Multi-dimensional filter bar: Priority (`Priority Review`, `Needs Review`, `Monitor`), Family (`Attendance`, `Academic`, `Submissions`, `Multi-Factor`, `Fees`, `Skills`), Cohort/Branch, Data Quality state.
* **Signal Cards / Data Grid:**
  * **Priority Badge:** High contrast, accessible semantic chips (Priority Review = Deep Rose/Wine, Needs Review = Warm Amber, Monitor = Slate Blue).
  * **Student Identifier:** Pseudonym code (`STU-1042`), Program (`B.Tech CS 3rd Sem`).
  * **Explainability Preview:** 
    * Plain-English explanation banner: *"Attendance dropped by 24% over 4 weeks AND last 2 quiz scores down by 13%."*
    * **Rule Trigger Pill:** e.g., `RULE-ATT-04 v1.2`.
  * **Data Quality Tag:** e.g., `Complete Window (28/28 Days)` or `Missing LMS Sync (Flagged)`.
  * **Action Cluster:**
    * Primary: `[Review & Match Intervention]` (Opens Evidence Drawer).
    * Secondary: `[Snooze 7d]` / `[Dismiss with Reason]`.

---

### 4.3 Screen 3: The Evidence-to-Action Drawer (`/signals/[id]`)
*The most critical proof-point screen for PS6: connects raw data to human action.*

* **Section A: The Evidence Breakdown:**
  * Visual timeline/sparkline of observed metric vs baseline:
    * Attendance: Week 1 (88%) → Week 2 (84%) → Week 3 (70%) → Week 4 (62%) [Configured Threshold: 75%].
    * Academic: Midterm Assessment (71) → Quiz 3 (58).
  * Data Provenance Box: Source (`ERP Attendance System`, `Canvas LMS`), observation window, last updated timestamp.
* **Section B: Plain-English Rationale:**
  * Deterministic explanation text clearly citing data boundaries and thresholds.
  * Clear disclaimer: *"This signal highlights a deviation in engagement. It does not infer motivation, personal circumstances, or psychological state."*
* **Section C: Policy-Driven Intervention Recommendations:**
  * Cards showing system-matched candidate interventions:
    1. **Mentor Check-in & Course Review** (Recommended • SLA: 5 Days • Role: Assigned Mentor).
    2. **Academic Remedial Tutoring Referral** (Candidate • SLA: 7 Days • Role: Course Faculty).
  * Rationale Chip: *"Matched because: Dual-factor drop in attendance + consecutive assessment drop."*
* **Section D: Case Creation Form:**
  * Select Intervention Type (Pre-selected or custom override with required reason textarea).
  * Assign Owner (Dropdown pre-filtered to authorized faculty/mentors).
  * Due Date Picker (Pre-calculated using policy SLA, with manual override option).
  * Checkbox: `[x] Notify owner in-app`.
  * Primary Button: `[Accept Signal & Launch Case]`.

---

### 4.4 Screen 4: Support Case Workspace & Timeline (`/cases/[id]`)
*The single source of truth for ongoing support accountability.*

* **Case Header Banner:**
  * Case ID (`CASE-2026-089`), Student (`STU-1042`), Current Status (`ASSIGNED`, `IN_PROGRESS`, `ESCALATED`, `AWAITING_REVIEW`, `RESOLVED`).
  * Accountability Metadata: Assigned Owner avatar, Due Date countdown, Created by timestamp, Intervention Type.
  * Escalation Banner (if overdue): High-visibility warning bar: *"Overdue by 3 days. Automatically escalated to HOD Prof. Varma on Oct 14."*
* **Interactive Two-Column Layout:**
  * **Left Column (65%): Append-Only Event Timeline:**
    * Chronological timeline of all logged touchpoints:
      * `Oct 11, 10:15`: Signal generated by `RULE-MULTI-02`.
      * `Oct 11, 14:30`: Accepted by Dr. Gupta; assigned to Mentor Prof. Sharma.
      * `Oct 13, 11:00`: *Action Logged:* "Met student in office. Student reported commuting difficulties and missed morning lab sessions." (Logged by Prof. Sharma).
      * `Oct 13, 11:05`: Next review scheduled for Oct 20.
  * **Right Column (35%): Case Actions & Resolution Panel:**
    * **Log Follow-up Action Form:**
      * Action Type selector: `Check-in Completed`, `Remedial Session Scheduled`, `Parent Meeting Held (Approved)`, `Internal Referral`.
      * Note Entry (Restricted plain text, with reminder: *Do not log sensitive medical or private info here*).
      * Next Step Status: `Keep Ongoing`, `Request Escalation`, `Submit for Outcome Review`.
    * **Close Loop / Outcome Form:**
      * Outcome Status: `Positive Improvement Observed`, `Support Ongoing`, `External Factors Addressed`, `Unresponsive (Escalated)`.
      * Outcome Evidence Note.
      * Final `[Complete & Resolve Case]` CTA.

---

### 4.5 Screen 5: Student 360° Holistic Profile (`/students/[id]`)
*Authorized, consent-aware view of student success across the 6 mandated dimensions.*

* **Student Profile Card:**
  * Pseudonym Code (`STU-1042`), Program/Year, Department, Active Mentorship link, Consent Verification status badge (`Consent Verified - Academic & Support Scope`).
* **The Six Data Stream Tabs/Cards:**
  1. **Attendance Matrix:** 4-week moving average sparkline, session attendance breakdown (Lectures vs Labs), trend delta.
  2. **Academic Progression:** Assessment score distribution, trend chart, submission punctuality.
  3. **LMS & Participation:** Quiz engagement, discussion forum activity, assignment turn-in rate.
  4. **Fee Status (Role-Gated):** 
     * *Faculty view:* Rendered as a secure card: *"Financial details restricted to Finance & Student Welfare officers"*.
     * *Finance view:* Clean statement of dues, scholarship eligibility, installment plan status.
  5. **Skills & Placement Readiness:** Verified skill badges, placement criteria checkmarks, mock test participation.
  6. **Faculty Feedback Notes:** Structured, categorical faculty observations (e.g. "Participates actively in lab", "Missed Lab 3 submission").
* **Audit Trail Footer:** Displays who has viewed this profile and which data categories were accessed, reinforcing privacy standards.

---

### 4.6 Screen 6: Outcomes & Cohort Insights (`/analytics`)
*Honest, aggregate institutional learning without pseudo-scientific causation claims.*

* **Mandatory Caveat Banner:**
  * *"Descriptive Cohort Summary: Trends reflect observed changes among students receiving structured support. They do not represent randomized causal claims."*
* **Filter Strip:** Date Window, Department/Cohort, Intervention Type, Minimum Sample Size threshold.
* **Core Analytics Widgets:**
  * **Workflow Health Metrics:**
    * Average Time from Signal to Case Assignment (e.g., `4.2 hours`).
    * On-Time Follow-up Rate (`89% of cases met SLA`).
    * Escalation Rate (`11% escalated due to due-date breach`).
  * **Intervention Outcome Matrix (Recharts):**
    * Bar chart comparing outcomes across intervention types: `Mentor Check-in` vs `Remedial Tutoring` vs `Fee Counseling`.
    * Shows sample size ($N$) on every single bar (e.g., $N=42$ students).
  * **Cohort Trajectory Trends:**
    * Before vs After attendance & academic trendlines for supported cohorts, annotated with intervention points.

---

### 4.7 Screen 7: Admin, Governance & Demo Sandbox (`/admin`)
*Ensures judges and evaluators can experience the full end-to-end loop in under 5 minutes.*

* **Demo Scenario Selector (One-Click Fixtures):**
  * `[Scenario 1: STU-1042 (The Happy Path)]`: Declining attendance + score drop → fires signal → triage → mentor check-in → outcome logged.
  * `[Scenario 2: STU-1088 (Data Quality / Insufficient Baseline)]`: Demonstrates system refusing to hallucinate risk when data is incomplete.
  * `[Scenario 3: STU-1095 (Privacy / Fee Gating)]`: Demonstrates role-based field redaction between Faculty and Finance Officer.
  * `[Scenario 4: STU-1014 (Overdue & Escalation)]`: Backdated case demonstrating instant overdue badge & escalation transition.
* **Reset Database to Pristine Seed:** Instant idempotent reload button with confirmation modal.
* **Rules & Thresholds Registry View:** Inspectable table of active rules, thresholds (e.g., 75% attendance, 10% delta), and version tags.

---

## 5. Canonical Demo Walkthrough Storyboard (Rehearsal Journey)

To wow judges in 4–5 minutes, the UI must navigate seamlessly through this exact loop:

```
[Judge asks to see proof]
       ↓
1. Opens /dashboard → Shows immediate priority signals
       ↓
2. Clicks STU-1042 → Evidence Drawer expands (86%→62% attendance drop, -13pt quiz drop)
       ↓
3. Policy Recommendation card matches: "Mentor Check-in + Academic Review"
       ↓
4. One click assigns to Prof. Sharma with 3-day SLA → Case #CASE-1042 created
       ↓
5. Switches to "My Cases" → Opens CASE-1042
       ↓
6. Logs follow-up note: "Met student in office; confirmed commute issue; academic review arranged"
       ↓
7. Submits Outcome Review → Case marks RESOLVED → Cohort Analytics counter updates!
```

---

## 6. UI Design Tokens & Component System

### 6.1 Color Palette (Modern, Trustworthy & Accessible)
Built for a polished, high-contrast light/dark enterprise aesthetic:

* **Primary / Brand:**
  * `Deep Slate / Navy`: `hsl(222, 47%, 11%)` (Dark mode surface / primary text)
  * `Electric Violet Accent`: `hsl(250, 84%, 54%)` (Interactive brand accents, active tabs)
  * `Canvas Background`: `hsl(210, 40%, 98%)` (Crisp, clean neutral workspace)
* **Semantic Priority Colors (Double-coded with text labels and icons):**
  * **Priority Review (Urgent):** Rich Crimson `hsl(350, 89%, 60%)`
  * **Needs Review (Moderate):** Warm Amber `hsl(38, 92%, 50%)`
  * **Monitor (Low/Info):** Cyan/Sky `hsl(199, 89%, 48%)`
  * **Resolved / Positive:** Forest Emerald `hsl(152, 69%, 40%)`
* **Privacy & Gated Data Indicators:**
  * Soft Purple / Lavender `hsl(262, 83%, 58%)` + Shield / Lock icon

### 6.2 Typography Hierarchy
* **Heading Font:** *Plus Jakarta Sans* or *Outfit* (Modern, confident geometric sans)
* **Body & UI Font:** *Inter* (Flawless readability at 11px–14px data table density)
* **Monospace / Metric Font:** *JetBrains Mono* (For Student Pseudonyms, Rule IDs, Timestamps, and Raw Metric Values)

### 6.3 Micro-interactions & Polish Guidelines
* **Glassmorphic Navigation Bar:** Blurred translucent header with role switcher and quick search (`Cmd+K`).
* **SLA Timers:** Visual urgency indicator changes smoothly from neutral slate to pulsing amber to solid crimson when `< 12h` remains.
* **Drawer Transitions:** Smooth slide-over panels for Signal Evidence and Case Creation, keeping the underlying list context visible to prevent disorientation.
* **Zero Layout Shift:** Skeleton loaders on all metric sparklines and cards while data mounts.
