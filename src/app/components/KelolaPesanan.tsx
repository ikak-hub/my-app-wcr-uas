import { useState } from "react";
import "./dashboard.css";
import "./kelolapesanan.css";
import { LogoMark } from "./LogoMark";

export type PesananMode = "orders" | "delivery" | "refund" | "deposit";

type Order = {
  id: string;
  customer: string;
  product: string;
  description: string;
  days: number;
  image: string;
  deposit?: number;
  destination?: string;
  location?: string;
  reason?: string;
};

const ORDERS: Order[] = [
  { id: "PSN-0012", customer: "zulikuy", product: "Kebaya Janggan (Emerald)", description: "Kebaya wisuda elegan dengan nuansa bali", days: 3, image: "https://images.unsplash.com/photo-1591233378603-68642b2afb25?w=600&q=80", deposit: 100000 },
  { id: "PSN-0011", customer: "ayuwidi", product: "Gaun Pesta Maroon", description: "Gaun panjang dengan detail payet", days: 2, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80", deposit: 150000 },
  { id: "PSN-0010", customer: "rinaputri", product: "Toga Wisuda Hitam", description: "Toga lengkap dengan topi & selempang", days: 1, image: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=600&q=80", deposit: 75000 },
];

const DELIVERIES: Order[] = [
  { id: "DLV-1042", customer: "zulikuy", product: "Kebaya Janggan (Emerald)", description: "Kebaya wisuda elegan dengan nuansa bali", days: 3, image: "https://images.unsplash.com/photo-1591233378603-68642b2afb25?w=600&q=80", destination: "Jl. Melati No. 12, RT 03/RW 04", location: "Jakarta Selatan" },
  { id: "DLV-1041", customer: "dewiarum", product: "Kostum Cosplay Anime", description: "Kostum karakter full set", days: 2, image: "https://images.unsplash.com/photo-1613679074971-91fc27180061?w=600&q=80", destination: "Jl. Mawar No. 5", location: "Tangerang" },
];

const REFUNDS: Order[] = [
  { id: "RFD-0303", customer: "zulikuy", product: "Kebaya Janggan (Emerald)", description: "Kebaya wisuda elegan dengan nuansa bali", days: 3, image: "https://images.unsplash.com/photo-1591233378603-68642b2afb25?w=600&q=80", reason: "Ukuran tidak sesuai dengan pesanan." },
  { id: "RFD-0302", customer: "siska", product: "Jas Formal Navy", description: "Jas pria 2-piece dengan dasi", days: 1, image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80", reason: "Bahan ada noda yang tidak hilang." },
];

const DEPOSITS: Order[] = [
  { id: "DEP-2210", customer: "zulikuy", product: "Kebaya Janggan (Emerald)", description: "Kebaya wisuda elegan dengan nuansa bali", days: 3, image: "https://images.unsplash.com/photo-1591233378603-68642b2afb25?w=600&q=80", deposit: 100000 },
  { id: "DEP-2209", customer: "ayuwidi", product: "Gaun Pesta Maroon", description: "Gaun panjang dengan detail payet", days: 2, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80", deposit: 150000 },
];

const TITLES: Record<PesananMode, string> = {
  orders: "Pesanan Selesai",
  delivery: "Pengiriman",
  refund: "Pengembalian",
  deposit: "Deposit",
};

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

export default function KelolaPesanan({ mode, onBack, onOpenAccount, onLogout }: { mode: PesananMode; onBack?: () => void; onOpenAccount?: () => void; onLogout?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const data = mode === "orders" ? ORDERS : mode === "delivery" ? DELIVERIES : mode === "refund" ? REFUNDS : DEPOSITS;
  const [items, setItems] = useState(data);

  const decide = (id: string, approved: boolean) => {
    alert(`${approved ? "Setuju" : "Tolak"} ${id}`);
    setItems((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="dashboard-page">
      <header className="navbar dashboard__navbar">
        <MenuButton onClick={() => setMenuOpen((v) => !v)} />
        <AccountIcon />
      </header>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenAccount={onOpenAccount} onLogout={onLogout} onBack={onBack} />

      <main className="pesanan__body">
        <div className="pesanan__topbar">
          <button type="button" className="pesanan__back" onClick={onBack}>
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </button>
          <h1 className="pesanan__title">{TITLES[mode]}</h1>
        </div>

        <div className="pesanan__list">
          {items.length === 0 && (
            <p className="pesanan__empty">Tidak ada data.</p>
          )}
          {items.map((o) => (
            <article className="pesanan__row" key={o.id}>
              <p className="pesanan__customer">{o.customer}</p>
              <div className="pesanan__card">
                <img className="pesanan__img" src={o.image} alt={o.product} />
                <div className="pesanan__info">
                  <p className="pesanan__product">{o.product}</p>
                  <p className="pesanan__desc">{o.description}</p>
                  <p className="pesanan__meta">Lama menyewa : {o.days} Hari</p>

                  {mode === "orders" && (
                    <p className="pesanan__status">Status : Selesai ✓</p>
                  )}
                  {mode === "delivery" && (
                    <>
                      <p className="pesanan__meta"><strong>No. Pesanan:</strong> {o.id}</p>
                      <p className="pesanan__meta"><strong>Tujuan:</strong> {o.destination}</p>
                      <p className="pesanan__meta"><strong>Lokasi:</strong> {o.location}</p>
                    </>
                  )}
                  {mode === "refund" && (
                    <>
                      <p className="pesanan__meta"><strong>Alasan pelanggan:</strong></p>
                      <p className="pesanan__reason">"{o.reason}"</p>
                    </>
                  )}
                  {mode === "deposit" && (
                    <p className="pesanan__deposit">Keterangan Deposit : {o.deposit?.toLocaleString("id-ID")}</p>
                  )}
                </div>

                {mode === "deposit" && (
                  <div className="pesanan__actions">
                    <button type="button" className="pesanan__btn pesanan__btn--deny" onClick={() => decide(o.id, false)}>Tolak</button>
                    <button type="button" className="pesanan__btn pesanan__btn--ok" onClick={() => decide(o.id, true)}>Setuju</button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
