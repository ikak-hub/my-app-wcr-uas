import { colors, css } from "../data/styles";

export default function Navbar({ page, setPage, role, setRole }) {
  const navLinks =
    role === "admin"
      ? [
          ["Dashboard", "dashboard"],
          ["Artikel", "kelolaArtikel"],
          ["Produk", "kelolaProduk"],
          ["Pengguna", "kelolaPengguna"],
          ["Transaksi", "kelolaTransaksi"],
        ]
      : role === "pemilik"
      ? [
          ["Dashboard", "dashboard"],
          ["Produk", "kelolaProduk"],
          ["Transaksi", "kelolaTransaksi"],
        ]
      : [
          ["Beranda", "landing"],
          ["Katalog", "katalog"],
          ["Artikel", "arsipArtikel"],
          ["Transaksi", "historyTransaksi"],
        ];

  return (
    <nav
      style={{
        background: colors.primary,
        color: "#fff",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 20 }}>WCR</span>
        <span style={{ fontSize: 12, opacity: 0.75 }}>Wardrobe Custom Rental</span>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {navLinks.map(([label, p]) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{
              ...css.btn,
              background: page === p ? "rgba(255,255,255,0.2)" : "transparent",
              color: "#fff",
              fontSize: 13,
            }}
          >
            {label}
          </button>
        ))}
        {role ? (
          <button
            onClick={() => { setRole(null); setPage("landing"); }}
            style={{ ...css.btn, background: "rgba(255,255,255,0.15)", color: "#fff", marginLeft: 8, fontSize: 13 }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => setPage("login")}
            style={{ ...css.btn, background: "#fff", color: colors.primary, marginLeft: 8, fontSize: 13 }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}