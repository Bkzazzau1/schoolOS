"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Channel = "In-app" | "SMS" | "WhatsApp" | "Email";
type Topic = "Settling-in" | "Attendance" | "Development" | "Routine" | "Report" | "General";
type ThreadState = "Open" | "Awaiting guardian" | "Awaiting school" | "Resolved";

type GuardianThread = {
  id: string;
  guardian: string;
  child: string;
  childId: string;
  group: string;
  topic: Topic;
  channel: Channel;
  lastMessage: string;
  lastTime: string;
  unread: number;
  state: ThreadState;
  educator: string;
};

type Message = {
  id: string;
  threadId: string;
  sender: "Guardian" | "School";
  author: string;
  text: string;
  time: string;
  read: boolean;
};

const initialThreads: GuardianThread[] = [
  { id: "GT-001", guardian: "Guardian Amina", child: "Child Amina", childId: "EY-C001", group: "Nursery 1", topic: "General", channel: "In-app", lastMessage: "Thank you. We will continue the story activity at home.", lastTime: "Today · 12:05 PM", unread: 0, state: "Resolved", educator: "Mrs. Aisha Musa" },
  { id: "GT-002", guardian: "Guardian Ibrahim", child: "Child Ibrahim", childId: "EY-C002", group: "Nursery 1", topic: "Settling-in", channel: "WhatsApp", lastMessage: "He is also taking longer to settle in the morning at home.", lastTime: "Today · 10:24 AM", unread: 1, state: "Awaiting school", educator: "Mrs. Aisha Musa" },
  { id: "GT-003", guardian: "Guardian David", child: "Child David", childId: "EY-C004", group: "Nursery 2", topic: "Attendance", channel: "SMS", lastMessage: "We received your attendance follow-up and will call after work.", lastTime: "Yesterday · 5:18 PM", unread: 0, state: "Awaiting guardian", educator: "Mrs. Halima Yusuf" },
  { id: "GT-004", guardian: "Guardian Fatima", child: "Child Fatima", childId: "EY-C005", group: "Reception A", topic: "Development", channel: "In-app", lastMessage: "Could you share more about the sound-play activities she enjoys?", lastTime: "Today · 9:42 AM", unread: 1, state: "Awaiting school", educator: "Mrs. Fatima Bello" },
  { id: "GT-005", guardian: "Guardian Yusuf", child: "Child Yusuf", childId: "EY-C006", group: "Reception A", topic: "Attendance", channel: "WhatsApp", lastMessage: "We can meet tomorrow morning before class.", lastTime: "Today · 8:51 AM", unread: 1, state: "Awaiting school", educator: "Mrs. Fatima Bello" },
  { id: "GT-006", guardian: "Guardian Grace", child: "Child Grace", childId: "EY-C007", group: "Reception A", topic: "Report", channel: "Email", lastMessage: "Please let us know when the developmental summary is ready.", lastTime: "Mon · 3:17 PM", unread: 0, state: "Open", educator: "Mrs. Fatima Bello" },
];

const initialMessages: Message[] = [
  { id: "M-201", threadId: "GT-002", sender: "School", author: "Mrs. Aisha Musa", text: "Good morning. We have noticed that Ibrahim is taking a little longer to move from arrival into independent play this week. We are keeping the routine stable and supporting him gently.", time: "Today · 9:36 AM", read: true },
  { id: "M-202", threadId: "GT-002", sender: "Guardian", author: "Guardian Ibrahim", text: "Thank you. He is also taking longer to settle in the morning at home.", time: "Today · 10:24 AM", read: true },
  { id: "M-203", threadId: "GT-004", sender: "School", author: "Mrs. Fatima Bello", text: "Fatima has been engaging confidently with our sound-play and picture-word activities. We are continuing to observe her participation across different contexts.", time: "Yesterday · 2:10 PM", read: true },
  { id: "M-204", threadId: "GT-004", sender: "Guardian", author: "Guardian Fatima", text: "Could you share more about the sound-play activities she enjoys?", time: "Today · 9:42 AM", read: true },
  { id: "M-205", threadId: "GT-005", sender: "School", author: "Head Teacher Office", text: "We would like a short attendance and routine check-in so we can understand the current context before reviewing Yusuf's developmental summary.", time: "Yesterday · 4:22 PM", read: true },
  { id: "M-206", threadId: "GT-005", sender: "Guardian", author: "Guardian Yusuf", text: "We can meet tomorrow morning before class.", time: "Today · 8:51 AM", read: true },
];

