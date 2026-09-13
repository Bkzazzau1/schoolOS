"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type RoutineState = "On track" | "Watch" | "Needs attention";
type ExceptionState = "Open" | "Monitoring" | "Resolved";

type Routine = {
  id: string;
  time: string;
  title: string;
  area: string;
  lead: string;
  purpose: string;
  nursery1: RoutineState;
  nursery2: RoutineState;
  reception: RoutineState;
  completion: number;
};

type RoutineException = {
  id: string;
  group: string;
  routine: string;
  title: string;
  detail: string;
  owner: string;
  state: ExceptionState;
  nextAction: string;
};

const routines: Routine[] = [
  { id:"RT-01", time:"7:30–8:10", title:"Arrival & settling", area:"Arrival", lead:"Lead educators", purpose:"Greeting, handoff, belongings, emotional settling and independent entry into play.", nursery1:"On track", nursery2:"On track", reception:"Watch", completion:94 },
  { id:"RT-02", time:"8:10–8:35", title:"Circle time", area:"Group routine", lead:"Class educators", purpose:"Songs, language, daily rhythm, turn-taking and social participation.", nursery1:"On track", nursery2:"On track", reception:"On track", completion:97 },
  { id:"RT-03", time:"8:35–10:00", title:"Learning centres", area:"Play & learning", lead:"Educator teams", purpose:"Guided play, small-group work, observation and choice across developmental domains.", nursery1:"On track", nursery2:"On track", reception:"On track", completion:95 },
  { id:"RT-04", time:"10:00–10:30", title:"Snack & hygiene", area:"Care routine", lead:"Educator teams", purpose:"Handwashing, snack, independence, safe eating routines and social habits.", nursery1:"On track", nursery2:"Watch", reception:"On track", completion:91 },
  { id:"RT-05", time:"10:30–11:10", title:"Outdoor movement", area:"Physical development", lead:"Outdoor duty team", purpose:"Movement, exploration, gross-motor play and supervised outdoor choice.", nursery1:"On track", nursery2:"On track", reception:"On track", completion:96 },
  { id:"RT-06", time:"11:10–11:30", title:"Transition & care", area:"Transition", lead:"Class educators", purpose:"Toileting, handwashing, calm transition and preparation for focused activities.", nursery1:"On track", nursery2:"On track", reception:"Watch", completion:90 },
  { id:"RT-07", time:"11:30–12:20", title:"Focused / small-group activity", area:"Learning", lead:"Class educators", purpose:"Short educator-guided activities linked to weekly plans and observation needs.", nursery1:"On track", nursery2:"On track", reception:"On track", completion:93 },
  { id:"RT-08", time:"12:20–1:00", title:"Lunch, reflection & departure", area:"Departure", lead:"Class educators", purpose:"Meal routine, calm reflection, belongings check and safe guardian handoff.", nursery1:"On track", nursery2:"On track", reception:"Needs attention", completion:86 },
];

const initialExceptions: RoutineException[] = [
  { id:"EX-01", group:"Reception A", routine:"Arrival & settling", title:"Longer settling period for several children", detail:"Educators noted that the normal transition into independent play is taking longer this week.", owner:"Mrs. Fatima Bello", state:"Monitoring", nextAction:"Keep the arrival routine stable and review guardian/educator context before changing the routine." },
  { id:"EX-02", group:"Nursery 2", routine:"Snack & hygiene", title:"Handwashing queue delay", detail:"The group is losing several minutes because children are waiting longer at the handwashing point.", owner:"Mrs. Halima Yusuf", state:"Open", nextAction:"Test staggered handwashing in two smaller groups and review tomorrow." },
  { id:"EX-03", group:"Reception A", routine:"Lunch, reflection & departure", title:"Departure handoff running late", detail:"Family handoff and belongings checks are extending beyond the planned departure window.", owner:"Head Teacher Office", state:"Open", nextAction:"Review staffing position and handoff sequence before changing family collection expectations." },
  { id:"EX-04", group:"Nursery 1", routine:"Outdoor movement", title:"Outdoor area inspection completed", detail:"One play zone was temporarily unavailable during the morning check and has now been cleared.", owner:"Outdoor duty team", state:"Resolved", nextAction:"No further action unless the issue reappears." },
];

