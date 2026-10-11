"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PersonaRole,
  PERSONAS,
  Persona,
  Signal,
  SupportCase,
  StudentProfile,
  INITIAL_SIGNALS,
  INITIAL_CASES,
  INITIAL_STUDENTS,
} from "./data";

interface SutraContextType {
  activeRole: PersonaRole;
  currentPersona: Persona;
  setRole: (role: PersonaRole) => void;
  signals: Signal[];
  cases: SupportCase[];
  students: Record<string, StudentProfile>;
  selectedSignalId: string | null;
  setSelectedSignalId: (id: string | null) => void;
  activeScenario: string;
  loadScenario: (scenarioNumber: 1 | 2 | 3 | 4) => void;
  resetAllData: () => void;
  convertSignalToCase: (signalId: string, interventionTitle: string, ownerName: string, ownerRole: string, slaDays: number) => string;
  logCaseFollowUp: (caseId: string, note: string, actionType: string, authorName?: string) => void;
  resolveCase: (caseId: string, outcomeStatus: string, outcomeNote: string) => void;
  snoozeSignal: (signalId: string) => void;
  dismissSignal: (signalId: string, reason: string) => void;
}

const SutraContext = createContext<SutraContextType | undefined>(undefined);

export function SutraProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<PersonaRole>("MENTOR");
  const [signals, setSignals] = useState<Signal[]>(INITIAL_SIGNALS);
  const [cases, setCases] = useState<SupportCase[]>(INITIAL_CASES);
  const [students, setStudents] = useState<Record<string, StudentProfile>>(INITIAL_STUDENTS);
  const [selectedSignalId, setSelectedSignalId] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<string>("SCENARIO_1_HAPPY_PATH");

  const currentPersona = PERSONAS[activeRole];

  const setRole = (role: PersonaRole) => {
    setActiveRole(role);
  };

  const loadScenario = (num: 1 | 2 | 3 | 4) => {
    if (num === 1) {
      // Scenario 1: STU-1042 Happy Path
      setActiveScenario("SCENARIO_1_HAPPY_PATH");
      setActiveRole("MENTOR");
      setSelectedSignalId("SIG-1042");
    } else if (num === 2) {
      // Scenario 2: STU-1088 Data Quality / Insufficient Baseline
      setActiveScenario("SCENARIO_2_INSUFFICIENT_DATA");
      setActiveRole("MENTOR");
      setSelectedSignalId("SIG-1088");
    } else if (num === 3) {
      // Scenario 3: STU-1095 Privacy / Fee Gating
      setActiveScenario("SCENARIO_3_FEE_GATING");
      // Initially set to faculty to show redacted state
      setActiveRole("FACULTY");
      setSelectedSignalId("SIG-1095");
    } else if (num === 4) {
      // Scenario 4: STU-1014 Overdue & Escalation
      setActiveScenario("SCENARIO_4_OVERDUE_ESCALATION");
      setActiveRole("HOD");
      setSelectedSignalId("SIG-1014");
    }
  };

  const resetAllData = () => {
    setSignals(INITIAL_SIGNALS);
    setCases(INITIAL_CASES);
    setStudents(INITIAL_STUDENTS);
    setSelectedSignalId(null);
    setActiveScenario("DEFAULT");
    setActiveRole("MENTOR");
  };

  const convertSignalToCase = (
    signalId: string,
    interventionTitle: string,
    ownerName: string,
    ownerRole: string,
    slaDays: number
  ): string => {
    const signal = signals.find((s) => s.id === signalId);
    if (!signal) return "";

    const newCaseId = `CASE-2026-${Math.floor(100 + Math.random() * 900)}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + slaDays);
    const dueDateStr = dueDate.toISOString().split("T")[0];

    const newCase: SupportCase = {
      id: newCaseId,
      signalId: signal.id,
      studentId: signal.studentId,
      studentName: signal.studentName,
      program: `${signal.program} (${signal.semester})`,
      status: "ASSIGNED",
      assignedOwner: ownerName,
      ownerRole: ownerRole,
      ownerAvatar: currentPersona.avatar,
      interventionType: interventionTitle,
      dueDate: dueDateStr,
      createdAt: new Date().toISOString(),
      isOverdue: false,
      timeline: [
        {
          id: `EVT-${Date.now()}-1`,
          timestamp: "Just now",
          author: "SUTRA Engine",
          authorRole: "Signal Triage",
          type: "SIGNAL_CREATED",
          note: `Signal ${signal.ruleId} evaluated: ${signal.explanation}`,
        },
        {
          id: `EVT-${Date.now()}-2`,
          timestamp: "Just now",
          author: currentPersona.name,
          authorRole: currentPersona.title,
          type: "ASSIGNED",
          note: `Case assigned to ${ownerName} (${ownerRole}) with ${slaDays}-day SLA. Policy intervention: ${interventionTitle}`,
        },
      ],
    };

    setCases((prev) => [newCase, ...prev]);

    // Update signal status
    setSignals((prev) =>
      prev.map((s) =>
        s.id === signalId ? { ...s, status: "CONVERTED_TO_CASE" } : s
      )
    );

    return newCaseId;
  };

  const logCaseFollowUp = (
    caseId: string,
    note: string,
    actionType: string,
    authorName?: string
  ) => {
    const now = new Date();
    const timeString = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const newEvent = {
          id: `EVT-${Date.now()}`,
          timestamp: timeString,
          author: authorName || currentPersona.name,
          authorRole: currentPersona.title,
          type: "CHECKIN_LOGGED" as const,
          note: `[${actionType}] ${note}`,
        };
        return {
          ...c,
          status: "IN_PROGRESS",
          timeline: [...c.timeline, newEvent],
        };
      })
    );
  };

  const resolveCase = (
    caseId: string,
    outcomeStatus: string,
    outcomeNote: string
  ) => {
    const now = new Date();
    const timeString = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setCases((prev) =>
      prev.map((c) => {
        if (c.id !== caseId) return c;
        const newEvent = {
          id: `EVT-${Date.now()}`,
          timestamp: timeString,
          author: currentPersona.name,
          authorRole: currentPersona.title,
          type: "RESOLVED" as const,
          note: `Outcome verified: [${outcomeStatus}] ${outcomeNote}`,
        };
        return {
          ...c,
          status: "RESOLVED",
          outcomeStatus,
          outcomeNote,
          timeline: [...c.timeline, newEvent],
        };
      })
    );
  };

  const snoozeSignal = (signalId: string) => {
    setSignals((prev) =>
      prev.map((s) =>
        s.id === signalId ? { ...s, status: "SNOOZED" } : s
      )
    );
  };

  const dismissSignal = (signalId: string, reason: string) => {
    setSignals((prev) =>
      prev.map((s) =>
        s.id === signalId ? { ...s, status: "DISMISSED" } : s
      )
    );
  };

  return (
    <SutraContext.Provider
      value={{
        activeRole,
        currentPersona,
        setRole,
        signals,
        cases,
        students,
        selectedSignalId,
        setSelectedSignalId,
        activeScenario,
        loadScenario,
        resetAllData,
        convertSignalToCase,
        logCaseFollowUp,
        resolveCase,
        snoozeSignal,
        dismissSignal,
      }}
    >
      {children}
    </SutraContext.Provider>
  );
}

export function useSutra() {
  const context = useContext(SutraContext);
  if (!context) {
    throw new Error("useSutra must be used within a SutraProvider");
  }
  return context;
}
