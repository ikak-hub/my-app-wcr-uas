import { useRef, useState } from "react";
import "./account.css";
import { LogoMark } from "./LogoMark";

function AccountIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a3 3 0 110 6 3 3 0 010-6zm0 14a8 8 0 01-6.4-3.2c.03-2.12 4.27-3.3 6.4-3.3 2.13 0 6.37 1.18 6.4 3.3A8 8 0 0112 21z" />
    </svg>
  );
}

function MenuButton({ onClick }: { onClick?: () => void }) {
  return (
    <button className="dashboard__menu" type="button" aria-label="Menu" onClick={onClick}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

const SIDE_MENU = [
  { key: "account", label: "ACCOUNT CENTRE" },
  { key: "toko", label: "TOKO SAYA" },
  { key: "pendapatan", label: "PENDAPATAN" },
  { key: "logout", label: "LOGOUT" },
];

function SideMenu({ open, onClose, onBack, onLogout, onOpenPendapatan }: { open: boolean; onClose: () => void; onBack?: () => void; onLogout?: () => void; onOpenPendapatan?: () => void }) {
  return (
    <>
      <div
        className={`dashboard__sidebar-overlay${open ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`dashboard__sidebar${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="dashboard__sidebar-brand">
          <LogoMark />
          <span className="dashboard__sidebar-brand-text">WardrobeCostumRental</span>
        </div>
        <div className="dashboard__profile">
          <div className="dashboard__profile-avatar" aria-hidden="true">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="#0094f6">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a3 3 0 110 6 3 3 0 010-6zm0 14a8 8 0 01-6.4-3.2c.03-2.12 4.27-3.3 6.4-3.3 2.13 0 6.37 1.18 6.4 3.3A8 8 0 0112 21z" />
            </svg>
          </div>
          <div className="dashboard__profile-info">
            <p className="dashboard__profile-name">WarCosRent Jakarta</p>
            <p className="dashboard__profile-meta">+62 812-3456-7890</p>
            <p className="dashboard__profile-meta">warcosrent.jkt@gmail.com</p>
          </div>
        </div>
        <ul className="dashboard__sidebar-list">
          {SIDE_MENU.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                className="dashboard__sidebar-item"
                onClick={() => {
                  if (item.key === "logout") { onLogout?.(); onClose(); return; }
                  if (item.key === "pendapatan") { onOpenPendapatan?.(); onClose(); return; }
                  if (item.key !== "account") onBack?.();
                  onClose();
                }}
              >
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

type Field = {
  key: "storeName" | "description" | "phone" | "email";
  label: string;
  type?: string;
};

const FIELDS: Field[] = [
  { key: "storeName", label: "NAMA TOKO" },
  { key: "description", label: "DESKRIPSI TOKO" },
  { key: "phone", label: "NO. HANDPHONE", type: "tel" },
  { key: "email", label: "EMAIL", type: "email" },
];

export default function AccountSettings({ onBack, onLogout, onOpenPesanan, onOpenPendapatan }: { onBack?: () => void; onLogout?: () => void; onOpenPesanan?: (mode: "orders" | "delivery" | "refund" | "deposit") => void; onOpenPendapatan?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [values, setValues] = useState({
    storeName: "WarCosRent Jakarta",
    description: "Sewa pakaian formal & kostum",
    phone: "0896532216",
    email: "warcosrent.jkt@gmail.com",
  });
  const [editing, setEditing] = useState<Field["key"] | null>(null);
  const [avatar, setAvatar] = useState<string>(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  return (
    <div className="dashboard-page">
      <header className="navbar dashboard__navbar">
        <MenuButton onClick={() => setMenuOpen((v) => !v)} />
        <AccountIcon />
      </header>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onBack={onBack} onLogout={onLogout} onOpenPendapatan={onOpenPendapatan} />

      <main className="account__body">
        <div className="account__card">
          <div className="account__header">
            <button type="button" className="account__back" onClick={onBack} aria-label="Kembali">
              ‹
            </button>
            <h1 className="account__title">PROFIL TOKO</h1>
            <button type="button" className="account__save" aria-label="Simpan">✓</button>
          </div>

          <section className="account__stats" aria-label="Ringkasan pesanan">
            {([
              { key: "pesanan", mode: "orders", label: "Pesanan", count: 12, icon: "🧾" },
              { key: "pengiriman", mode: "delivery", label: "Pengiriman", count: 4, icon: "🚚" },
              { key: "pengembalian", mode: "refund", label: "Pengembalian", count: 2, icon: "↩️" },
              { key: "deposit", mode: "deposit", label: "Deposit", count: 7, icon: "💰" },
            ] as const).map((s) => (
              <button type="button" key={s.key} className="account__stat" onClick={() => onOpenPesanan?.(s.mode)}>
                <span className="account__stat-icon" aria-hidden="true">{s.icon}</span>
                <span className="account__stat-count">{s.count}</span>
                <span className="account__stat-label">{s.label}</span>
              </button>
            ))}
          </section>

          <div className="account__avatar-wrap">
            <div className="account__avatar">
              <img src={avatar} alt="Foto profil toko" />
            </div>
            <button
              type="button"
              className="account__avatar-edit"
              onClick={() => fileRef.current?.click()}
            >
              Ganti Foto
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              hidden
            />
          </div>

          <ul className="account__list">
            {FIELDS.map((f) => (
              <li className="account__row" key={f.key}>
                <span className="account__row-label">{f.label}</span>
                {editing === f.key ? (
                  <input
                    autoFocus
                    type={f.type ?? "text"}
                    className="account__row-input"
                    value={values[f.key]}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [f.key]: e.target.value }))
                    }
                    onBlur={() => setEditing(null)}
                    onKeyDown={(e) => { if (e.key === "Enter") setEditing(null); }}
                  />
                ) : (
                  <button
                    type="button"
                    className="account__row-value"
                    onClick={() => setEditing(f.key)}
                  >
                    <span>{values[f.key]}</span>
                    <span aria-hidden="true" className="account__row-chevron">›</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
