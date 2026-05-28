import { useState } from "react";
import "./kelola.css";
import "./dashboard.css";
import type { Product } from "./products";
import { LogoMark } from "./LogoMark";

const DEFAULT_HERO = "https://images.unsplash.com/photo-1591233378603-68642b2afb25?w=900&q=80";

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

function SideMenu({ open, onClose, onOpenAccount, onLogout, onBack }: { open: boolean; onClose: () => void; onOpenAccount?: () => void; onLogout?: () => void; onBack?: () => void }) {
  const handleClick = (key: string) => {
    if (key === "account") onOpenAccount?.();
    else if (key === "logout") onLogout?.();
    else onBack?.();
    onClose();
  };
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

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function Calendar({ selected, onSelect }: { selected: Set<number>; onSelect: (d: number) => void }) {
  const daysInMonth = 31;
  const startWeekday = 1;
  const cells: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7) cells.push(null);

  return (
    <div className="kelola__calendar">
      <div className="kelola__calendar-head">
        {DAYS.map((d, i) => (
          <span key={i} className="kelola__calendar-day">{d}</span>
        ))}
      </div>
      <div className="kelola__calendar-grid">
        {cells.map((c, i) =>
          c === null ? (
            <span key={i} className="kelola__calendar-cell is-empty" />
          ) : (
            <button
              key={i}
              type="button"
              className={`kelola__calendar-cell${selected.has(c) ? " is-selected" : ""}`}
              onClick={() => onSelect(c)}
            >
              {c}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default function KelolaProduct({ onBack, product, onOpenAccount, onLogout }: { onBack?: () => void; product?: Product; onOpenAccount?: () => void; onLogout?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const initialPrice = product?.price ?? 100000;
  const [name, setName] = useState(product?.name ?? "Kebaya Modern Emerald");
  const [desc, setDesc] = useState(
    product
      ? `${product.name} - cocok untuk ${product.func.toLowerCase()}.\nApa yang didapatkan ketika menyewa?\n1. ${product.name}\n2. Aksesoris pelengkap\n3. Hanger & cover bag`
      : "Kebaya modern dengan payet mewah dan detail unik.\nApa yang didapatkan ketika menyewa?\n1. Kebaya emerald\n2. Rok lilit\n3. Selendang bahu"
  );
  const [size, setSize] = useState("M");
  const [location, setLocation] = useState("Jakarta Selatan");
  const [terms, setTerms] = useState(
    "1. KEBERSIHAN\nPakaian dikembalikan dalam kondisi bersih. Biaya cuci tambahan akan dikenakan jika kotor.\n\n2. KERUSAKAN\nKerusakan ringan dikenakan biaya perbaikan. Kerusakan berat dikenakan biaya penggantian 100% harga produk.\n\n3. KETERLAMBATAN\nKeterlambatan dikenakan denda 25% per hari dari harga sewa.\n\n4. DEPOSIT\nDeposit minimum 50% dari harga sewa, dikembalikan jika produk kembali dalam kondisi baik."
  );
  const [fabric, setFabric] = useState(product?.fabric ?? "Satin & beludru");
  const [price, setPrice] = useState(initialPrice);
  const [deposit, setDeposit] = useState(Math.ceil(initialPrice * 0.5));
  const [rentRange, setRentRange] = useState("11/06/2025 - 13/06/2025");
  const [available, setAvailable] = useState<Set<number>>(new Set([13, 14, 15, 16, 17, 18, 19]));

  const toggle = (d: number) =>
    setAvailable((prev) => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });

  return (
    <div className="dashboard-page">
      <header className="navbar dashboard__navbar">
        <MenuButton onClick={() => setMenuOpen((v) => !v)} />
        <AccountIcon />
      </header>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenAccount={onOpenAccount} onLogout={onLogout} onBack={onBack} />

      <main className="kelola__body">
        <div className="kelola__card">
          <label className="kelola__label">Nama Product</label>
          <input
            className="kelola__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="kelola__hero">
            <img src={product?.src ?? DEFAULT_HERO} alt={name} />
          </div>

          <label className="kelola__label">Deskripsi Product</label>
          <textarea
            className="kelola__textarea"
            rows={6}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <div className="kelola__row">
            <div className="kelola__row-item">
              <label className="kelola__label-inline">Size:</label>
              <div className="kelola__sizes">
                {["S", "M", "L"].map((s) => (
                  <button
                    type="button"
                    key={s}
                    className={`kelola__size${size === s ? " is-active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="kelola__row-item">
              <input
                className="kelola__input kelola__input--inline"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lokasi"
              />
            </div>
          </div>

          <label className="kelola__label">Bahan</label>
          <input
            className="kelola__input"
            value={fabric}
            onChange={(e) => setFabric(e.target.value)}
          />

          <label className="kelola__label">Aturan Peminjaman</label>
          <div className="kelola__terms">
            <p className="kelola__terms-title">HARAP DIPERHATIKAN SEBELUM MENYEWA</p>
            <textarea
              className="kelola__textarea kelola__textarea--terms"
              rows={10}
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
            />
          </div>

          <label className="kelola__label">Harga / hari</label>
          <input
            className="kelola__input"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <label className="kelola__label">
            Deposit <span className="kelola__hint">(minimum 50% dari harga)</span>
          </label>
          <input
            className="kelola__input"
            type="number"
            value={deposit}
            min={Math.ceil(price * 0.5)}
            onChange={(e) => setDeposit(Number(e.target.value))}
          />
          {deposit < Math.ceil(price * 0.5) && (
            <p className="kelola__warning">
              Deposit harus minimum {Math.ceil(price * 0.5).toLocaleString("id-ID")}
            </p>
          )}

          <label className="kelola__label">Rentang Peminjaman</label>
          <input
            className="kelola__input"
            value={rentRange}
            onChange={(e) => setRentRange(e.target.value)}
          />

          <label className="kelola__label">Tanggal Tersedia</label>
          <Calendar selected={available} onSelect={toggle} />

          <div className="kelola__actions">
            {onBack && (
              <button type="button" className="kelola__back" onClick={onBack}>
                Kembali
              </button>
            )}
            <button type="button" className="kelola__save">SIMPAN</button>
          </div>
        </div>
      </main>
    </div>
  );
}
