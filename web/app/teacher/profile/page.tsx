"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./profile.css";

type Tab = "overview" | "employment" | "qualifications" | "assignments" | "attendance" | "salary" | "payslips" | "deductions" | "loans" | "payments" | "documents" | "timeline" | "security";

type Payslip = {
  month: string;
  reference: string;
  basic: number;
  housing: number;
  transport: number;
  responsibility: number;
  pension: number;
  tax: number;
  loan: number;
  other: number;
  status: "Paid" | "Scheduled";
};

const money = (value:number) => `₦${value.toLocaleString("en-NG")}`;

const payslips:Payslip[] = [
  { month:"August 2026", reference:"PAY/TCH-2048/2026-08", basic:185000, housing:30000, transport:20000, responsibility:15000, pension:14800, tax:13200, loan:25000, other:3000, status:"Paid" },
  { month:"July 2026", reference:"PAY/TCH-2048/2026-07", basic:185000, housing:30000, transport:20000, responsibility:15000, pension:14800, tax:13200, loan:25000, other:0, status:"Paid" },
  { month:"June 2026", reference:"PAY/TCH-2048/2026-06", basic:185000, housing:30000, transport:20000, responsibility:15000, pension:14800, tax:13200, loan:25000, other:0, status:"Paid" },
];

const loanHistory = [
  { date:"28 Aug 2026", ref:"LREP-260828-018", amount:25000, balance:75000, status:"Repaid" },
  { date:"28 Jul 2026", ref:"LREP-260728-014", amount:25000, balance:100000, status:"Repaid" },
  { date:"28 Jun 2026", ref:"LREP-260628-009", amount:25000, balance:125000, status:"Repaid" },
];

