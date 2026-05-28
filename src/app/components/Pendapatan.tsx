import { useMemo, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import "./dashboard.css";
import "./pendapatan.css";
import { LogoMark } from "./LogoMark";

function MenuButton({ onClick }: { onClick?: () => void }) {
  return (
    <button className="dashboard__menu" type="button" aria-label="Menu" onClick={onClick}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function AccountIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a3 3 0 110 6 3 3 0 010-6zm0 14a8 8 0 01-6.4-3.2c.03-2.12 4.27-3.3 6.4-3.3 2.13 0 6.37 1.18 6.4 3.3A8 8 0 0112 21z" />
    </svg>
  );
}

const SIDE_MENU = [
  { key: "account", label: "ACCOUNT CENTRE" },
  { key: "toko", label: "TOKO SAYA" },
  { key: "pendapatan", label: "PENDAPATAN" },
  { key: "logout", label: "LOGOUT" },
];

function SideMenu({ open, onClose, onOpenAccount, onLogout, onBack }: { open: boolean; onClose: () => void; onOpenAccount?: () => void; onLogout?: () => void; onBack?: () => void }) {
  const handleClick = (key: string) => {
    if (key === "account") onOpenAccount?.();
    else if (key === "logout") onLogout?.();
    else onBack?.();
    onClose();
  };
  return (
    <>
      <div className={`dashboard__sidebar-overlay${open ? " is-open" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside className={`dashboard__sidebar${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="dashboard__sidebar-brand">
          <LogoMark />
          <span className="dashboard__sidebar-brand-text">WardrobeCostumRental</span>
        </div>
        <ul className="dashboard__sidebar-list">
          {SIDE_MENU.map((item) => (
            <li key={item.key}>
              <button type="button" className="dashboard__sidebar-item" onClick={() => handleClick(item.key)}>
                <span>{item.label}</span>
                <span aria-hidden="true">›</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

// Seed a year of daily revenue
function buildDailyData() {
  const out: { date: string; iso: string; amount: number }[] = [];
  const start = new Date("2025-01-01");
  const end = new Date("2025-12-31");
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const month = d.getMonth();
    const seasonal = 1 + 0.4 * Math.sin((month / 12) * Math.PI * 2);
    const base = 200000 + rand() * 600000;
    out.push({
      iso: d.toISOString().slice(0, 10),
      date: d.toISOString().slice(0, 10),
      amount: Math.round(base * seasonal),
    });
  }
  return out;
}

const DAILY = buildDailyData();
const MONTHS_ID = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const fmtIDR = (n: number) => "Rp " + n.toLocaleString("id-ID");

export default function Pendapatan({ onBack, onOpenAccount, onLogout }: { onBack?: () => void; onOpenAccount?: () => void; onLogout?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterMode, setFilterMode] = useState<"range" | "month">("range");
  const [from, setFrom] = useState("2025-01-01");
  const [to, setTo] = useState("2025-06-30");
  const [month, setMonth] = useState("2025-06");

  const { chartData, total, avg, isMonthly } = useMemo(() => {
    if (filterMode === "range") {
      const filtered = DAILY.filter((d) => d.iso >= from && d.iso <= to);
      const days = filtered.length || 1;
      const useMonthly = days > 90;
      const t = filtered.reduce((s, x) => s + x.amount, 0);
      if (useMonthly) {
        const byMonth = new Map<string, number>();
        filtered.forEach((d) => {
          const key = d.iso.slice(0, 7);
          byMonth.set(key, (byMonth.get(key) ?? 0) + d.amount);
        });
        const data = [...byMonth.entries()].map(([k, v]) => ({
          label: `${MONTHS_ID[Number(k.slice(5)) - 1]} ${k.slice(2, 4)}`,
          amount: v,
        }));
        return { chartData: data, total: t, avg: Math.round(t / days), isMonthly: true };
      }
      const data = filtered.map((d) => ({ label: d.iso.slice(5), amount: d.amount }));
      return { chartData: data, total: t, avg: Math.round(t / days), isMonthly: false };
    }
    const filtered = DAILY.filter((d) => d.iso.startsWith(month));
    const t = filtered.reduce((s, x) => s + x.amount, 0);
    const data = filtered.map((d) => ({ label: d.iso.slice(8), amount: d.amount }));
    return { chartData: data, total: t, avg: Math.round(t / (filtered.length || 1)), isMonthly: false };
  }, [filterMode, from, to, month]);

  return (
    <div className="dashboard-page">
      <header className="navbar dashboard__navbar">
        <MenuButton onClick={() => setMenuOpen((v) => !v)} />
        <AccountIcon />
      </header>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenAccount={onOpenAccount} onLogout={onLogout} onBack={onBack} />

      <main className="pendapatan__body">
        <div className="pendapatan__topbar">
          <button type="button" className="pendapatan__back" onClick={onBack}>
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </button>
          <h1 className="pendapatan__title">Pendapatan</h1>
        </div>

        <section className="pendapatan__card">
          <div className="pendapatan__filters">
            <div className="pendapatan__tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={filterMode === "range"}
                className={`pendapatan__tab${filterMode === "range" ? " is-active" : ""}`}
                onClick={() => setFilterMode("range")}
              >
                Rentang Tanggal
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filterMode === "month"}
                className={`pendapatan__tab${filterMode === "month" ? " is-active" : ""}`}
                onClick={() => setFilterMode("month")}
              >
                Bulan
              </button>
            </div>

            {filterMode === "range" ? (
              <div className="pendapatan__inputs">
                <label className="pendapatan__field">
                  <span>Dari</span>
                  <input type="date" value={from} min="2025-01-01" max="2025-12-31" onChange={(e) => setFrom(e.target.value)} />
                </label>
                <label className="pendapatan__field">
                  <span>Sampai</span>
                  <input type="date" value={to} min="2025-01-01" max="2025-12-31" onChange={(e) => setTo(e.target.value)} />
                </label>
              </div>
            ) : (
              <div className="pendapatan__inputs">
                <label className="pendapatan__field">
                  <span>Bulan</span>
                  <input type="month" value={month} min="2025-01" max="2025-12" onChange={(e) => setMonth(e.target.value)} />
                </label>
              </div>
            )}
          </div>

          <div className="pendapatan__summary">
            <div className="pendapatan__metric">
              <span className="pendapatan__metric-label">Total Pendapatan</span>
              <span className="pendapatan__metric-value">{fmtIDR(total)}</span>
            </div>
            <div className="pendapatan__metric">
              <span className="pendapatan__metric-label">Rata-rata Harian</span>
              <span className="pendapatan__metric-value">{fmtIDR(avg)}</span>
            </div>
            <div className="pendapatan__metric">
              <span className="pendapatan__metric-label">Transaksi</span>
              <span className="pendapatan__metric-value">{chartData.length}</span>
            </div>
          </div>

          <div className="pendapatan__chart">
            <ResponsiveContainer width="100%" height={360}>
              {isMonthly ? (
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => "Rp " + (v / 1_000_000).toFixed(1) + "jt"} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => fmtIDR(v)} />
                  <Bar dataKey="amount" fill="#0094f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              ) : (
                <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0094f6" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#0094f6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                  <YAxis tickFormatter={(v) => "Rp " + (v / 1000).toFixed(0) + "k"} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v: number) => fmtIDR(v)} />
                  <Area type="monotone" dataKey="amount" stroke="#0094f6" strokeWidth={2} fill="url(#rev)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
