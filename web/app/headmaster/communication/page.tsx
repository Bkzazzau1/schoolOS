"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Channel = "Guardian" | "Teacher" | "Announcement";
type MessageState = "Unread" | "Read" | "Action needed";
type Thread = {
  id: string;
  channel: Channel;
  person: string;
  context: string;
  preview: string;
  time: string;
  state: MessageState;
  pupil?: string;
  className?: string;
  messages: { from: "School" | "Contact"; text: string; time: string }[];
};

const initialThreads: Thread[] = [
  {
    id: "COM-101",
    channel: "Guardian",
    person: "Guardian Gamma",
    pupil: "Pupil Gamma",
    className: "Primary 3",
    context: "Attendance follow-up",
    preview: "Thank you. I will make sure she arrives earlier tomorrow.",
    time: "12 min",
    state: "Action needed",
    messages: [
      { from: "School", text: "Good afternoon. We noticed repeated absences and late arrival this week. Please let us know if there is any support the school should be aware of.", time: "10:14 AM" },
      { from: "Contact", text: "Thank you. I will make sure she arrives earlier tomorrow. She has also been recovering from a minor cold.", time: "10:28 AM" },
    ],
  },
  {
    id: "COM-102",
    channel: "Teacher",
    person: "Mrs. Ruth James",
    className: "Primary 3",
    context: "Literacy support",
    preview: "I have prepared a small-group reading plan for the next two weeks.",
    time: "26 min",
    state: "Unread",
    messages: [
      { from: "Contact", text: "I have prepared a small-group reading plan for the next two weeks. I would like to review progress every Friday.", time: "9:52 AM" },
    ],
  },
  {
    id: "COM-103",
    channel: "Guardian",
    person: "Guardian Epsilon",
    pupil: "Pupil Epsilon",
    className: "Primary 5",
    context: "Report-card readiness",
    preview: "Will the report be available before the holiday begins?",
    time: "48 min",
    state: "Unread",
    messages: [
      { from: "Contact", text: "Will the report be available before the holiday begins?", time: "9:30 AM" },
    ],
  },
  {
    id: "COM-104",
    channel: "Teacher",
    person: "Mr. David Joseph",
    className: "Primary 4",
    context: "Timetable conflict",
    preview: "The Mathematics overlap on Monday period 6 still needs adjustment.",
    time: "1 hr",
    state: "Action needed",
    messages: [
      { from: "Contact", text: "The Mathematics overlap on Monday period 6 still needs adjustment. I can move one period if Primary 2 Computer Studies remains unchanged.", time: "8:44 AM" },
    ],
  },
  {
    id: "COM-105",
    channel: "Announcement",
    person: "Primary School Families",
    context: "Friday reading activity",
    preview: "Reminder: pupils should bring one age-appropriate storybook on Friday.",
    time: "Yesterday",
    state: "Read",
    messages: [
      { from: "School", text: "Reminder: pupils should bring one age-appropriate storybook on Friday for the Primary reading activity.", time: "Yesterday · 3:10 PM" },
    ],
  },
];

const followUps = [
  { id: "F-01", title: "Pupil Gamma attendance", audience: "Guardian Gamma", due: "Today", source: "Attendance", href: "/headmaster/attendance" },
  { id: "F-02", title: "Primary 3 literacy support", audience: "Mrs. Ruth James", due: "Today", source: "Academics", href: "/headmaster/academics" },
  { id: "F-03", title: "Primary 6 report readiness", audience: "Class / guardians", due: "Tomorrow", source: "Reports", href: "/headmaster/results" },
  { id: "F-04", title: "Monday timetable conflict", audience: "Mr. David Joseph", due: "Today", source: "Timetable", href: "/headmaster/timetable" },
];

const templates = [
  { title: "Attendance follow-up", body: "Good day. We noticed an attendance pattern that needs follow-up. Please let us know if there is any information or support the school should consider." },
  { title: "Report available", body: "Good day. Your child's Primary School report has been reviewed and is ready for release through the approved school process." },
  { title: "Teacher meeting", body: "Good day. We would like to schedule a short discussion regarding your child's learning progress. Please reply with a suitable time." },
  { title: "Class announcement", body: "Dear Primary School families, please note the following class update. Kindly acknowledge receipt where required." },
];

