import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  MapPin,
  RefreshCcw,
  Route as RouteIcon,
  Search,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Household Status | EvaTrack" },
      { name: "description", content: "Monitor household safety and prioritize rescue response by area." },
      { property: "og:title", content: "Household Status | EvaTrack" },
      { property: "og:description", content: "Monitor household safety and prioritize rescue response by area." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HouseholdStatus,
});

type Status = "Unsafe" | "Safe" | "Evacuated" | "Unchecked";
type Household = {
  id: number;
  name: string;
  account: string;
  purok: string;
  people: number;
  status: Status;
  location: string;
  note: string;
};

const households: Household[] = [
  { id: 1, name: "Barro Household", account: "Kathleen Barro", purok: "Sitio Pag-utlan", people: 5, status: "Unsafe", location: "55 Pag-utlan Lane", note: "Sitio Pag-utlan, Mambaling" },
  { id: 2, name: "Dela Cruz Household", account: "Marco Dela Cruz", purok: "Purok 1, Sitio Viking", people: 4, status: "Unchecked", location: "Viking Road", note: "Mambaling, Cebu City" },
  { id: 3, name: "Santos Household", account: "Elena Santos", purok: "Purok Banana", people: 6, status: "Safe", location: "Banana Street", note: "Mambaling, Cebu City" },
  { id: 4, name: "Reyes Household", account: "Joel Reyes", purok: "Purok Mangga", people: 3, status: "Evacuated", location: "Mangga Extension", note: "Mambaling, Cebu City" },
  { id: 5, name: "Garcia Household", account: "Rina Garcia", purok: "Sitio Alaska", people: 7, status: "Unchecked", location: "Alaska Road", note: "Mambaling, Cebu City" },
  { id: 6, name: "Mendoza Household", account: "Paolo Mendoza", purok: "Sitio Dawis", people: 2, status: "Unchecked", location: "Dawis Riverside", note: "Mambaling, Cebu City" },
];

const triage = [
  ["Sitio Pag-utlan", 1, 1, 0, 1, 0, "Dispatch focus", "urgent"],
  ["Purok 1, Sitio Viking", 1, 0, 1, 0, 0, "Monitor", "stable"],
  ["Purok Banana", 1, 0, 1, 0, 0, "Monitor", "stable"],
  ["Purok Mangga", 1, 0, 1, 0, 0, "Monitor", "stable"],
  ["Sitio Alaska", 1, 0, 1, 0, 0, "Monitor", "stable"],
  ["Sitio Dawis", 1, 0, 1, 0, 0, "Monitor", "stable"],
  ["Sitio Kadasig", 1, 0, 1, 0, 0, "Monitor", "stable"],
  ["Unassigned", 1, 0, 1, 0, 1, "Check devices", "watch"],
] as const;

