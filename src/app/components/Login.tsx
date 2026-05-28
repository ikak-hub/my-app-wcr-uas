import "./login.css";
import { LogoMark } from "./LogoMark";

function EnvelopeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7l9 6 9-6M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" stroke="white" strokeWidth="2" />
      <path d="M8 10V7a4 4 0 018 0v3" stroke="white" strokeWidth="2" />
      <circle cx="12" cy="15" r="1.5" fill="white" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 5a3 3 0 110 6 3 3 0 010-6zm0 14a8 8 0 01-6.4-3.2c.03-2.12 4.27-3.3 6.4-3.3 2.13 0 6.37 1.18 6.4 3.3A8 8 0 0112 21z" />
    </svg>
  );
}

export default function Login({ onCreateAccount, onLogin }: { onCreateAccount?: () => void; onLogin?: () => void }) {
  return (
    <div className="login-page">
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

      <main className="login-card">
        <section className="login-card__side login-card__side--left">
          <h1 className="login-card__title">LOGIN</h1>
          <p className="login-card__subtitle">MASUK KE AKUN ANDA</p>

          <form className="login-card__form" onSubmit={(e) => e.preventDefault()}>
            <div className="login-card__field">
              <div className="login-card__field-icon"><EnvelopeIcon /></div>
              <input
                className="login-card__input"
                type="email"
                placeholder="Enter your email"
                aria-label="Email"
              />
            </div>
            <div className="login-card__field">
              <div className="login-card__field-icon"><LockIcon /></div>
              <input
                className="login-card__input"
                type="password"
                placeholder="******************"
                aria-label="Password"
              />
            </div>
          </form>

          <div className="login-card__actions">
            <button className="login-card__btn" type="button" onClick={onLogin}>LOGIN</button>
            <button className="login-card__forgot" type="button">Lupa password</button>
          </div>
        </section>

        <section className="login-card__side login-card__side--right">
          <h2 className="login-card__heading">Apakah Kamu Pemilik Rental?</h2>
          <p className="login-card__desc">
            Mari bergabung bersama kami! Jangkau lebih banyak pelanggan dengan WarCosRent. Gratis tanpa biaya apapun!
          </p>
          <div className="login-card__actions">
            <button className="login-card__btn" type="button" onClick={onCreateAccount}>BUAT AKUN</button>
          </div>
        </section>
      </main>
    </div>
  );
}
