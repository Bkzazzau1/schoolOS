"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type TeachingModel = "Class Teacher" | "Subject Teacher" | "Hybrid";
type ClassConfig = { id:string; section:string; className:string; model:TeachingModel; leadTeacher:string; specialistCoverage:string; note:string };

const seed:ClassConfig[]=[
  {id:"TM-001",section:"Early Years",className:"Nursery 1",model:"Class Teacher",leadTeacher:"Mrs. Aisha Musa",specialistCoverage:"Music / movement support",note:"Lead educator owns the group day; assistants and specialists support specific routines or activities."},
  {id:"TM-002",section:"Early Years",className:"Nursery 2",model:"Class Teacher",leadTeacher:"Mrs. Halima Yusuf",specialistCoverage:"Creative / movement support",note:"Group-led Early Years model with room lead plus supporting educators."},
  {id:"TM-003",section:"Early Years",className:"Reception A",model:"Hybrid",leadTeacher:"Mrs. Fatima Bello",specialistCoverage:"Music, PE, early ICT",note:"Lead teacher remains responsible for the group while selected specialists deliver configured sessions."},
  {id:"TM-004",section:"Primary",className:"Primary 1",model:"Class Teacher",leadTeacher:"Mrs. Ruth James",specialistCoverage:"PE, Arabic, ICT",note:"One class teacher handles core subjects; specialists cover configured extras."},
  {id:"TM-005",section:"Primary",className:"Primary 4",model:"Hybrid",leadTeacher:"Mr. David Joseph",specialistCoverage:"ICT, French, PE",note:"Class teacher owns core learning and pastoral responsibility; selected subjects use specialists."},
  {id:"TM-006",section:"Primary",className:"Primary 6",model:"Hybrid",leadTeacher:"Mr. Kabiru Lawal",specialistCoverage:"Science practical, ICT, French, PE",note:"Primary leadership can mix class ownership with subject specialists as pupils progress."},
  {id:"TM-007",section:"Secondary",className:"JSS 2A",model:"Subject Teacher",leadTeacher:"Class Tutor: Mrs. Grace Audu",specialistCoverage:"All subjects assigned separately",note:"Subject teachers teach separate disciplines while the class tutor coordinates pastoral/class responsibility."},
  {id:"TM-008",section:"Secondary",className:"SS 2A",model:"Subject Teacher",leadTeacher:"Class Tutor: Mr. Samuel Ter",specialistCoverage:"All subjects assigned separately",note:"Department/subject structure with a separate class-tutor role."},
];