const announcements = [
  { id: "ANN-01", title: "Family story week", audience: "All Early Years guardians", channel: "In-app + Email", delivery: "82 / 84 read", status: "Sent" },
  { id: "ANN-02", title: "Reception A developmental report review", audience: "Reception A guardians", channel: "In-app", delivery: "18 / 26 read", status: "Sent" },
  { id: "ANN-03", title: "Friday outdoor activity reminder", audience: "Nursery 1 + Nursery 2", channel: "SMS", delivery: "Draft", status: "Draft" },
];

const engagement = [
  { group: "Nursery 1", readRate: 96, responseRate: 89, openFollowUps: 1 },
  { group: "Nursery 2", readRate: 93, responseRate: 84, openFollowUps: 2 },
  { group: "Reception A", readRate: 88, responseRate: 79, openFollowUps: 4 },
];

const templates = [
  "Settling-in update",
  "Attendance follow-up",
  "Development conversation",
  "Report ready for review",
  "Routine reminder",
];

export default function HeadTeacherGuardiansPage() {
  const [threads, setThreads] = useState(initialThreads);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState("GT-002");
  const [query, setQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("All topics");
  const [stateFilter, setStateFilter] = useState("All states");
  const [reply, setReply] = useState("");
  const [notice, setNotice] = useState("");
  const [composeTitle, setComposeTitle] = useState("");

  const filtered = useMemo(() => threads.filter((thread) => {
    const matchesText = `${thread.guardian} ${thread.child} ${thread.childId} ${thread.group} ${thread.topic}`.toLowerCase().includes(query.toLowerCase());
    const matchesTopic = topicFilter === "All topics" || thread.topic === topicFilter;
    const matchesState = stateFilter === "All states" || thread.state === stateFilter;
    return matchesText && matchesTopic && matchesState;
  }), [threads, query, topicFilter, stateFilter]);

  const selected = threads.find((thread) => thread.id === selectedId) ?? threads[0];
  const selectedMessages = messages.filter((message) => message.threadId === selected.id);
  const unread = threads.reduce((sum, thread) => sum + thread.unread, 0);
  const awaitingSchool = threads.filter((thread) => thread.state === "Awaiting school").length;
  const openThreads = threads.filter((thread) => thread.state !== "Resolved").length;

  function selectThread(id: string) {
    setSelectedId(id);
    setThreads((current) => current.map((thread) => thread.id === id ? { ...thread, unread: 0 } : thread));
    setNotice("");
  }

  function sendReply() {
    const text = reply.trim();
    if (!text) return;
    const message: Message = {
      id: `M-${Date.now()}`,
      threadId: selected.id,
      sender: "School",
      author: "Head Teacher Office",
      text,
      time: "Just now",
      read: false,
    };
    setMessages((current) => [...current, message]);
    setThreads((current) => current.map((thread) => thread.id === selected.id ? { ...thread, lastMessage: text, lastTime: "Just now", state: "Awaiting guardian", unread: 0 } : thread));
    setReply("");
    setNotice("Reply queued in this UI prototype. No real message was sent.");
  }

  function resolveThread() {
    setThreads((current) => current.map((thread) => thread.id === selected.id ? { ...thread, state: thread.state === "Resolved" ? "Open" : "Resolved" } : thread));
    setNotice(selected.state === "Resolved" ? "Conversation reopened locally." : "Conversation marked resolved locally.");
  }

  function useTemplate(template: string) {
    const copy: Record<string, string> = {
      "Settling-in update": "We are keeping the current settling routine stable and will continue observing how the transition develops across the week.",
      "Attendance follow-up": "We are following up on recent attendance so we can understand the context and support a consistent return to routine.",
      "Development conversation": "We would like to share a developmental update based on recent observations and hear what you are seeing at home.",
      "Report ready for review": "Your child's Early Years developmental summary is ready for review. Please let us know if you would like a conversation with the educator.",
      "Routine reminder": "A quick reminder about the current Early Years routine. Please reply if there is any context the educator should know before arrival.",
    };
    setReply(copy[template] ?? "");
  }

  function draftAnnouncement() {
    if (!composeTitle.trim()) return;
    setNotice(`Announcement “${composeTitle.trim()}” saved as a local UI draft.`);
    setComposeTitle("");
  }

  return (
    <main className="headteacher-main early-guardians-page" style={{ maxWidth: 1400, margin: "0 auto" }}>
      <header className="headteacher-topbar">
        <div>
          <span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span>
          <h1>Guardians</h1>
          <p>Coordinate family communication around settling-in, attendance, routines, developmental conversations and reports.</p>
        </div>
        <div className="headteacher-actions">
          <Link href="/headteacher">Dashboard</Link>
          <Link href="/headteacher/attendance">Attendance</Link>
          <Link href="/headteacher/reports">Reports</Link>
        </div>
      </header>

      <section className="headteacher-scope">
        <div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div>
        <p>Early Years family communication only. Messages should remain factual, respectful and limited to authorized child context.</p>
      </section>

      <section className="early-guardian-kpis">
        <article><span>Open conversations</span><strong>{openThreads}</strong><small>Across Early Years</small></article>
        <article><span>Unread</span><strong>{unread}</strong><small>Guardian replies</small></article>
        <article><span>Awaiting school</span><strong>{awaitingSchool}</strong><small>Needs educator / Head Teacher response</small></article>
        <article><span>Guardian read rate</span><strong>92%</strong><small>Current mock cycle</small></article>
        <article><span>Response rate</span><strong>84%</strong><small>Current mock cycle</small></article>
        <article><span>Announcements</span><strong>3</strong><small>2 sent · 1 draft</small></article>
      </section>

      <section className="early-guardian-workspace">
        <article className="headteacher-card early-guardian-inbox">
          <header className="headteacher-section-head">
            <div><h3>Family inbox</h3><p>Search and triage guardian conversations.</p></div>
          </header>
          <div className="early-guardian-filters">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guardian, child, group or topic..." />
            <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
              <option>All topics</option><option>Settling-in</option><option>Attendance</option><option>Development</option><option>Routine</option><option>Report</option><option>General</option>
            </select>
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
              <option>All states</option><option>Open</option><option>Awaiting guardian</option><option>Awaiting school</option><option>Resolved</option>
            </select>
          </div>
          <div className="early-guardian-thread-list">
            {filtered.map((thread) => (
              <button key={thread.id} className={selected.id === thread.id ? "selected" : ""} onClick={() => selectThread(thread.id)}>
                <div className="early-guardian-thread-top"><strong>{thread.guardian}</strong><span>{thread.lastTime}</span></div>
                <small>{thread.child} · {thread.group} · {thread.topic}</small>
                <p>{thread.lastMessage}</p>
                <div className="early-guardian-thread-meta"><em>{thread.channel}</em><b className={`state-${thread.state.toLowerCase().replaceAll(" ", "-")}`}>{thread.state}</b>{thread.unread > 0 && <i>{thread.unread}</i>}</div>
              </button>
            ))}
          </div>
        </article>

        <article className="headteacher-card early-guardian-conversation">
          <div className="early-guardian-conversation-head">
            <div><span className="headteacher-kicker">{selected.topic.toUpperCase()}</span><h2>{selected.guardian}</h2><p>{selected.child} · {selected.childId} · {selected.group}</p></div>
            <div><span>{selected.channel}</span><strong>{selected.state}</strong></div>
          </div>

          <div className="early-guardian-context-strip">
            <Link href="/headteacher/children">Child context</Link>
            <Link href="/headteacher/attendance">Attendance</Link>
            <Link href="/headteacher/observations">Observations</Link>
            <Link href="/headteacher/reports">Reports</Link>
          </div>

          <div className="early-guardian-messages">
            {selectedMessages.length ? selectedMessages.map((message) => (
              <div key={message.id} className={`message-${message.sender.toLowerCase()}`}>
                <span>{message.author} · {message.time}</span>
                <p>{message.text}</p>
                <small>{message.sender === "School" ? (message.read ? "Read" : "Queued") : "Guardian message"}</small>
              </div>
            )) : <div className="early-guardian-empty"><strong>No detailed transcript in this mock thread.</strong><p>Use the summary and related child context to continue the conversation.</p></div>}
          </div>

          <div className="early-guardian-templates">
            <span>QUICK TEMPLATES</span>
            <div>{templates.map((template) => <button key={template} onClick={() => useTemplate(template)}>{template}</button>)}</div>
          </div>

          <div className="early-guardian-reply">
            <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a factual, supportive guardian reply..." />
            <div><button onClick={resolveThread}>{selected.state === "Resolved" ? "Reopen" : "Mark resolved"}</button><button className="primary" onClick={sendReply}>Queue reply</button></div>
          </div>
          {notice && <div className="early-guardian-notice">{notice}</div>}
          <small className="early-guardian-local-note">Prototype only: no SMS, WhatsApp, email or in-app message is actually sent.</small>
        </article>
      </section>

      <section className="early-guardian-lower-grid">
        <article className="headteacher-card">
          <header className="headteacher-section-head"><div><h3>Guardian engagement</h3><p>Communication health by Early Years group.</p></div></header>
          <div className="early-guardian-engagement-list">
            {engagement.map((item) => <div key={item.group}><div><strong>{item.group}</strong><small>{item.openFollowUps} open follow-up{item.openFollowUps === 1 ? "" : "s"}</small></div><span>Read<strong>{item.readRate}%</strong></span><span>Response<strong>{item.responseRate}%</strong></span></div>)}
          </div>
        </article>

        <article className="headteacher-card">
          <header className="headteacher-section-head"><div><h3>Announcements</h3><p>Section-wide family updates.</p></div></header>
          <div className="early-guardian-announcement-list">
            {announcements.map((item) => <div key={item.id}><div><strong>{item.title}</strong><small>{item.audience}</small></div><span>{item.channel}</span><span>{item.delivery}</span><b>{item.status}</b></div>)}
          </div>
          <div className="early-guardian-compose"><input value={composeTitle} onChange={(e) => setComposeTitle(e.target.value)} placeholder="Draft announcement title..." /><button onClick={draftAnnouncement}>Save draft</button></div>
        </article>

        <article className="headteacher-card early-guardian-ai-card">
          <span className="headteacher-kicker">HEAD TEACHER AI · FAMILY ENGAGEMENT</span>
          <h3>Reception A has the highest communication follow-up load</h3>
          <p>Current mock signals combine attendance, settling-in and developmental-report conversations. The useful action is to prioritize unanswered threads and keep messaging factual rather than assuming a family cause.</p>
          <div><span>Open follow-ups</span><strong>4</strong></div>
          <div><span>Read rate</span><strong>88%</strong></div>
          <div><span>Response rate</span><strong>79%</strong></div>
          <Link href="/headteacher/ai">Ask Head Teacher AI</Link>
        </article>
      </section>

      <section className="headteacher-card early-guardian-boundary">
        <span className="headteacher-kicker">FAMILY COMMUNICATION RULE</span>
        <h3>Communicate observed facts, not assumptions about home life</h3>
        <p>Attendance, settling-in or developmental patterns can justify a respectful conversation with a guardian, but they should not be used to infer neglect, family conflict, medical conditions, parenting quality or other private circumstances without evidence and the appropriate safeguarding process.</p>
      </section>
    </main>
  );
}
