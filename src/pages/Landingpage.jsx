import { colors, css } from "../data/style";
import { sampleProducts, sampleArticles } from "../data/sampleData";

export default function LandingPage({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 60%, ${colors.primaryLight} 100%)`,
          color: "#fff",
          padding: "64px 48px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h1 style={{ fontSize: 42, fontWeight: 700, marginBottom: 16 }}>
            Sewa Baju Istimewa<br />untuk Momen Spesialmu
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32 }}>
            WCR menghadirkan koleksi kebaya, gaun pengantin, dan pakaian adat premium untuk disewa dengan harga terjangkau.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setPage("katalog")}
              style={{ ...css.btn, background: "#fff", color: colors.primary, fontSize: 16, padding: "12px 32px" }}
            >
              Lihat Katalog
            </button>
            <button
              onClick={() => setPage("login")}
              style={{ ...css.btn, background: "transparent", color: "#fff", border: "2px solid #fff", fontSize: 16, padding: "12px 32px" }}
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          background: "#fff",
          padding: "24px 48px",
          display: "flex",
          justifyContent: "center",
          gap: 64,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {[["500+", "Koleksi Pakaian"], ["2.000+", "Pelanggan Puas"], ["50+", "Brand Partner"], ["5★", "Rating Rata-rata"]].map(
          ([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: colors.primary }}>{n}</div>
              <div style={{ fontSize: 13, color: colors.gray }}>{l}</div>
            </div>
          )
        )}
      </div>

      {/* Featured Products */}
      <div style={{ padding: "48px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, color: colors.text }}>Produk Unggulan</h2>
        <p style={{ color: colors.gray, marginBottom: 28 }}>Pilihan terbaik dari koleksi kami</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {sampleProducts.slice(0, 3).map((p) => (
            <div
              key={p.id}
              style={{ ...css.card, overflow: "hidden", cursor: "pointer" }}
              onClick={() => setPage("detailProduk")}
            >
              <img src={p.image} alt={p.name} style={{ width: "100%", height: 200, objectFit: "cover" }} />
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 11, color: colors.primary, fontWeight: 600, marginBottom: 4 }}>{p.category}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: colors.primary, fontWeight: 700 }}>Rp {p.price.toLocaleString()}/hari</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                  <span style={{ color: "#f59e0b" }}>★</span>
                  <span style={{ fontSize: 13 }}>{p.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button
            onClick={() => setPage("katalog")}
            style={{ ...css.btn, ...css.btnPrimary, fontSize: 15, padding: "10px 28px" }}
          >
            Lihat Semua Produk
          </button>
        </div>
      </div>

      {/* Articles */}
      <div style={{ background: colors.light, padding: "48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Artikel Terbaru</h2>
          <p style={{ color: colors.gray, marginBottom: 28 }}>Tips dan inspirasi fashion untuk acara spesialmu</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {sampleArticles.slice(0, 3).map((a) => (
              <div
                key={a.id}
                style={{ ...css.card, overflow: "hidden", cursor: "pointer" }}
                onClick={() => setPage("detailArtikel")}
              >
                <img src={a.img} alt={a.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 11, color: colors.primary, fontWeight: 600, marginBottom: 4 }}>
                    {a.category} · {a.date}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.4 }}>{a.title}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <button
              onClick={() => setPage("arsipArtikel")}
              style={{ ...css.btn, ...css.btnOutline, fontSize: 15, padding: "10px 28px" }}
            >
              Baca Semua Artikel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}