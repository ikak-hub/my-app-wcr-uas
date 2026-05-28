import { colors } from "../data/styles";

export default function Footer() {
  return (
    <footer style={{ background: colors.primaryDark, color: "#fff", padding: "32px 48px", marginTop: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, maxWidth: 900, margin: "0 auto" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>WCR</div>
          <p style={{ fontSize: 13, opacity: 0.8 }}>
            Wardrobe Custom Rental — Sewa baju adat, pengantin, dan pesta terpercaya di Surabaya.
          </p>
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Navigasi</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13, opacity: 0.8 }}>
            <span>Beranda</span>
            <span>Katalog</span>
            <span>Artikel</span>
            <span>Kontak</span>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Kontak</div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>
            <div>📍 Jl. Raya Darmo No. 45, Surabaya</div>
            <div>📞 (031) 555-1234</div>
            <div>✉️ info@wcr.id</div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 24, fontSize: 12, opacity: 0.6 }}>
        © 2025 WCR — Wardrobe Custom Rental. All rights reserved.
      </div>
    </footer>
  );
}