export default function TeachingModelsPage(){
  const [rows,setRows]=useState(seed);
  const [section,setSection]=useState("All sections");
  const [selectedModel,setSelectedModel]=useState<TeachingModel>("Hybrid");
  const [notice,setNotice]=useState("");
  const visible=useMemo(()=>rows.filter(row=>section==="All sections"||row.section===section),[rows,section]);

  function updateModel(id:string,model:TeachingModel){setRows(current=>current.map(row=>row.id===id?{...row,model}:row));setNotice("Teaching model changed locally in this UI prototype.");}

  const modelInfo:{model:TeachingModel;summary:string;best:string}[]=[
    {model:"Class Teacher",summary:"One main teacher owns most or all subjects for a class or room.",best:"Nursery / Early Years and many Primary schools"},
    {model:"Subject Teacher",summary:"Different teachers are assigned by subject while a tutor may own class coordination.",best:"Secondary and specialist-heavy schools"},
    {model:"Hybrid",summary:"A class teacher owns core learning while specialists teach configured subjects or activities.",best:"Primary, Reception and flexible school structures"},
  ];

  return <main className="school-life-page">
    <SchoolLifeNav active="teaching-models" />
    <section className="school-life-scope"><div><strong>Flexible Teaching Models</strong><span>Class teacher · Subject teacher · Hybrid</span></div><p>SchoolOS must fit the school’s real structure. Nursery and Primary can use one teacher for a class, while specialists or subject teachers can be added only where the school actually uses them.</p></section>

    <section className="school-life-stat-grid">
      <article className="school-life-stat"><span>Class-teacher classes</span><strong>{rows.filter(x=>x.model==="Class Teacher").length}</strong><small>Single lead for core teaching</small></article>
      <article className="school-life-stat"><span>Hybrid classes</span><strong>{rows.filter(x=>x.model==="Hybrid").length}</strong><small>Lead teacher + specialists</small></article>
      <article className="school-life-stat"><span>Subject-teacher classes</span><strong>{rows.filter(x=>x.model==="Subject Teacher").length}</strong><small>Separate subject assignments</small></article>
      <article className="school-life-stat"><span>Early Years rooms</span><strong>3</strong><small>Room/group-led structure</small></article>
      <article className="school-life-stat"><span>Primary overrides</span><strong>2</strong><small>Class-level model overrides</small></article>
    </section>

    <section className="school-life-grid">
      <article className="school-life-card">
        <div className="school-life-section-head"><div><h2>Teaching structure</h2><p>Each section has a normal model, but individual classes may override it.</p></div></div>
        <div className="teaching-model-tabs">{modelInfo.map(item=><button key={item.model} className={selectedModel===item.model?"active":""} onClick={()=>setSelectedModel(item.model)}><strong>{item.model}</strong><small>{item.summary}</small><small>Best fit: {item.best}</small></button>)}</div>
        <div className="school-life-note" style={{marginBottom:14}}><strong>{selectedModel}</strong>{modelInfo.find(x=>x.model===selectedModel)?.summary} This choice changes assignment expectations, not a teacher’s employment status or authority beyond their configured class/subject scope.</div>
        <div className="school-life-filters"><select value={section} onChange={e=>setSection(e.target.value)}><option>All sections</option><option>Early Years</option><option>Primary</option><option>Secondary</option></select></div>
        <div className="teaching-list"><div className="teaching-row heading"><span>Class / room</span><span>Teaching model</span><span>Lead / tutor</span><span>Specialist coverage</span></div>{visible.map(row=><div className="teaching-row" key={row.id}><div><h3>{row.className}</h3><div className="teaching-meta"><span>{row.section}</span><span>{row.id}</span></div><p>{row.note}</p></div><select value={row.model} onChange={e=>updateModel(row.id,e.target.value as TeachingModel)}><option>Class Teacher</option><option>Subject Teacher</option><option>Hybrid</option></select><div><strong style={{fontSize:11}}>{row.leadTeacher}</strong><p>Primary class / pastoral responsibility</p></div><div><strong style={{fontSize:11}}>{row.specialistCoverage}</strong><p>Configured extras only</p></div></div>)}</div>
        {notice&&<p className="school-life-note" style={{marginTop:12}}>{notice}</p>}
      </article>

      <aside className="school-life-sidebar">
        <article className="school-life-card"><div className="school-life-section-head"><div><h3>How assignment changes</h3><p>Different models need different UI behavior.</p></div></div><div className="school-life-policy-list"><div><strong>Class Teacher</strong><small>Assign one lead teacher to the class, then mark which subjects that teacher owns by default.</small></div><div><strong>Subject Teacher</strong><small>Assign each subject to a teacher; class tutor responsibility stays separate.</small></div><div><strong>Hybrid</strong><small>Lead teacher owns core subjects and pastoral/class responsibility; specialists override selected subjects.</small></div></div></article>
        <article className="school-life-card"><div className="school-life-section-head"><div><h3>Early Years structure</h3><p>Do not force Nursery into Secondary-style subject assignment.</p></div></div><div className="school-life-policy-list"><div><strong>Room / Group Lead</strong><small>Owns group planning, routines, observations and family coordination.</small></div><div><strong>Assistant educators</strong><small>Support the room without pretending every activity is a separate subject.</small></div><div><strong>Specialists</strong><small>Music, movement, creative or language sessions can be added where the school uses them.</small></div></div></article>
        <article className="school-life-card"><div className="school-life-section-head"><div><h3>Primary structure</h3><p>Designed for the “one class, one teacher” reality.</p></div></div><div className="school-life-policy-list"><div><strong>Core-subject ownership</strong><small>The class teacher can own English, Mathematics, Basic Science and other configured subjects.</small></div><div><strong>Specialist exceptions</strong><small>ICT, PE, French, Arabic, Music or other subjects can override the default teacher.</small></div><div><strong>Class-level override</strong><small>A school can use Class Teacher in P1–P3 and Hybrid in P4–P6 if desired.</small></div></div></article>
      </aside>
    </section>
  </main>;
}