function IconButton({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return <button className="icon-button" type="button" aria-label={label} title={label} onClick={onClick}>{children}</button>;
}

function HouseholdStatus() {
  const [search, setSearch] = useState("");
  const [purok, setPurok] = useState("all");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<Household | null>(null);

  const filtered = useMemo(() => households.filter((household) => {
    const matchesSearch = `${household.name} ${household.account} ${household.purok}`.toLowerCase().includes(search.toLowerCase());
    const matchesPurok = purok === "all" || household.purok === purok;
    const matchesStatus = status === "all" || household.status.toLowerCase() === status;
    return matchesSearch && matchesPurok && matchesStatus;
  }), [search, purok, status]);

  return (
    <main className="ops-page">
      <header className="page-header">
        <div>
          <div className="eyebrow">Rescue operations</div>
          <h1>Household Status</h1>
          <p>Live household safety and area priorities</p>
        </div>
        <div className="header-actions">
          <IconButton label="Refresh"><RefreshCcw size={17} /></IconButton>
          <button className="button secondary" type="button"><Download size={16} /> Export</button>
        </div>
      </header>

      <div className="workspace-grid">
        <section className="household-workspace" aria-label="Household rescue list">
          <div className="filter-bar">
            <label className="search-field">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search household or purok" />
            </label>
            <select aria-label="Filter by purok" value={purok} onChange={(event) => setPurok(event.target.value)}>
              <option value="all">All puroks</option>
              {[...new Set(households.map((item) => item.purok))].map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
            <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">All statuses</option>
              <option value="unsafe">Unsafe</option>
              <option value="unchecked">Unchecked</option>
              <option value="safe">Safe</option>
              <option value="evacuated">Evacuated</option>
            </select>
          </div>

          <div className="data-panel">
            <div className="panel-heading"><span>Households</span><span>{filtered.length} records</span></div>
            <div className="table-scroll">
              <table className="household-table">
                <thead><tr><th>Household</th><th>Purok</th><th>People</th><th>Status</th><th>Last location</th><th><span className="sr-only">Action</span></th></tr></thead>
                <tbody>
                  {filtered.map((household) => (
                    <tr className={household.status === "Unsafe" ? "urgent-row" : ""} key={household.id}>
                      <td><strong>{household.name}</strong><small>{household.account}</small></td>
                      <td>{household.purok}</td>
                      <td><span className="people-count"><Users size={14} />{household.people}</span></td>
                      <td><StatusBadge status={household.status} /></td>
                      <td><strong className="location"><MapPin size={14} />{household.location}</strong><small>{household.note}</small></td>
                      <td><button className="button review" type="button" onClick={() => setSelected(household)}>Review</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination"><span>Showing {filtered.length} of {households.length}</span><div><IconButton label="Previous page"><ChevronLeft size={16} /></IconButton><span className="page-number">1</span><IconButton label="Next page"><ChevronRight size={16} /></IconButton></div></div>
          </div>
        </section>

        <aside className="side-panel" aria-label="Household operations summary">
          <section className="summary-section">
            <div className="side-heading"><span>Household summary</span><span>8 total</span></div>
            <div className="summary-grid">
              <Metric label="Unchecked" value="6" tone="neutral" />
              <Metric label="Safe" value="0" tone="safe" />
              <Metric label="Evacuated" value="1" tone="evacuated" />
              <Metric label="Unsafe" value="1" tone="unsafe" />
            </div>
          </section>

          <section className="progress-section">
            <div className="side-heading"><span>Progress</span><span>25% reported</span></div>
            <div className="progress-track"><span className="progress-safe" /><span className="progress-evacuated" /><span className="progress-unsafe" /><span className="progress-unchecked" /></div>
            <div className="progress-legend"><span><i className="safe-dot" />Safe 0%</span><span><i className="evacuated-dot" />Evacuated 13%</span><span><i className="unsafe-dot" />Unsafe 13%</span><span><i className="unchecked-dot" />Unchecked 75%</span></div>
          </section>

          <section className="triage-section">
            <div className="side-heading"><span>Purok triage</span><span>8 areas</span></div>
            <div className="triage-list">
              {triage.map((row) => (
                <article className={`triage-item ${row[7]}`} key={row[0]}>
                  <div className="triage-title"><strong>{row[0]}</strong><span className={`risk-pill ${row[7]}`}>{row[6]}</span></div>
                  <div className="triage-stats"><span><b>{row[1]}</b>Total</span><span><b>{row[2]}</b>Reported</span><span><b>{row[3]}</b>Unchecked</span><span><b>{row[4]}</b>Unsafe</span><span><b>{row[5]}</b>Risk</span></div>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {selected && <ReviewModal household={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return <div className={`metric ${tone}`}><span>{label}</span><strong>{value}</strong></div>;
}

function StatusBadge({ status }: { status: Status }) {
  return <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>;
}

function ReviewModal({ household, onClose }: { household: Household; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="review-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal-header">
          <div><div className="modal-title-row"><h2 id="modal-title">{household.name}</h2><StatusBadge status={household.status} /></div><p>{household.purok} · {household.people} people</p></div>
          <IconButton label="Close review" onClick={onClose}><X size={18} /></IconButton>
        </header>
        <div className="modal-body">
          <div className="section-title"><span>Family members</span><span>{household.people} people</span></div>
          <div className="table-scroll modal-table"><table><thead><tr><th>Member</th><th>Role</th><th>Age</th><th>Rescue needs</th></tr></thead><tbody><tr><td><strong>{household.account}</strong></td><td>Household head</td><td>42</td><td>None recorded</td></tr><tr><td>Household member</td><td>Child</td><td>12</td><td>Minor</td></tr><tr><td>Household member</td><td>Parent</td><td>68</td><td><span className="need-tag">Senior</span></td></tr></tbody></table></div>
          <div className="section-title"><span>Status history</span><span>Active event</span></div>
          <div className="table-scroll modal-table"><table><thead><tr><th>Time</th><th>Status</th><th>Submitted by</th></tr></thead><tbody><tr><td>Sep 17, 11:02 PM</td><td><StatusBadge status={household.status} /></td><td>{household.account}</td></tr></tbody></table></div>
        </div>
        <footer className="modal-footer"><button className="button secondary" type="button"><MapPin size={15} /> Open map</button><button className="button secondary" type="button"><Users size={15} /> Request check</button>{household.status === "Unsafe" && <button className="button danger" type="button"><RouteIcon size={15} /> Create dispatch</button>}</footer>
      </section>
    </div>
  );
}
