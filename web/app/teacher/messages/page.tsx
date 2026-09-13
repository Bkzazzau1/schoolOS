"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const threads = [
  { id: 1, name: "JSS 2A Guardians", type: "Parent group", preview: "Reminder: assignment closes tomorrow.", time: "9:42 AM", unread: 3 },
  { id: 2, name: "Academic Office", type: "School leadership", preview: "Week 6 lesson-plan review completed.", time: "Yesterday", unread: 0 },
  { id: 3, name: "JSS 2B Guardians", type: "Parent group", preview: "Revision support notice has been shared.", time: "Yesterday", unread: 1 },
  { id: 4, name: "Mathematics Department", type: "Staff channel", preview: "Department meeting moved to Thursday.", time: "Mon", unread: 0 },
];

const seedMessages = [
  { from: "teacher", body: "Good morning. This is a reminder that the JSS 2A linear-equations assignment closes tomorrow at 6:00 PM.", time: "9:18 AM" },
  { from: "guardian", body: "Thank you. Is the revision sheet available inside SchoolOS?", time: "9:31 AM" },
  { from: "teacher", body: "Yes. It is attached to the assignment page and students can access it from their portal.", time: "9:42 AM" },
];

export default function TeacherMessagesPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(seedMessages);
  const [notice, setNotice] = useState("");

  const selected = threads.find((thread) => thread.id === selectedId) ?? threads[0];
  const filteredThreads = useMemo(() => threads.filter((thread) => `${thread.name} ${thread.type} ${thread.preview}`.toLowerCase().includes(query.toLowerCase())), [query]);

  function sendMessage() {
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessages((current) => [...current, { from: "teacher", body: trimmed, time: "Now" }]);
    setMessage("");
    setNotice("Message sent through the school-controlled channel.");
  }

  return (
    <main className="teacher-module-shell">
      <header className="teacher-module-topbar">
        <div>
          <span className="page-kicker">TEACHER PORTAL · CONTROLLED COMMUNICATION</span>
          <h1>Messages</h1>
          <p>Communicate with authorized guardians, staff and school leadership without exposing private contact details.</p>
        </div>
        <div className="module-top-actions">
          <Link href="/teacher/students">Students</Link>
          <Link href="/teacher/classes">My Classes</Link>
          <button className="primary-action" onClick={() => setNotice("New-message composer ready. Choose an approved recipient group below.")}>+ New message</button>
        </div>
      </header>

      <section className="module-stats">
        <article><span>Unread</span><strong>4</strong><small>Across approved channels</small></article>
        <article><span>Guardian groups</span><strong>3</strong><small>Assigned classes only</small></article>
        <article><span>Staff channels</span><strong>2</strong><small>Department + leadership</small></article>
        <article><span>Pending follow-up</span><strong>2</strong><small>Teacher action recommended</small></article>
      </section>

      {notice && <div className="message-notice">{notice}<button onClick={() => setNotice("")}>×</button></div>}

      <section className="messages-layout">
        <aside className="module-panel message-thread-panel">
          <header><div><h2>Conversations</h2><p>Your permitted school communication channels.</p></div></header>
          <input className="message-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search conversations..." />
          <div className="message-thread-list">
            {filteredThreads.map((thread) => (
              <button key={thread.id} onClick={() => { setSelectedId(thread.id); setNotice(""); }} className={`message-thread ${selectedId === thread.id ? "active" : ""}`}>
                <div className="message-avatar">{thread.name.split(" ").map((x) => x[0]).join("").slice(0,2)}</div>
                <div className="message-thread-copy"><strong>{thread.name}</strong><span>{thread.type}</span><small>{thread.preview}</small></div>
                <div className="message-thread-meta"><time>{thread.time}</time>{thread.unread > 0 && <b>{thread.unread}</b>}</div>
              </button>
            ))}
          </div>
        </aside>

        <article className="module-panel chat-panel">
          <header className="chat-header">
            <div><h2>{selected.name}</h2><p>{selected.type} · Authorized SchoolOS channel</p></div>
            <button className="secondary-action" onClick={() => setNotice("Conversation details opened. Personal phone numbers and emails remain hidden.")}>Channel details</button>
          </header>

          <div className="chat-window">
            {messages.map((item, index) => (
              <div key={`${item.time}-${index}`} className={`chat-bubble-row ${item.from === "teacher" ? "mine" : "theirs"}`}>
                <div className="chat-bubble"><p>{item.body}</p><time>{item.time}</time></div>
              </div>
            ))}
          </div>

          <div className="message-compose">
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a professional school message..." />
            <div className="compose-actions">
              <button className="secondary-action" onClick={() => setNotice("Attachment picker would use tenant-scoped Wasabi storage in production.")}>Attach</button>
              <button className="secondary-action" onClick={() => setMessage("Dear guardian, I am sharing a short academic progress update for your child. Please review the latest assignment and revision guidance in SchoolOS.")}>AI draft</button>
              <button className="primary-action" onClick={sendMessage}>Send</button>
            </div>
          </div>
        </article>
      </section>

      <section className="syllabus-bottom-grid">
        <article className="module-panel"><h2>Communication rules</h2><p className="module-copy">Teachers message only approved recipients connected to their classes or school role. Private guardian contact details are not exposed, and communication can be retained in the school audit trail.</p></article>
        <article className="module-panel"><h2>Teacher AI assistance</h2><p className="module-copy">AI can help draft concise progress updates, assignment reminders and revision notices, but the teacher reviews the text before sending.</p><Link className="inline-link" href="/teacher/teacher-ai">Open Teacher AI</Link></article>
      </section>
    </main>
  );
}
