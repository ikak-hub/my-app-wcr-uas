import "./verifikasi.css";

function AccountIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a3 3 0 110 6 3 3 0 010-6zm0 14a8 8 0 01-6.4-3.2c.03-2.12 4.27-3.3 6.4-3.3 2.13 0 6.37 1.18 6.4 3.3A8 8 0 0112 21z" />
    </svg>
  );
}

function MenuButton() {
  return (
    <button className="verifikasi__menu" type="button" aria-label="Menu">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export default function VerifikasiPending() {
  return (
    <div className="verifikasi-page">
      <header className="navbar verifikasi__navbar">
        <MenuButton />
        <AccountIcon />
      </header>

      <main className="verifikasi__body">
        <div className="verifikasi__banner" role="status">
          <p className="verifikasi__text">
            Verifikasi akun membutuhkan waktu selama 3 hari kerja. Mohon tunggu sampai verfikasi selesai
          </p>
        </div>
      </main>
    </div>
  );
}
