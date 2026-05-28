import "./regis.css";
import { useState } from "react";
import svgPaths from "../../imports/Login/svg-6uq945hvw0";

function LogoMark() {
  return (
    <div className="navbar__logo" aria-hidden="true">
      <svg width="71" height="69" viewBox="0 0 72.0526 69.9999" fill="none">
        <path d={svgPaths.p14bcec00} fill="#E0C576" stroke="#E2C379" />
      </svg>
      <span className="navbar__logo-text">WCR</span>
    </div>
  );
}

function AccountIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a3 3 0 110 6 3 3 0 010-6zm0 14a8 8 0 01-6.4-3.2c.03-2.12 4.27-3.3 6.4-3.3 2.13 0 6.37 1.18 6.4 3.3A8 8 0 0112 21z" />
    </svg>
  );
}

function CheckCircle({ active }: { active: boolean }) {
  return (
    <svg className="regis-category__check" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" fill={active ? "#0094f6" : "none"} />
      <path d="M7 12.5l3 3 7-7" stroke={active ? "white" : "black"} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FIELDS = [
  { key: "namaToko", label: "NAMA TOKO" },
  { key: "namaAnda", label: "NAMA ANDA" },
  { key: "noKtp", label: "NO KTP" },
  { key: "noTelp", label: "NO.TELP" },
  { key: "instagram", label: "NAMA INSTAGRAM" },
  { key: "alamat", label: "ALAMAT LENGKAP  TOKO" },
  { key: "provinsi", label: "PROVINSI" },
  { key: "kabupaten", label: "KABUPATEN / KOTA" },
  { key: "kecamatan", label: "KECAMATAN" },
  { key: "kodePos", label: "Kode Pos" },
];

export default function RegisPemilikRental({ onSubmit }: { onSubmit?: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <div className="regis-page">
      <header className="navbar">
        <div className="navbar__brand">
          <LogoMark />
          <span className="navbar__title">WardrobeCostumRental</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <AccountIcon />
          <button className="navbar__logout" type="button">Logout</button>
        </div>
      </header>

      <main className="regis-card">
        <h1 className="regis-card__title">REGISTRASI PEMILIK TOKO</h1>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}>
          {FIELDS.map((f) => (
            <div className="regis-field" key={f.key}>
              <label className="regis-field__label" htmlFor={f.key}>{f.label}</label>
              <input id={f.key} className="regis-field__input" type="text" />
            </div>
          ))}

          <div className="regis-category">
            <p className="regis-category__title">KATEGORI BAJU YANG ANDA SEWAKAN (PILIH SATU)</p>
            <div className="regis-category__grid">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  className="regis-category__item"
                  onClick={() => setSelectedCategory(i)}
                  aria-pressed={selectedCategory === i}
                >
                  <CheckCircle active={selectedCategory === i} />
                </button>
              ))}
            </div>
          </div>

          <div className="regis-submit-row">
            <button type="submit" className="regis-submit">SIMPAN DATA</button>
          </div>
        </form>
      </main>
    </div>
  );
}
