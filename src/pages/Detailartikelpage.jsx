import { colors, css } from "../data/styles";
import { sampleArticles } from "../data/sampleData";

export default function DetailArtikelPage({ setPage }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 48px" }}>
      <button onClick={() => setPage("arsipArtikel")} style={{ ...css.btn, ...css.btnOutline, marginBottom: 20, fontSize: 13 }}>
        ← Kembali ke Artikel
      </button>

      <img
        src="https://placehold.co/800x350/1565C0/white?text=Foto+Artikel"
        alt="artikel"
        style={{ width: "100%", borderRadius: 12, marginBottom: 24 }}
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <span style={css.badge(colors.primary)}>Tips</span>
        <span style={{ fontSize: 13, color: colors.gray }}>10 Mei 2025</span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
        Tips Memilih Gaun Pengantin yang Tepat untuk Tubuhmu
      </h1>
      <div style={{ color: colors.gray, fontSize: 14, marginBottom: 24 }}>
        Oleh <strong>Tim WCR</strong>
      </div>

      <div style={{ lineHeight: 1.9, color: colors.text, fontSize: 15 }}>
        <p>
          Memilih gaun pengantin bukan perkara mudah. Setiap wanita memiliki bentuk tubuh yang unik, dan gaun yang tepat
          bisa menonjolkan keindahan tersebut di hari pernikahan.
        </p>
        <p style={{ marginTop: 16 }}>
          Berikut adalah beberapa tips dari para ahli fashion pernikahan WCR yang bisa membantu kamu dalam memilih gaun
          pengantin yang sempurna:
        </p>
        <h3 style={{ marginTop: 24, marginBottom: 8, color: colors.primaryDark }}>1. Kenali Bentuk Tubuhmu</h3>
        <p>
          Sebelum mencoba gaun manapun, penting untuk memahami bentuk tubuhmu terlebih dahulu. Apakah kamu bertubuh
          pear, apple, hourglass, atau rectangle? Masing-masing bentuk tubuh memiliki potongan gaun yang paling
          flattering.
        </p>
        <h3 style={{ marginTop: 24, marginBottom: 8, color: colors.primaryDark }}>2. Sesuaikan dengan Tema Pernikahan</h3>
        <p>
          Gaun pengantin sebaiknya selaras dengan tema dan venue pernikahan. Garden party membutuhkan gaun yang berbeda
          dengan ballroom wedding.
        </p>
        <h3 style={{ marginTop: 24, marginBottom: 8, color: colors.primaryDark }}>3. Pertimbangkan Kenyamanan</h3>
        <p>
          Ingat bahwa kamu akan memakai gaun ini seharian. Pastikan kamu bisa duduk, berjalan, dan bahkan menari dengan
          nyaman di dalamnya.
        </p>
      </div>

      <div style={{ borderTop: `1px solid ${colors.grayLight}`, marginTop: 40, paddingTop: 24 }}>
        <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Artikel Terkait</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {sampleArticles.slice(1, 3).map((a) => (
            <div
              key={a.id}
              style={{ ...css.card, padding: 12, cursor: "pointer", display: "flex", gap: 12 }}
              onClick={() => setPage("detailArtikel")}
            >
              <img src={a.img} alt="" style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 6 }} />
              <div style={{ fontSize: 13, fontWeight: 500 }}>{a.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}