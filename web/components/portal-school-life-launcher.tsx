"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const portalMeta = [
  { prefix: "/proprietor", key: "proprietor", label: "Proprietor", scope: "Whole school" },
  { prefix: "/principal", key: "principal", label: "Principal", scope: "Secondary School" },
  { prefix: "/headmaster", key: "headmaster", label: "Headmistress", scope: "Primary School" },
  { prefix: "/headteacher", key: "headteacher", label: "Head Teacher", scope: "Nursery / Early Years" },
  { prefix: "/teacher", key: "teacher", label: "Teacher", scope: "Assigned classes / activities" },
];

export default function PortalSchoolLifeLauncher() {
  const pathname = usePathname();
  const portal = portalMeta.find((item) => pathname?.startsWith(item.prefix));

  if (!portal) return null;

  return (
    <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 90, display: "flex", flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center", gap: 8, maxWidth: "calc(100vw - 36px)" }}>
    <button
      type="button"
      onClick={() => window.location.replace("/login")}
      style={{ cursor: "pointer", color: "#203a56", background: "#fff", border: "1px solid #cbd5e1", borderRadius: 14, padding: "15px 18px", fontSize: 12, fontWeight: 800, boxShadow: "0 14px 34px rgba(25,42,65,.12)" }}
    >
      Log out
    </button>
    <Link
      href={`/school-life/access?portal=${portal.key}`}
      aria-label={`Open School Life as ${portal.label}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        color: "#fff",
        background: "#203a56",
        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: 14,
        padding: "11px 14px",
        boxShadow: "0 14px 34px rgba(25,42,65,.22)",
        fontSize: 12,
        fontWeight: 800,
      }}
    >
      <span style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,255,255,.12)", display: "grid", placeItems: "center" }}>SL</span>
      <span style={{ display: "grid", gap: 2 }}>
        <strong>School Life</strong>
        <small style={{ opacity: .72, fontSize: 9, fontWeight: 700 }}>{portal.label} · {portal.scope}</small>
      </span>
    </Link>
    </div>
  );
}
