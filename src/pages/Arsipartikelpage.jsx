import { useState } from "react";
import { colors, css } from "../data/styles";
import { sampleArticles } from "../data/sampleData";

export default function ArsipArtikelPage({ setPage }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Semua");
  const cats = ["Semua", "Tips", "Tren", "Perawatan", "Info", "Budaya"];

  const filtered = sampleArticles.filter(
    (a) =>
      (cat === "Semua" || a.category === cat) &&
      a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 48px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Arsip Artikel</h1>
      <p style={{ color: colors.gray, marginBottom: 24 }}>Temukan inspirasi dan tips fashion terbaik</p>

      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <input
          style={{ ...css.input, maxWidth: 300 }}
          placeholder="Cari artikel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8 }}>
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                ...css.btn,
                background: cat === c ? colors.primary : "#fff",
                color: cat === c ? "#fff" : colors.gray,
                border: `1px solid ${colors.grayLight}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {filtered.map((a) => (
          <div
            key={a.id}
            style={{ ...css.card, overflow: "hidden", cursor: "pointer" }}
            onClick={() => setPage("detailArtikel")}
          >
            <img src={a.img} alt={a.title} style={{ width: "100%", height: 170, objectFit: "cover" }} />
            <div style={{ padding: 16 }}>
              <span style={css.badge(colors.primary)}>{a.category}</span>
              <div style={{ fontWeight: 600, marginTop: 8, marginBottom: 6, lineHeight: 1.4 }}>{a.title}</div>
              <div style={{ fontSize: 13, color: colors.gray, marginBottom: 8 }}>{a.excerpt}</div>
              <div style={{ fontSize: 12, color: colors.gray }}>{a.date}</div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 48, color: colors.gray }}>
          Tidak ada artikel ditemukan.
        </div>
      )}
    </div>
  );
}