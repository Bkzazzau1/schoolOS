"use client";

import { useMemo, useState } from "react";
import SchoolLifeNav from "../../components/school-life-nav";
import "../school-life.css";

type MediaItem = { id:string; title:string; album:string; audience:string; owner:string; date:string; count:number; visibility:"Internal"|"Parents"|"Public showcase"; consent:string; note:string };
const seed:MediaItem[]=[
  {id:"GAL-001",title:"Inter-House Sports Highlights",album:"Sports Day",audience:"Whole school",owner:"Sports Committee",date:"10 Sep 2026",count:48,visibility:"Parents",consent:"Checked",note:"Approved athletics and team images available to school families."},
  {id:"GAL-002",title:"Early Years Creative Morning",album:"Early Years",audience:"Early Years families",owner:"Mrs. Mary Daniel",date:"9 Sep 2026",count:26,visibility:"Parents",consent:"Checked",note:"Classroom activity images with guardian-visibility controls."},
  {id:"GAL-003",title:"Robotics Showcase",album:"Coding & Robotics",audience:"Whole school",owner:"ICT Department",date:"8 Sep 2026",count:19,visibility:"Public showcase",consent:"Approved media set",note:"Selected showcase images cleared for public school promotion."},
  {id:"GAL-004",title:"Staff Development Workshop",album:"Staff",audience:"Staff only",owner:"Proprietor Office",date:"6 Sep 2026",count:14,visibility:"Internal",consent:"Not applicable",note:"Internal professional-development media."},
];

export default function GalleryPage(){
  const [visibility,setVisibility]=useState("All visibility");
  const [query,setQuery]=useState("");
  const [notice,setNotice]=useState("");
  const visible=useMemo(()=>seed.filter(i=>(visibility==="All visibility"||i.visibility===visibility)&&`${i.title} ${i.album} ${i.owner}`.toLowerCase().includes(query.toLowerCase())),[visibility,query]);
  return <main className="school-life-page">
    <SchoolLifeNav active="gallery" />
    <section className="school-life-scope"><div><strong>Media Gallery</strong><span>Photos, videos and school memories</span></div><p>Store and publish school media by album, audience and consent status. Public showcase content is a separate approval decision from normal parent/internal viewing.</p></section>
    <section className="school-life-stat-grid"><article className="school-life-stat"><span>Albums</span><strong>4</strong><small>Representative UI albums</small></article><article className="school-life-stat"><span>Media items</span><strong>107</strong><small>Photos/videos represented</small></article><article className="school-life-stat"><span>Parent visible</span><strong>74</strong><small>Across approved albums</small></article><article className="school-life-stat"><span>Public showcase</span><strong>19</strong><small>Separately approved</small></article><article className="school-life-stat"><span>Consent review</span><strong>0</strong><small>Current mock set clear</small></article></section>
    <section className="school-life-grid">
      <article className="school-life-card"><div className="school-life-section-head"><div><h2>School media library</h2><p>Albums remain audience-scoped even when they belong to the same school.</p></div><button onClick={()=>setNotice("Upload flow opened locally in the UI prototype. No file has been stored.")}>+ Upload media</button></div><div className="school-life-filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search album, event or owner..."/><select value={visibility} onChange={e=>setVisibility(e.target.value)}><option>All visibility</option><option>Internal</option><option>Parents</option><option>Public showcase</option></select></div>{notice&&<div className="school-life-note" style={{marginBottom:12}}><strong>Prototype only</strong>{notice}</div>}<div className="activity-list">{visible.map(item=><div className="activity-row" key={item.id}><div className="activity-icon">▣</div><div><div className="activity-meta"><span>{item.album}</span><span>{item.visibility}</span><span>{item.audience}</span></div><h3>{item.title}</h3><p>{item.date} · {item.count} media items · {item.owner}</p><p>{item.note}</p><small>Consent: {item.consent}</small></div><span className="activity-status">{item.count}</span></div>)}</div></article>
      <aside className="school-life-sidebar"><article className="school-life-card"><span className="school-life-kicker">MEDIA SAFETY</span><div className="school-life-policy-list"><div><strong>Audience first</strong><small>Internal, parent and public visibility are distinct.</small></div><div><strong>Consent-aware</strong><small>Child media should respect configured guardian/media permissions.</small></div><div><strong>No automatic public posting</strong><small>Public showcase requires explicit approval.</small></div></div></article><article className="school-life-card"><span className="school-life-kicker">PRODUCTION LATER</span><p style={{margin:"6px 0 0",color:"#69768a",fontSize:12,lineHeight:1.65}}>Actual uploads, secure storage, signed URLs, moderation and consent enforcement are not implemented in this UI phase.</p></article></aside>
    </section>
  </main>;
}
