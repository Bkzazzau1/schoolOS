"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const nav = [
  ["Dashboard","/finance-office","⌂"],
  ["Fee Structure","/finance-office/fee-structure","▦"],
  ["Scholarships & Discounts","/finance-office/scholarships","◇"],
  ["Smart Collections","/finance-office/collections","◈"],
  ["Fee Reminders","/finance-office/reminders","✦"],
  ["School Store","/finance-office/store","▣"],
  ["Payment Mandates","/finance-office/mandates","↻"],
  ["Outstanding & Aging","/finance-office/debt-aging","◷"],
  ["Receipts","/finance-office/receipts","▧"],
  ["Student Accounts","/finance-office/accounts","₦"],
  ["Reconciliation","/finance-office/reconciliation","↔"],
  ["Expenses & Income","/finance-office/expenses","▤"],
  ["Payroll Handoff","/finance-office/payroll","◎"],
  ["Reports","/finance-office/reports","▥"],
  ["Finance AI","/finance-office/ai","AI"],
];

export default function FinanceOfficeShell({children}:{children:ReactNode}){
  const pathname=usePathname();
  const active=(href:string)=>href==="/finance-office"?pathname===href:pathname.startsWith(href);
  return <div className="fo-shell">
    <aside className="fo-sidebar">
      <div className="fo-brand"><span>S</span><div><strong>SchoolOS</strong><small>Finance Office</small></div></div>
      <div className="fo-org"><span>ACTIVE SCHOOL</span><strong>BrightGate Academy</strong><small>Kaduna Campus · 2026/2027 Term 1</small></div>
      <nav>{nav.map(([label,href,icon])=><Link key={href} href={href} className={active(href)?"active":""}><i>{icon}</i><span>{label}</span></Link>)}</nav>
      <div className="fo-boundary"><strong>FINANCE ACCESS</strong><p>Fee, transaction, approved financing and payroll-processing data only. Academic grading, private teacher notes and safeguarding records stay outside this workspace.</p></div>
      <div className="fo-user"><span>AB</span><div><strong>Mr. Ahmad Bello</strong><small>Bursar / Finance Officer</small></div></div>
    </aside>
    <section className="fo-main"><header className="fo-top"><div><strong>Finance Operations</strong><span>Revenue Assurance · Collections · Reminders · Store · Banking · Expenses · Reporting</span></div><div><button>Current term</button><button>Notifications 5</button></div></header><div className="fo-content">{children}</div></section>
  </div>;
}