const groupHealth = [
  { group:"Nursery 1", stability:97, transitions:96, care:98, open:0 },
  { group:"Nursery 2", stability:93, transitions:92, care:90, open:1 },
  { group:"Reception A", stability:88, transitions:86, care:93, open:2 },
];

export default function HeadTeacherRoutinesPage(){
  const [selectedId,setSelectedId]=useState("RT-08");
  const [exceptions,setExceptions]=useState(initialExceptions);
  const [group,setGroup]=useState("All groups");
  const [note,setNote]=useState("");
  const [notice,setNotice]=useState("");

  const selected=routines.find(item=>item.id===selectedId)??routines[0];
  const activeExceptions=useMemo(()=>exceptions.filter(item=>item.state!=="Resolved"&&(group==="All groups"||item.group===group)),[exceptions,group]);
  const avgCompletion=Math.round(routines.reduce((sum,item)=>sum+item.completion,0)/routines.length);
  const attentionCount=routines.filter(item=>[item.nursery1,item.nursery2,item.reception].includes("Needs attention")).length;

  function updateException(id:string,next:ExceptionState){
    setExceptions(current=>current.map(item=>item.id===id?{...item,state:next}:item));
    setNotice(`${id} moved to ${next} in the UI prototype.`);
  }

  function saveRoutineNote(){
    if(!note.trim())return;
    setNotice(`Head Teacher note saved locally for ${selected.title}.`);
    setNote("");
  }

  const groupState=(item:Routine,name:string)=>name==="Nursery 1"?item.nursery1:name==="Nursery 2"?item.nursery2:item.reception;

  return <main className="headteacher-main early-routines-page" style={{maxWidth:1400,margin:"0 auto"}}>
    <header className="headteacher-topbar">
      <div><span className="headteacher-kicker">HEAD TEACHER · NURSERY / EARLY YEARS</span><h1>Daily Routines</h1><p>See whether arrival, care, play, learning, transitions and departure are running safely and consistently.</p></div>
      <div className="headteacher-actions"><Link href="/headteacher">Dashboard</Link><Link href="/headteacher/attendance">Attendance</Link><Link href="/headteacher/guardians">Guardians</Link></div>
    </header>

    <section className="headteacher-scope"><div><span>ACTIVE SECTION</span><strong>Nursery / Early Years</strong><small>Kaduna Campus · Head Teacher Mrs. Mary Daniel</small></div><p>Routine quality is operational context, not a score of a child or educator. Exceptions should trigger observation and coordination first.</p></section>

    <section className="early-routine-kpis">
      <article><span>Routine completion</span><strong>{avgCompletion}%</strong><small>Across today’s routine blocks</small></article>
      <article><span>Groups on site</span><strong>3</strong><small>Nursery 1, Nursery 2, Reception A</small></article>
      <article><span>Open exceptions</span><strong>{exceptions.filter(x=>x.state!=="Resolved").length}</strong><small>Needs human follow-up</small></article>
      <article><span>Needs attention</span><strong>{attentionCount}</strong><small>Routine blocks with red signal</small></article>
      <article><span>Guardian handoff</span><strong>1</strong><small>Departure process under review</small></article>
      <article><span>Safety closures</span><strong>0</strong><small>No active closure in mock data</small></article>
    </section>

    <section className="early-routine-workspace">
      <article className="headteacher-card early-routine-timeline-card">
        <header className="headteacher-section-head"><div><h3>Today’s routine timeline</h3><p>Select a block to review its purpose and group-level status.</p></div></header>
        <div className="early-routine-timeline">
          {routines.map(item=><button key={item.id} onClick={()=>{setSelectedId(item.id);setNote("");}} className={selected.id===item.id?"selected":""}>
            <span>{item.time}</span><div><strong>{item.title}</strong><small>{item.area} · {item.lead}</small></div><b>{item.completion}%</b>
          </button>)}
        </div>
      </article>

      <aside className="headteacher-card early-routine-detail-card">
        <span className="headteacher-kicker">SELECTED ROUTINE</span>
        <h2>{selected.title}</h2><p className="early-routine-time">{selected.time} · {selected.lead}</p>
        <div className="early-routine-purpose"><span>PURPOSE</span><p>{selected.purpose}</p></div>
        <div className="early-routine-status-grid">
          {["Nursery 1","Nursery 2","Reception A"].map(name=>{const state=groupState(selected,name);return <div key={name}><span>{name}</span><strong className={`routine-state ${state.toLowerCase().replaceAll(" ","-")}`}>{state}</strong></div>})}
        </div>
        <div className="early-routine-detail-links"><Link href="/headteacher/children">Children</Link><Link href="/headteacher/educators">Educators</Link><Link href="/headteacher/observations">Observations</Link></div>
        <label className="early-routine-note">Head Teacher note<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Record factual routine follow-up, staffing context or next action..."/></label>
        <button className="early-routine-save" onClick={saveRoutineNote}>Save local note</button>
        <small>Prototype only: this note is not persisted.</small>
      </aside>
    </section>

    <section className="early-routine-lower-grid">
      <article className="headteacher-card early-routine-health-card">
        <header className="headteacher-section-head"><div><h3>Group routine health</h3><p>Operational stability, transitions and care routines by group.</p></div></header>
        <div className="early-routine-health-table">
          <div className="heading"><span>Group</span><span>Stability</span><span>Transitions</span><span>Care</span><span>Open exceptions</span></div>
          {groupHealth.map(item=><div key={item.group}><strong>{item.group}</strong><span>{item.stability}%</span><span>{item.transitions}%</span><span>{item.care}%</span><b>{item.open}</b></div>)}
        </div>
      </article>

      <article className="headteacher-card early-routine-exception-card">
        <header className="headteacher-section-head"><div><h3>Routine exceptions</h3><p>Items requiring a human review or local operational adjustment.</p></div><select value={group} onChange={e=>setGroup(e.target.value)}><option>All groups</option><option>Nursery 1</option><option>Nursery 2</option><option>Reception A</option></select></header>
        <div className="early-routine-exception-list">
          {activeExceptions.map(item=><div key={item.id}><span className={`exception-state ${item.state.toLowerCase()}`}>{item.state}</span><div><strong>{item.title}</strong><small>{item.group} · {item.routine} · {item.owner}</small><p>{item.detail}</p><b>{item.nextAction}</b><div><button onClick={()=>updateException(item.id,"Monitoring")}>Monitor</button><button onClick={()=>updateException(item.id,"Resolved")}>Resolve locally</button></div></div></div>)}
          {activeExceptions.length===0&&<p className="early-routine-empty">No active exceptions for this filter.</p>}
        </div>
      </article>
    </section>

    {notice&&<div className="early-routine-notice">{notice}</div>}

    <section className="headteacher-card early-routine-ai-card">
      <span className="headteacher-kicker">HEAD TEACHER AI · ROUTINE BRIEF</span>
      <h3>Reception A departure and settling deserve observation before redesign</h3>
      <p>The mock data shows two routine pressures in Reception A, but the AI should not assume a child, educator or guardian is the cause. Review staffing, timing, environment and handoff sequence first.</p>
      <div><Link href="/headteacher/attendance">Check attendance context</Link><Link href="/headteacher/guardians">Review guardian follow-up</Link><Link href="/headteacher/ai">Ask Head Teacher AI</Link></div>
    </section>

    <section className="headteacher-card early-routine-boundary"><span className="headteacher-kicker">EARLY YEARS ROUTINE RULE</span><h3>Routine signals support coordination; they do not diagnose children or judge families</h3><p>Arrival, hygiene, snack, transitions and departure patterns can reveal operational friction. They must not be used to infer medical conditions, family circumstances, developmental diagnoses or blame without appropriate human evidence.</p></section>
  </main>;
}
