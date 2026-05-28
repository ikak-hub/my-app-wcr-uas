import { useState } from "react";
import "./dashboard.css";
import { PRODUCTS as INITIAL_PRODUCTS, formatIDR, type Product } from "./products";
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

function SideMenu({ open, onClose, onOpenAccount, onLogout, onOpenPendapatan }: { open: boolean; onClose: () => void; onOpenAccount?: () => void; onLogout?: () => void; onOpenPendapatan?: () => void }) {
  const handleClick = (key: string) => {
    if (key === "account") onOpenAccount?.();
    if (key === "logout") onLogout?.();
    if (key === "pendapatan") onOpenPendapatan?.();
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

function AddProductModal({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (p: Omit<Product, "id">) => void;
}) {
  const [name, setName] = useState("");
  const [func, setFunc] = useState("");
  const [fabric, setFabric] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [src, setSrc] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onSave({
      name,
      func: func || "Acara umum",
      fabric: fabric || "—",
      price: price || 0,
      src: src || "https://images.unsplash.com/photo-1558303522-d7a2bdfdbd82?w=600&q=80",
      alt: name,
    });
  };

  return (
    <div className="dashboard__modal-overlay" onClick={onCancel}>
      <form
        className="dashboard__modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <h2 className="dashboard__modal-title">Tambah Product Baru</h2>
        <label className="dashboard__modal-label">Nama Product</label>
        <input className="dashboard__modal-input" value={name} onChange={(e) => setName(e.target.value)} required />

        <label className="dashboard__modal-label">Fungsi</label>
        <input className="dashboard__modal-input" value={func} onChange={(e) => setFunc(e.target.value)} placeholder="contoh: Pesta / wisuda" />

        <label className="dashboard__modal-label">Bahan</label>
        <input className="dashboard__modal-input" value={fabric} onChange={(e) => setFabric(e.target.value)} placeholder="contoh: Satin & lace" />

        <label className="dashboard__modal-label">Harga / hari (IDR)</label>
        <input className="dashboard__modal-input" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />

        <label className="dashboard__modal-label">URL Gambar (opsional)</label>
        <input className="dashboard__modal-input" value={src} onChange={(e) => setSrc(e.target.value)} placeholder="https://..." />

        <div className="dashboard__modal-actions">
          <button type="button" className="dashboard__modal-cancel" onClick={onCancel}>Batal</button>
          <button type="submit" className="dashboard__modal-save">Tambah</button>
        </div>
      </form>
    </div>
  );
}

export default function Dashboard({ onSelectProduct, onOpenAccount, onLogout, onOpenPendapatan }: { onKelola?: () => void; onSelectProduct?: (p: Product) => void; onOpenAccount?: () => void; onLogout?: () => void; onOpenPendapatan?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [manageMode, setManageMode] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const handleDelete = (id: number) => {
    if (confirm("Hapus produk ini?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAdd = (p: Omit<Product, "id">) => {
    setProducts((prev) => [...prev, { ...p, id: Math.max(0, ...prev.map((x) => x.id)) + 1 }]);
    setAddOpen(false);
  };

  return (
    <div className="dashboard-page">
      <header className="navbar dashboard__navbar">
        <MenuButton onClick={() => setMenuOpen((v) => !v)} />
        <AccountIcon />
      </header>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenAccount={onOpenAccount} onLogout={onLogout} onOpenPendapatan={onOpenPendapatan} />

      <main className="dashboard__body">
        <section className="dashboard__grid" aria-label="Daftar produk">
          {products.map((p) => (
            <article
              className={`dashboard__card${manageMode ? "" : " dashboard__card--clickable"}`}
              key={p.id}
              onClick={() => { if (!manageMode) onSelectProduct?.(p); }}
              role={manageMode ? undefined : "button"}
              tabIndex={manageMode ? undefined : 0}
              onKeyDown={(e) => { if (!manageMode && e.key === "Enter") onSelectProduct?.(p); }}
            >
              {manageMode && (
                <button
                  type="button"
                  className="dashboard__card-delete"
                  aria-label={`Hapus ${p.name}`}
                  onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                >
                  ×
                </button>
              )}
              <div className="dashboard__card-media">
                <img src={p.src} alt={p.alt} className="dashboard__card-img" />
              </div>
              <div className="dashboard__card-info">
                <h3 className="dashboard__card-name">{p.name}</h3>
                <p className="dashboard__card-meta">
                  <span className="dashboard__card-label">Fungsi:</span> {p.func}
                </p>
                <p className="dashboard__card-meta">
                  <span className="dashboard__card-label">Bahan:</span> {p.fabric}
                </p>
                <p className="dashboard__card-price">
                  {formatIDR(p.price)} <span className="dashboard__card-price-unit">/ hari</span>
                </p>
              </div>
            </article>
          ))}

          {manageMode && (
            <button
              type="button"
              className="dashboard__card dashboard__card-add"
              onClick={() => setAddOpen(true)}
              aria-label="Tambah produk"
            >
              <span className="dashboard__card-add-icon" aria-hidden="true">+</span>
              <span className="dashboard__card-add-label">Tambah Produk</span>
            </button>
          )}
        </section>

        <div className="dashboard__actions">
          <button
            type="button"
            className={`dashboard__cta${manageMode ? " dashboard__cta--active" : ""}`}
            onClick={() => setManageMode((v) => !v)}
          >
            {manageMode ? "SELESAI" : "KELOLA PRODUCT"}
          </button>
        </div>
      </main>

      {addOpen && <AddProductModal onCancel={() => setAddOpen(false)} onSave={handleAdd} />}
    </div>
  );
}