export default function TeacherProfilePage() {
  const [tab,setTab] = useState<Tab>("overview");
  const [saved,setSaved] = useState(false);
  const [selectedPayslip,setSelectedPayslip] = useState(0);
  const [profile,setProfile] = useState({
    displayName:"Mrs. Amina Yusuf",
    staffId:"TCH-2048",
    payrollId:"PAY-BGA-2048",
    department:"Mathematics",
    jobTitle:"Mathematics Teacher",
    employmentType:"Full-time · Permanent",
    employmentStatus:"Active",
    hireDate:"15 January 2022",
    qualification:"B.Ed Mathematics",
    phone:"+234 800 000 0000",
    email:"amina.yusuf@example.edu",
    address:"Kaduna, Kaduna State",
    bank:"Partner payroll bank · mock",
    account:"0123456789",
    pensionId:"PEN-BGA-2048",
    taxId:"TIN-XXXX-2048",
    nextOfKin:"Alhaji Yusuf Ibrahim",
    emergencyPhone:"+234 800 000 0101",
  });

  const gross = 185000 + 30000 + 20000 + 15000;
  const deductions = 14800 + 13200 + 25000 + 3000;
  const net = gross - deductions;
  const annualGross = gross * 12;
  const currentPayslip = payslips[selectedPayslip];
  const currentGross = currentPayslip.basic + currentPayslip.housing + currentPayslip.transport + currentPayslip.responsibility;
  const currentDeductions = currentPayslip.pension + currentPayslip.tax + currentPayslip.loan + currentPayslip.other;
  const currentNet = currentGross - currentDeductions;

  const tabs:{key:Tab;label:string}[] = [
    {key:"overview",label:"Overview"},{key:"employment",label:"Employment"},{key:"qualifications",label:"Qualifications"},{key:"assignments",label:"Teaching Load"},{key:"attendance",label:"Attendance & Leave"},{key:"salary",label:"Salary"},{key:"payslips",label:"Payslips"},{key:"deductions",label:"Deductions"},{key:"loans",label:"Loans & Advances"},{key:"payments",label:"Payment History"},{key:"documents",label:"Documents"},{key:"timeline",label:"Timeline"},{key:"security",label:"Security"},
  ];

  const allowances = [
    ["Housing allowance",30000],["Transport allowance",20000],["Responsibility allowance",15000],["Other recurring allowance",0],
  ];
  const deductionRows = [
    ["Pension contribution",14800,"Statutory / configured"],["PAYE / tax",13200,"Payroll tax"],["Staff loan repayment",25000,"Ends Nov 2026"],["Other deduction",3000,"Staff cooperative"],
  ];

  const paymentHistory = useMemo(() => payslips.map((p) => {
    const g = p.basic+p.housing+p.transport+p.responsibility;
    const d = p.pension+p.tax+p.loan+p.other;
    return { month:p.month, reference:p.reference, gross:g, deductions:d, net:g-d, status:p.status };
  }),[]);

  function update(field:keyof typeof profile,value:string){ setProfile(p=>({...p,[field]:value})); setSaved(false); }

  return <main className="teacher-profile-page">
    <header className="teacher-profile-top">
      <div><span>TEACHER ACCOUNT · HR & PAYROLL PROFILE</span><h1>Teacher Profile</h1><p>Employment, teaching assignments, salary, deductions, loans, payslips and staff records.</p></div>
      <div className="teacher-profile-actions"><Link href="/teacher">Dashboard</Link><button type="button" onClick={()=>window.print()}>Print current payslip</button><button type="button" className="primary" onClick={()=>setSaved(true)}>{saved?"Saved locally":"Save profile"}</button></div>
    </header>

    <section className="teacher-profile-hero">
      <div className="teacher-profile-photo">AY</div>
      <div className="teacher-profile-identity"><span>{profile.staffId} · {profile.payrollId}</span><h2>{profile.displayName}</h2><p>{profile.jobTitle} · {profile.department} · Kaduna Campus</p><div><em>{profile.employmentStatus}</em><em>{profile.employmentType}</em><em>Payroll active</em></div></div>
      <div className="teacher-profile-kpis"><div><span>Net salary</span><strong>{money(net)}</strong></div><div><span>Attendance</span><strong>96%</strong></div><div><span>Loan balance</span><strong>{money(75000)}</strong></div></div>
    </section>

    <nav className="teacher-profile-tabs">{tabs.map(item=><button key={item.key} type="button" onClick={()=>setTab(item.key)} className={tab===item.key?"active":""}>{item.label}</button>)}</nav>

    <section className="teacher-profile-layout">
      <div className="teacher-profile-main">
        {tab==="overview" && <>
          <div className="teacher-section-head"><div><h3>Staff overview</h3><p>Core identity, employment and payroll context.</p></div><span>Teacher self-service</span></div>
          <div className="teacher-info-grid"><div><span>Staff ID</span><strong>{profile.staffId}</strong></div><div><span>Payroll ID</span><strong>{profile.payrollId}</strong></div><div><span>Department</span><strong>{profile.department}</strong></div><div><span>Job title</span><strong>{profile.jobTitle}</strong></div><div><span>Hire date</span><strong>{profile.hireDate}</strong></div><div><span>Employment</span><strong>{profile.employmentType}</strong></div></div>
          <div className="teacher-metric-grid" style={{marginTop:12}}><div><span>Gross monthly</span><strong>{money(gross)}</strong></div><div><span>Total deductions</span><strong>{money(deductions)}</strong></div><div><span>Net monthly</span><strong>{money(net)}</strong></div><div><span>Annual gross</span><strong>{money(annualGross)}</strong></div></div>
          <div className="teacher-boundary">Salary, loan and deduction information belongs to the staff member, authorized payroll/finance officers and specifically permitted leadership. It should not appear in student, parent or ordinary colleague views.</div>
        </>}

        {tab==="employment" && <>
          <div className="teacher-section-head"><div><h3>Employment record</h3><p>Editable mock HR details; role and contract changes require authorized administration.</p></div><span>HR record</span></div>
          <div className="teacher-info-grid">
            <div><span>Display name</span><strong>{profile.displayName}</strong></div><div><span>Employment status</span><strong>{profile.employmentStatus}</strong></div><div><span>Hire date</span><strong>{profile.hireDate}</strong></div><div><span>Phone</span><strong>{profile.phone}</strong></div><div><span>Email</span><strong>{profile.email}</strong></div><div><span>Address</span><strong>{profile.address}</strong></div><div><span>Next of kin</span><strong>{profile.nextOfKin}</strong></div><div><span>Emergency contact</span><strong>{profile.emergencyPhone}</strong></div><div><span>Campus</span><strong>Kaduna Campus</strong></div>
          </div>
        </>}

        {tab==="qualifications" && <>
          <div className="teacher-section-head"><div><h3>Qualifications & professional record</h3><p>Verified qualifications, certifications and development activity.</p></div><span>Evidence-based</span></div>
          <div className="assignment-list"><div><div><strong>B.Ed Mathematics</strong><span>Ahmadu Bello University · Verified</span></div><span>Primary qualification</span></div><div><div><strong>Teachers Registration Council record</strong><span>Registration document · Mock verified</span></div><span>Professional</span></div><div><div><strong>Classroom Assessment Workshop</strong><span>May 2026 · Internal professional development</span></div><span>CPD</span></div><div><div><strong>Digital Learning & Safety</strong><span>February 2026 · School training</span></div><span>CPD</span></div></div>
        </>}

        {tab==="assignments" && <>
          <div className="teacher-section-head"><div><h3>Teaching load</h3><p>Assignments are read-only here and controlled by authorized academic leadership.</p></div><span>28 periods / week</span></div>
          <div className="assignment-list"><div><div><strong>JSS 2A · Mathematics</strong><span>7 periods/week · Room B12</span></div><span>Class teacher support</span></div><div><div><strong>JSS 2B · Mathematics</strong><span>7 periods/week · Room B14</span></div><span>Subject teacher</span></div><div><div><strong>JSS 3A · Mathematics</strong><span>7 periods/week · Room C04</span></div><span>Subject teacher</span></div><div><div><strong>SS 1A · Further Mathematics</strong><span>7 periods/week · Room D06</span></div><span>Subject teacher</span></div></div>
        </>}

        {tab==="attendance" && <>
          <div className="teacher-section-head"><div><h3>Attendance & leave</h3><p>Operational attendance and approved leave record.</p></div><span>Current term</span></div>
          <div className="teacher-metric-grid"><div><span>Attendance</span><strong>96%</strong></div><div><span>Late arrivals</span><strong>2</strong></div><div><span>Approved leave</span><strong>3 days</strong></div><div><span>Unapproved absence</span><strong>0</strong></div></div>
          <h4 style={{fontSize:10,margin:"16px 0 8px"}}>Leave history</h4><div className="leave-list"><div><div><strong>Annual leave</strong><span>12–13 August 2026</span></div><span>Approved · 2 days</span></div><div><div><strong>Personal leave</strong><span>3 June 2026</span></div><span>Approved · 1 day</span></div></div>
          <div className="teacher-boundary">Attendance may support operational follow-up, but should not be converted into an automatic employment decision or opaque staff score.</div>
        </>}

        {tab==="salary" && <>
          <div className="teacher-section-head"><div><h3>Salary structure</h3><p>Current monthly payroll composition.</p></div><span>Confidential payroll</span></div>
          <div className="salary-grid"><div><span>Basic salary</span><strong>{money(185000)}</strong></div><div><span>Total allowances</span><strong>{money(65000)}</strong></div><div><span>Gross salary</span><strong>{money(gross)}</strong></div><div><span>Net salary</span><strong>{money(net)}</strong></div></div>
          <h4 style={{fontSize:10,margin:"16px 0 8px"}}>Allowances</h4><div className="allowance-list">{allowances.map(([name,amount])=><div key={String(name)}><strong>{name}</strong><span>{money(Number(amount))}</span></div>)}</div>
          <h4 style={{fontSize:10,margin:"16px 0 8px"}}>Payroll destination</h4><div className="teacher-info-grid"><div><span>Bank / provider</span><strong>{profile.bank}</strong></div><div><span>Salary account</span><strong>{profile.account}</strong></div><div><span>Pension ID</span><strong>{profile.pensionId}</strong></div><div><span>Tax ID</span><strong>{profile.taxId}</strong></div></div>
        </>}

        {tab==="payslips" && <div className="payslip">
          <div className="payslip-head"><div><h3>BrightGate Academy · Payslip</h3><p>{currentPayslip.month} · {profile.displayName} · {profile.staffId}</p></div><div><strong>{currentPayslip.reference}</strong><p>{currentPayslip.status}</p></div></div>
          <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>{payslips.map((p,i)=><button type="button" key={p.reference} onClick={()=>setSelectedPayslip(i)} style={{border:"1px solid #dce5eb",background:i===selectedPayslip?"#102e44":"#fff",color:i===selectedPayslip?"#fff":"#385469",borderRadius:8,padding:"7px 9px",fontSize:8,fontWeight:800}}>{p.month}</button>)}</div>
          <div className="payslip-columns"><section><h4>Earnings</h4><div><span>Basic salary</span><strong>{money(currentPayslip.basic)}</strong></div><div><span>Housing</span><strong>{money(currentPayslip.housing)}</strong></div><div><span>Transport</span><strong>{money(currentPayslip.transport)}</strong></div><div><span>Responsibility</span><strong>{money(currentPayslip.responsibility)}</strong></div><div><span>Gross</span><strong>{money(currentGross)}</strong></div></section><section><h4>Deductions</h4><div><span>Pension</span><strong>{money(currentPayslip.pension)}</strong></div><div><span>PAYE / Tax</span><strong>{money(currentPayslip.tax)}</strong></div><div><span>Loan repayment</span><strong>{money(currentPayslip.loan)}</strong></div><div><span>Other</span><strong>{money(currentPayslip.other)}</strong></div><div><span>Total deductions</span><strong>{money(currentDeductions)}</strong></div></section></div>
          <div className="payslip-total"><span>Net pay</span><strong>{money(currentNet)}</strong></div>
          <div className="teacher-boundary">Browser print / Save PDF is the current prototype payslip output. Production payslips should include payroll approval, immutable payroll reference, payment date and audit history.</div>
        </div>}

        {tab==="deductions" && <>
          <div className="teacher-section-head"><div><h3>Deductions</h3><p>Every deduction should be named, traceable and visible to the staff member.</p></div><span>{money(deductions)} this month</span></div>
          <div className="deduction-list">{deductionRows.map(([name,amount,note])=><div key={String(name)}><div><strong>{name}</strong><span>{note}</span></div><strong>{money(Number(amount))}</strong></div>)}</div>
          <div className="teacher-boundary">No unexplained payroll deduction should be hidden inside a combined number. Adjustments, reversals and arrears should have their own ledger entries.</div>
        </>}

        {tab==="loans" && <>
          <div className="teacher-section-head"><div><h3>Staff loans & salary advances</h3><p>Approved facilities, repayment schedule and outstanding amount.</p></div><span>Human approval required</span></div>
          <div className="loan-card"><span>ACTIVE STAFF LOAN · STL-26014</span><strong>{money(75000)} outstanding</strong><small>Original principal {money(150000)} · Monthly payroll repayment {money(25000)} · Expected completion November 2026</small></div>
          <div className="loan-list">{loanHistory.map(item=><div key={item.ref}><div><strong>{item.date} · {item.ref}</strong><span>Payroll loan repayment</span></div><div style={{textAlign:"right"}}><strong>{money(item.amount)}</strong><span>{money(item.balance)} balance</span></div></div>)}</div>
          <div className="teacher-boundary">Loan applications should remain separate from teacher-performance metrics. SchoolOS may organize requests, approvals and repayment schedules, but should not infer creditworthiness from teaching performance or student results.</div>
        </>}

        {tab==="payments" && <>
          <div className="teacher-section-head"><div><h3>Salary payment history</h3><p>Auditable payroll payments and net amounts received.</p></div><span>Payroll ledger</span></div>
          <div className="teacher-profile-table"><div className="head"><span>Period</span><span>Reference</span><span>Gross</span><span>Deductions</span><span>Net</span><span>Status</span></div>{paymentHistory.map(row=><div key={row.reference}><strong>{row.month}</strong><code>{row.reference}</code><span>{money(row.gross)}</span><span>{money(row.deductions)}</span><strong>{money(row.net)}</strong><em>{row.status}</em></div>)}</div>
        </>}

        {tab==="documents" && <>
          <div className="teacher-section-head"><div><h3>Staff documents</h3><p>Document labels only in this UI prototype.</p></div><span>Restricted HR</span></div>
          <div className="doc-list"><div><div><strong>Appointment letter</strong><span>Employment document · Verified</span></div><span>HR + Staff</span></div><div><div><strong>B.Ed certificate</strong><span>Qualification document · Verified</span></div><span>HR + Staff</span></div><div><div><strong>TRCN record</strong><span>Professional registration · Current</span></div><span>HR + Staff</span></div><div><div><strong>Bank / payroll mandate</strong><span>Payroll setup record · Current</span></div><span>Payroll only</span></div></div>
        </>}

        {tab==="timeline" && <>
          <div className="teacher-section-head"><div><h3>Staff timeline</h3><p>Employment, payroll and professional-development events.</p></div><span>Audit-friendly</span></div>
          <div className="timeline-list"><div><time>28 Aug 2026</time><div><strong>August payroll completed</strong><p>Net salary {money(net)} paid under payroll reference PAY/TCH-2048/2026-08.</p></div></div><div><time>15 Aug 2026</time><div><strong>Leave completed</strong><p>Two days annual leave closed as approved.</p></div></div><div><time>30 May 2026</time><div><strong>Professional development recorded</strong><p>Classroom Assessment Workshop completed.</p></div></div><div><time>15 Jan 2022</time><div><strong>Employment started</strong><p>Joined BrightGate Academy as Mathematics Teacher.</p></div></div></div>
        </>}

        {tab==="security" && <>
          <div className="teacher-section-head"><div><h3>Security & sessions</h3><p>Teacher-account security controls.</p></div><span>Self-service</span></div>
          <div className="security-list"><div><div><strong>Password</strong><span>Last changed 62 days ago</span></div><button type="button">Change password</button></div><div><div><strong>Signed-in devices</strong><span>2 active sessions</span></div><button type="button">Manage sessions</button></div><div><div><strong>Multi-factor authentication</strong><span>Recommended for staff accounts</span></div><button type="button">Set up MFA</button></div></div>
        </>}
      </div>

      <aside className="teacher-profile-side">
        <article><span>MONTHLY NET PAY</span><strong>{money(net)}</strong><p>Current mock payroll after pension, tax, loan and other deductions.</p><button type="button" onClick={()=>setTab("payslips")}>View payslip</button></article>
        <article><span>ACTIVE LOAN</span><strong>{money(75000)}</strong><p>{money(25000)} monthly payroll repayment. Expected completion November 2026.</p><button type="button" onClick={()=>setTab("loans")}>Open loan ledger</button></article>
        <article><span>STAFF RECORD</span><strong>96%</strong><p>Mock profile completeness across HR, payroll, qualifications and assignments.</p></article>
        <article><span>PAYROLL PRIVACY</span><p>Salary, bank, loan and deduction data should be visible only to the staff member and specifically authorized HR/finance roles.</p></article>
        <article><span>CONNECTED WORK</span><Link href="/teacher/classes">My Classes</Link><Link href="/teacher/attendance">Attendance</Link><Link href="/teacher/performance">My Performance</Link></article>
      </aside>
    </section>
  </main>;
}
