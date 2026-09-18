"use client";

import { useEffect, useState } from "react";

export type ConcessionType = "Scholarship" | "Discount";
export type ConcessionStatus = "Pending Approval" | "Approved" | "Declined";
export type RequesterRole = "Finance Office" | "Administrator" | "Head Master" | "Principal" | "Director";

export type ConcessionRequest = {
  id: string;
  student: string;
  className: string;
  type: ConcessionType;
  grossFee: number;
  amount: number;
  reason: string;
  requestedBy: string;
  requestedByRole: RequesterRole;
  requestedAt: string;
  status: ConcessionStatus;
  decidedBy?: string;
  decidedAt?: string;
  decisionNote?: string;
};

export const REQUESTER_ROLES: RequesterRole[] = ["Finance Office", "Administrator", "Head Master", "Principal", "Director"];

const STORAGE_KEY = "schoolos.concession_requests.v1";
const UPDATE_EVENT = "schoolos:concessions-updated";

const seed: ConcessionRequest[] = [
  { id: "CNC-2026-041", student: "Yusuf Bello", className: "JSS 2B", type: "Scholarship", grossFee: 185000, amount: 75000, reason: "Founder Scholarship · BrightGate Founder Fund", requestedBy: "Finance Office", requestedByRole: "Finance Office", requestedAt: "02 Sep 2026", status: "Approved", decidedBy: "Proprietor", decidedAt: "03 Sep 2026", decisionNote: "Approved per founder fund allocation." },
  { id: "CNC-2026-042", student: "Hafsa Abdullahi", className: "Primary 3", type: "Discount", grossFee: 145000, amount: 10000, reason: "Sibling Discount · school policy", requestedBy: "Finance Office", requestedByRole: "Finance Office", requestedAt: "10 Sep 2026", status: "Pending Approval" },
  { id: "CNC-2026-043", student: "Muhammad Kabir", className: "Primary 5", type: "Scholarship", grossFee: 145000, amount: 50000, reason: "Academic Scholarship · BrightGate Scholarship Fund", requestedBy: "Finance Office", requestedByRole: "Finance Office", requestedAt: "05 Sep 2026", status: "Approved", decidedBy: "Proprietor", decidedAt: "06 Sep 2026", decisionNote: "Approved based on academic performance review." },
  { id: "CNC-2026-044", student: "Aisha Ibrahim", className: "Nursery 2", type: "Discount", grossFee: 117500, amount: 23500, reason: "Staff Child Discount · staff benefit policy", requestedBy: "Administrator", requestedByRole: "Administrator", requestedAt: "12 Sep 2026", status: "Pending Approval" },
];

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadConcessionRequests(): ConcessionRequest[] {
  if (!isBrowser()) return seed;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as ConcessionRequest[];
  } catch {
    return seed;
  }
}

function saveConcessionRequests(list: ConcessionRequest[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

function nextId(list: ConcessionRequest[]) {
  const n = list.length + 1;
  return `CNC-2026-${String(40 + n).padStart(3, "0")}`;
}

export function addConcessionRequest(input: {
  student: string;
  className: string;
  type: ConcessionType;
  grossFee: number;
  amount: number;
  reason: string;
  requestedBy: string;
  requestedByRole: RequesterRole;
}) {
  const list = loadConcessionRequests();
  const record: ConcessionRequest = {
    ...input,
    id: nextId(list),
    requestedAt: new Date().toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" }),
    status: "Pending Approval",
  };
  const next = [record, ...list];
  saveConcessionRequests(next);
  return record;
}

export function decideConcessionRequest(id: string, status: "Approved" | "Declined", decidedBy: string, decisionNote: string) {
  const list = loadConcessionRequests();
  const next = list.map((item) =>
    item.id === id
      ? { ...item, status, decidedBy, decisionNote, decidedAt: new Date().toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" }) }
      : item
  );
  saveConcessionRequests(next);
}

export function useConcessionRequests() {
  const [requests, setRequests] = useState<ConcessionRequest[]>([]);

  useEffect(() => {
    setRequests(loadConcessionRequests());
    function onUpdate() {
      setRequests(loadConcessionRequests());
    }
    window.addEventListener(UPDATE_EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener(UPDATE_EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return requests;
}

export const money = (n: number) => `₦${n.toLocaleString("en-NG")}`;