export default function HeadmasterCommunicationPage() {
  const [threads, setThreads] = useState(initialThreads);
  const [selectedId, setSelectedId] = useState(initialThreads[0].id);
  const [query, setQuery] = useState("");
  const [channelFilter, setChannelFilter] = useState("All channels");
  const [reply, setReply] = useState("");
  const [composeAudience, setComposeAudience] = useState("Primary School Guardians");
  const [composeTitle, setComposeTitle] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [notice, setNotice] = useState("");
  const [resolvedFollowUps, setResolvedFollowUps] = useState<string[]>([]);

  const filteredThreads = useMemo(() => threads.filter((thread) => {
    const haystack = `${thread.person} ${thread.context} ${thread.preview} ${thread.className ?? ""} ${thread.pupil ?? ""}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    const matchesChannel = channelFilter === "All channels" || thread.channel === channelFilter;
    return matchesQuery && matchesChannel;
  }), [threads, query, channelFilter]);

  const selected = threads.find((thread) => thread.id === selectedId) ?? threads[0];
  const unreadCount = threads.filter((thread) => thread.state === "Unread").length;
  const actionCount = threads.filter((thread) => thread.state === "Action needed").length;
  const openFollowUps = followUps.filter((item) => !resolvedFollowUps.includes(item.id)).length;

  function sendReply() {
    if (!reply.trim()) return;
    setThreads((current) => current.map((thread) => thread.id === selected.id ? {
      ...thread,
      state: "Read",
      preview: reply.trim(),
      messages: [...thread.messages, { from: "School", text: reply.trim(), time: "Just now" }],
    } : thread));
    setReply("");
    setNotice(`Reply queued locally for ${selected.person}. No real message was sent.`);
  }

  function queueAnnouncement() {
    if (!composeTitle.trim() || !composeBody.trim()) return;
    setNotice(`“${composeTitle.trim()}” queued locally for ${composeAudience}. No external message was sent.`);
    setComposeTitle("");
    setComposeBody("");
  }

  function useTemplate(body: string, title: string) {
    setComposeTitle(title);
    setComposeBody(body);
  }

  function toggleFollowUp(id: string) {
    setResolvedFollowUps((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main className="headmaster-module-shell primary-communication-page">
      <header className="headmaster-module-header">
        <div>
          <span className="page-kicker">HEADMISTRESS · PRIMARY SCHOOL</span>
          <h1>Communication</h1>
          <p>Coordinate Primary School messages with guardians and teachers, announcements, follow-ups and delivery status.</p>
        </div>
        <div className="headmaster-module-actions">
          <Link href="/headmaster">Dashboard</Link>
          <Link href="/headmaster/attendance">Attendance</Link>
          <Link href="/headmaster/results">Reports</Link>
        </div>
      </header>

      <section className="primary-communication-scope">
        <div><span>ACTIVE SECTION</span><strong>Primary School</strong><small>Primary 1–6 · Kaduna Campus</small></div>
        <p>This communication workspace represents Primary School contacts only. Nursery and Secondary conversations remain separate.</p>
      </section>

      <section className="primary-communication-kpis">
        <article><span>Unread conversations</span><strong>{unreadCount}</strong><small>Needs review</small></article>
        <article><span>Action needed</span><strong>{actionCount}</strong><small>Leadership follow-up</small></article>
        <article><span>Open follow-ups</span><strong>{openFollowUps}</strong><small>Attendance, academics, reports</small></article>
        <article><span>Delivery rate</span><strong>97%</strong><small>Prototype messaging metric</small></article>
        <article><span>Guardian response</span><strong>84%</strong><small>Current term prototype</small></article>
      </section>

      <section className="primary-communication-workspace">
        <article className="headmaster-module-card primary-communication-inbox">
          <header>
            <div><h2>Inbox</h2><p>Guardian, teacher and announcement conversations.</p></div>
            <div className="primary-communication-filters">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search contact, pupil, class or topic..." />
              <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}><option>All channels</option><option>Guardian</option><option>Teacher</option><option>Announcement</option></select>
            </div>
          </header>

          <div className="primary-thread-list">
            {filteredThreads.map((thread) => (
              <button key={thread.id} className={`${selected.id === thread.id ? "selected" : ""} ${thread.state.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setSelectedId(thread.id)}>
                <span className={`primary-thread-channel ${thread.channel.toLowerCase()}`}>{thread.channel.slice(0, 1)}</span>
                <div><strong>{thread.person}</strong><small>{thread.context}{thread.className ? ` · ${thread.className}` : ""}</small><p>{thread.preview}</p></div>
                <div><small>{thread.time}</small><em>{thread.state}</em></div>
              </button>
            ))}
          </div>
        </article>

        <aside className="headmaster-module-card primary-conversation-card">
          <header>
            <div><span className={`primary-thread-channel ${selected.channel.toLowerCase()}`}>{selected.channel.slice(0, 1)}</span><div><h2>{selected.person}</h2><p>{selected.context}{selected.pupil ? ` · ${selected.pupil}` : ""}</p></div></div>
            <em className={`primary-conversation-state ${selected.state.toLowerCase().replaceAll(" ", "-")}`}>{selected.state}</em>
          </header>

          <div className="primary-conversation-messages">
            {selected.messages.map((message, index) => <div className={message.from === "School" ? "school" : "contact"} key={`${message.time}-${index}`}><span>{message.from === "School" ? "School" : selected.person}</span><p>{message.text}</p><small>{message.time}</small></div>)}
          </div>

          <div className="primary-conversation-context">
            {selected.pupil && <Link href="/headmaster/pupils">Open pupil</Link>}
            {selected.channel === "Teacher" && <Link href="/headmaster/teachers">Open teacher</Link>}
            {selected.context.toLowerCase().includes("attendance") && <Link href="/headmaster/attendance">Attendance</Link>}
            {selected.context.toLowerCase().includes("report") && <Link href="/headmaster/results">Reports</Link>}
          </div>

          <label className="primary-reply-box">Reply<textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a Primary School reply..." /></label>
          <button className="primary-send-reply" onClick={sendReply}>Queue reply</button>
        </aside>
      </section>

      <section className="primary-communication-lower-grid">
        <article className="headmaster-module-card primary-compose-card">
          <header><div><h2>Compose announcement</h2><p>Prepare a Primary School announcement or targeted message.</p></div></header>
          <label>Audience<select value={composeAudience} onChange={(e) => setComposeAudience(e.target.value)}><option>Primary School Guardians</option><option>Primary School Teachers</option><option>Primary 1 Guardians</option><option>Primary 2 Guardians</option><option>Primary 3 Guardians</option><option>Primary 4 Guardians</option><option>Primary 5 Guardians</option><option>Primary 6 Guardians</option></select></label>
          <label>Title<input value={composeTitle} onChange={(e) => setComposeTitle(e.target.value)} placeholder="Message title" /></label>
          <label>Message<textarea value={composeBody} onChange={(e) => setComposeBody(e.target.value)} placeholder="Write announcement or notice..." /></label>
          <button onClick={queueAnnouncement}>Queue announcement</button>
          <p>Prototype only: this does not send SMS, WhatsApp, email or push notifications.</p>
        </article>

        <article className="headmaster-module-card primary-template-card">
          <header><div><h2>Quick templates</h2><p>Use a consistent starting point, then edit before sending.</p></div></header>
          <div>{templates.map((template) => <button key={template.title} onClick={() => useTemplate(template.body, template.title)}><strong>{template.title}</strong><span>{template.body}</span><b>Use template →</b></button>)}</div>
        </article>
      </section>

      <section className="primary-communication-lower-grid">
        <article className="headmaster-module-card primary-communication-followups">
          <header><div><h2>Communication follow-ups</h2><p>Items generated by other Primary leadership workflows.</p></div></header>
          <div>{followUps.map((item) => {
            const resolved = resolvedFollowUps.includes(item.id);
            return <div className={resolved ? "resolved" : ""} key={item.id}><div><span>{item.source}</span><strong>{item.title}</strong><small>{item.audience} · Due {item.due}</small></div><div><Link href={item.href}>Open source</Link><button onClick={() => toggleFollowUp(item.id)}>{resolved ? "Reopen" : "Mark complete"}</button></div></div>;
          })}</div>
        </article>

        <article className="headmaster-module-card primary-communication-ai">
          <span className="page-kicker">HEADMASTER AI · COMMUNICATION BRIEF</span>
          <h2>Three follow-ups should happen before a general announcement</h2>
          <p>The prototype currently shows more value in targeted communication: Primary 3 attendance, Primary 3 literacy support and the Monday timetable conflict each have a known recipient and clear context.</p>
          <div><span>Priority audience</span><strong>Primary 3 guardian + teacher</strong></div>
          <div><span>Operational follow-up</span><strong>Timetable conflict</strong></div>
          <div><span>Recommended tone</span><strong>Specific and supportive</strong></div>
          <Link href="/headmaster/ai">Ask Headmaster AI</Link>
        </article>
      </section>

      {notice && <div className="primary-communication-notice">{notice}</div>}
    </main>
  );
}
