"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Audience = "Staff" | "Guardians" | "Class Guardians" | "Individual" | "Whole School";
type Channel = "Portal" | "SMS" | "Email" | "WhatsApp";

type Thread = {
  id: string;
  title: string;
  person: string;
  context: string;
  time: string;
  unread: boolean;
  priority: "Normal" | "Important" | "Urgent";
  preview: string;
};

const threads: Thread[] = [
  { id: "MSG-201", title: "JSS 2B attendance follow-up", person: "Guardian C", context: "Student Gamma · JSS 2B", time: "10:42 AM", unread: true, priority: "Urgent", preview: "Thank you for reaching out. We are available to discuss the repeated absences and the support plan." },
  { id: "MSG-202", title: "Lesson-plan review", person: "Mrs. Amina Yusuf", context: "Teacher · Mathematics", time: "9:18 AM", unread: true, priority: "Important", preview: "I have revised the Week 6 lesson plan based on the comments and sent it back for review." },
  { id: "MSG-203", title: "SS 1A Physics support", person: "Mr. Peter James", context: "Teacher · Science", time: "Yesterday", unread: false, priority: "Normal", preview: "I propose a targeted revision class before the next topic test." },
  { id: "MSG-204", title: "Report card release", person: "Vice Principal Academics", context: "Academic office", time: "Yesterday", unread: false, priority: "Important", preview: "JSS 1A and JSS 3A report batches are ready for your final release confirmation." },
];

const announcements = [
  { id: "ANN-61", title: "First Term Mid-Term Review", audience: "Whole School", channel: "Portal + SMS", sent: "12 Sep 2026", delivered: "97%", read: "82%" },
  { id: "ANN-60", title: "Staff Academic Review Meeting", audience: "Staff", channel: "Portal", sent: "11 Sep 2026", delivered: "100%", read: "94%" },
  { id: "ANN-59", title: "JSS 2B Attendance Notice", audience: "Class Guardians", channel: "SMS + Portal", sent: "10 Sep 2026", delivered: "96%", read: "79%" },
];

const followUps = [
  { id: "FU-1", title: "Student Gamma", context: "JSS 2B · 4 absences in 10 days", action: "Guardian contact", status: "Due today", link: "/principal/students" },
  { id: "FU-2", title: "Mr. Peter James", context: "Science · second absence this month", action: "Staff check-in", status: "Due today", link: "/principal/teachers" },
  { id: "FU-3", title: "JSS 2B", context: "Academic + attendance decline", action: "Class guardian notice", status: "This week", link: "/principal/academics" },
];

export default function PrincipalCommunicationPage() {
  const [activeThreadId, setActiveThreadId] = useState(threads[0].id);
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState<Audience>("Staff");
  const [channel, setChannel] = useState<Channel>("Portal");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [reply, setReply] = useState("");
  const [replySent, setReplySent] = useState(false);

  const filteredThreads = useMemo(() => threads.filter((thread) => `${thread.title} ${thread.person} ${thread.context}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const activeThread = threads.find((thread) => thread.id === activeThreadId) ?? threads[0];
  const unread = threads.filter((thread) => thread.unread).length;

  function sendAnnouncement() {
    if (!subject.trim() || !message.trim()) return;
    setSent(true);
  }

  function useAttendanceTemplate() {
    setAudience("Class Guardians");
    setChannel("SMS");
    setSubject("Attendance follow-up");
    setMessage("Dear Parent/Guardian, we are contacting you regarding recent attendance concerns. Please contact the school so we can work together on a suitable support plan. Thank you.");
    setSent(false);
  }

  function sendReply() {
    if (!reply.trim()) return;
    setReplySent(true);
    setReply("");
  }

  return (
    <main className="principal-module-shell principal-communication-page">
      <header className="principal-module-header">
        <div>
          <span className="page-kicker">PRINCIPAL · COMMUNICATION</span>
          <h1>Communication Hub</h1>
          <p>Coordinate staff messages, guardian follow-ups, announcements and urgent school notices.</p>
        </div>
        <div className="principal-module-actions">
          <Link href="/principal">Dashboard</Link>
          <Link href="/principal/students">Students</Link>
          <Link href="/principal/teachers">Teachers</Link>
          <Link href="/principal/incidents">Incidents</Link>
        </div>
      </header>

      <section className="communication-kpis">
        <article><span>Unread</span><strong>{unread}</strong><small>Conversations requiring attention</small></article>
        <article><span>Announcements</span><strong>12</strong><small>Sent this term</small></article>
        <article><span>Delivery rate</span><strong>97%</strong><small>Across prototype channels</small></article>
        <article><span>Follow-ups due</span><strong>{followUps.filter((item) => item.status === "Due today").length}</strong><small>Needs action today</small></article>
        <article><span>Guardian responses</span><strong>84%</strong><small>Recent contact response rate</small></article>
      </section>

      <section className="communication-main-grid">
        <article className="principal-module-card communication-inbox-card">
          <header className="communication-card-head">
            <div><h2>Inbox</h2><p>Staff and authorized guardian conversations.</p></div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search conversations..." />
          </header>
          <div className="communication-thread-list">
            {filteredThreads.map((thread) => (
              <button key={thread.id} className={`${activeThread.id === thread.id ? "selected" : ""} ${thread.unread ? "unread" : ""}`} onClick={() => { setActiveThreadId(thread.id); setReplySent(false); }}>
                <span className={`comm-priority ${thread.priority.toLowerCase()}`}>{thread.priority}</span>
                <div><strong>{thread.title}</strong><b>{thread.person}</b><small>{thread.context}</small><p>{thread.preview}</p></div>
                <em>{thread.time}</em>
              </button>
            ))}
          </div>
        </article>

        <aside className="principal-module-card communication-thread-card">
          <div className="communication-thread-heading">
            <div><span>{activeThread.context}</span><h2>{activeThread.title}</h2><p>{activeThread.person}</p></div>
            <b className={`comm-priority ${activeThread.priority.toLowerCase()}`}>{activeThread.priority}</b>
          </div>
          <div className="conversation-window">
            <div className="conversation-message school"><small>School · 9:54 AM</small><p>We are following up regarding the recent school matter. We would like to coordinate the next step with you.</p></div>
            <div className="conversation-message incoming"><small>{activeThread.person} · {activeThread.time}</small><p>{activeThread.preview}</p></div>
            {replySent && <div className="conversation-message school"><small>Principal · just now</small><p>Reply sent successfully through the school communication channel.</p></div>}
          </div>
          <label className="communication-reply">Reply<textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a professional school reply..." /></label>
          <div className="communication-reply-actions"><button onClick={() => setReply("Thank you for your response. We will coordinate the next step and keep you informed.")}>Use quick reply</button><button className="primary" onClick={sendReply}>Send reply</button></div>
          <p className="communication-boundary">Only authorized school users and linked guardians should receive student-specific information. Cross-school messaging is not permitted.</p>
        </aside>
      </section>

      <section className="communication-secondary-grid">
        <article className="principal-module-card communication-compose-card">
          <header className="communication-card-head"><div><h2>Compose announcement</h2><p>Send a controlled message to an approved school audience.</p></div><button className="template-btn" onClick={useAttendanceTemplate}>Attendance template</button></header>
          <div className="communication-form-grid">
            <label>Audience<select value={audience} onChange={(e) => { setAudience(e.target.value as Audience); setSent(false); }}><option>Staff</option><option>Guardians</option><option>Class Guardians</option><option>Individual</option><option>Whole School</option></select></label>
            <label>Channel<select value={channel} onChange={(e) => { setChannel(e.target.value as Channel); setSent(false); }}><option>Portal</option><option>SMS</option><option>Email</option><option>WhatsApp</option></select></label>
            <label className="wide">Subject<input value={subject} onChange={(e) => { setSubject(e.target.value); setSent(false); }} placeholder="Announcement subject" /></label>
            <label className="wide">Message<textarea value={message} onChange={(e) => { setMessage(e.target.value); setSent(false); }} placeholder="Write school announcement or notice..." /></label>
          </div>
          <div className="communication-send-row"><span>Audience: <strong>{audience}</strong> · Channel: <strong>{channel}</strong></span><button onClick={sendAnnouncement}>Send announcement</button></div>
          {sent && <div className="communication-success">Announcement queued successfully for {audience} via {channel}.</div>}
        </article>

        <article className="principal-module-card communication-followup-card">
          <h2>Follow-ups</h2>
          <p>Communication tasks created from attendance, academics or staff oversight.</p>
          <div className="communication-followups">
            {followUps.map((item) => <div key={item.id}><div><strong>{item.title}</strong><small>{item.context}</small></div><span>{item.action}</span><b>{item.status}</b><Link href={item.link}>Open</Link></div>)}
          </div>
        </article>
      </section>

      <section className="principal-module-card communication-announcements-card">
        <header className="communication-card-head"><div><h2>Recent announcements</h2><p>Prototype delivery and read tracking.</p></div><Link href="/principal/ai">Ask Principal AI to draft</Link></header>
        <div className="communication-announcement-table">
          <div className="communication-announcement-row head"><span>Announcement</span><span>Audience</span><span>Channel</span><span>Sent</span><span>Delivered</span><span>Read</span></div>
          {announcements.map((item) => <div className="communication-announcement-row" key={item.id}><strong>{item.title}</strong><span>{item.audience}</span><span>{item.channel}</span><span>{item.sent}</span><span>{item.delivered}</span><span>{item.read}</span></div>)}
        </div>
      </section>
    </main>
  );
}
