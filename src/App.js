HELLO TEST 777777
import { useState, useEffect, useRef } from "react";
 
const DEFAULT_BRAND = {
  name: "SMANS",
  tagline: "Design by Smans",
  description: "Design by Smans",
  heroImage: "https://i.ibb.co/SDbcfKnB/2-D6-AC718-E342-475-A-89-D3-20-A41-A09-EB44.jpg",
  accentColor: "#ffffff",
  instagram: "https://shopee.tw/product/126270/24345408484/",
  shopeeStore: "https://shopee.tw/product/126270/24345408484/",
};
 
const DEFAULT_SIZES = {
  rows: ["LENGTH (cm)", "CHEST (cm)", "SHOULDER (cm)", "SLEEVE (cm)"],
  cols: ["M", "L", "XL", "2XL"],
  data: {
    "LENGTH (cm)":   { M: 72, L: 75, XL: 78, "2XL": 81 },
    "CHEST (cm)":    { M: 58, L: 60, XL: 63, "2XL": 66 },
    "SHOULDER (cm)": { M: 56, L: 58, XL: 60, "2XL": 62 },
    "SLEEVE (cm)":   { M: 22, L: 23, XL: 24, "2XL": 25 },
  },
};
 
const DEFAULT_PRODUCTS = [
  { id: 1, title: "太空貓TEE", price: "NT$ 880", tag: "NEW DROP", colors: [], img: "https://i.ibb.co/SDbcfKnB/2-D6-AC718-E342-475-A-89-D3-20-A41-A09-EB44.jpg", shopeeUrl: "https://shopee.tw/product/126270/24345408484/" },
  { id: 2, title: "法鬥TEE",   price: "NT$ 880", tag: "NEW DROP", colors: [], img: "https://i.ibb.co/392MJqkN/Chat-GPT-Image-2026-5-23-12-59-05.png",             shopeeUrl: "https://shopee.tw/product/126270/24345408484/" },
];
 
const TAGS = ["BESTSELLER", "NEW DROP", "LIMITED", "SALE", "COMING SOON"];
 
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
 
  .sf-hero-bg { background-size: cover; background-position: center; background-attachment: fixed; }
  .sf-nav-link { font-family:'Bebas Neue',sans-serif; font-size:1rem; letter-spacing:.2em; color:#aaa; cursor:pointer; transition:color .2s; background:none; border:none; }
  .sf-nav-link:hover { color:#fff; }
  .sf-hero-title { font-size:clamp(4rem,14vw,12rem); letter-spacing:.08em; line-height:.92; background:linear-gradient(180deg,#fff 0%,#888 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .sf-btn-primary { font-family:'Bebas Neue',sans-serif; letter-spacing:.2em; font-size:1rem; padding:14px 48px; border:none; cursor:pointer; transition:transform .2s; clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); }
  .sf-btn-primary:hover { transform:scale(1.05); }
  .sf-btn-outline { background:transparent; color:#fff; font-family:'Bebas Neue',sans-serif; letter-spacing:.2em; font-size:.9rem; padding:12px 32px; border:1px solid #444; cursor:pointer; transition:border-color .2s, background .2s, color .2s; clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%); }
  .sf-btn-outline:hover { border-color:#fff; background:#fff; color:#000; }
  .sf-card { background:#111; border:1px solid #1e1e1e; overflow:hidden; transition:border-color .3s,transform .3s; }
  .sf-card:hover { border-color:#444; transform:translateY(-4px); }
  .sf-card-img { width:100%; height:420px; object-fit:cover; display:block; transition:transform .6s; filter:grayscale(15%); }
  .sf-card:hover .sf-card-img { transform:scale(1.03); filter:grayscale(0%); }
  .sf-tag { font-family:'Bebas Neue',sans-serif; font-size:.7rem; letter-spacing:.3em; padding:4px 10px; border:1px solid #333; color:#888; }
  .sf-ticker-inner { display:inline-block; animation:ticker 20s linear infinite; }
  @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .sf-size-table { width:100%; border-collapse:collapse; font-family:'Inter',sans-serif; }
  .sf-size-table th { font-family:'Bebas Neue',sans-serif; letter-spacing:.2em; font-size:.95rem; padding:16px 24px; text-align:center; color:#aaa; border-bottom:1px solid #1e1e1e; }
  .sf-size-table td { padding:14px 24px; text-align:center; font-size:.9rem; color:#666; border-bottom:1px solid #111; font-weight:300; }
  .sf-size-table tr:hover td { color:#fff; background:#111; }
  .sf-footer-brand { font-size:clamp(3rem,10vw,8rem); letter-spacing:.06em; line-height:1; background:linear-gradient(180deg,#333 0%,#111 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
 
  .adm-root { display:flex; height:100vh; font-family:'Inter',sans-serif; background:#0d0d0d; color:#e5e5e5; overflow:hidden; }
  .adm-sidebar { width:220px; flex-shrink:0; background:#111; border-right:1px solid #1e1e1e; display:flex; flex-direction:column; padding:24px 0; }
  .adm-logo { font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:.2em; color:#fff; padding:0 24px 24px; border-bottom:1px solid #1e1e1e; margin-bottom:16px; }
  .adm-nav-item { display:flex; align-items:center; gap:10px; padding:11px 24px; font-size:.82rem; letter-spacing:.05em; color:#666; cursor:pointer; transition:all .15s; border:none; background:none; width:100%; text-align:left; }
  .adm-nav-item:hover { color:#fff; background:rgba(255,255,255,.04); }
  .adm-nav-item.active { color:#fff; background:rgba(255,255,255,.08); border-left:2px solid #fff; }
  .adm-content { flex:1; overflow-y:auto; padding:40px; }
  .adm-page-title { font-family:'Bebas Neue',sans-serif; font-size:2rem; letter-spacing:.1em; margin-bottom:32px; color:#fff; }
  .adm-card { background:#161616; border:1px solid #1e1e1e; border-radius:8px; padding:24px; margin-bottom:20px; }
  .adm-card-title { font-size:.7rem; letter-spacing:.25em; color:#555; text-transform:uppercase; margin-bottom:20px; }
  .adm-label { display:block; font-size:.75rem; letter-spacing:.08em; color:#666; margin-bottom:6px; text-transform:uppercase; }
  .adm-input { width:100%; background:#0d0d0d; border:1px solid #222; color:#e5e5e5; padding:10px 14px; font-family:'Inter',sans-serif; font-size:.88rem; outline:none; border-radius:4px; transition:border-color .2s; }
  .adm-input:focus { border-color:#444; }
  .adm-textarea { width:100%; background:#0d0d0d; border:1px solid #222; color:#e5e5e5; padding:10px 14px; font-family:'Inter',sans-serif; font-size:.88rem; outline:none; border-radius:4px; resize:vertical; min-height:80px; }
  .adm-select { width:100%; background:#0d0d0d; border:1px solid #222; color:#e5e5e5; padding:10px 14px; font-family:'Inter',sans-serif; font-size:.88rem; outline:none; border-radius:4px; }
  .adm-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .adm-btn-save { background:#fff; color:#000; font-family:'Bebas Neue',sans-serif; letter-spacing:.15em; font-size:.9rem; padding:10px 28px; border:none; cursor:pointer; border-radius:4px; transition:opacity .2s; }
  .adm-btn-save:hover { opacity:.85; }
  .adm-btn-danger { background:transparent; color:#ef4444; font-family:'Inter',sans-serif; font-size:.8rem; padding:8px 16px; border:1px solid #ef444433; cursor:pointer; border-radius:4px; transition:all .2s; }
  .adm-btn-danger:hover { background:#ef444422; border-color:#ef4444; }
  .adm-product-row { display:flex; gap:16px; align-items:center; padding:16px; background:#0d0d0d; border:1px solid #1e1e1e; border-radius:6px; margin-bottom:12px; }
  .adm-product-thumb { width:72px; height:72px; object-fit:cover; border-radius:4px; flex-shrink:0; background:#1e1e1e; }
  .adm-img-preview { width:100%; height:160px; object-fit:cover; border-radius:4px; margin-top:10px; background:#0d0d0d; border:1px solid #1e1e1e; }
  .adm-toast { position:fixed; bottom:32px; right:32px; background:#fff; color:#000; font-family:'Bebas Neue',sans-serif; letter-spacing:.15em; padding:12px 28px; border-radius:4px; font-size:.9rem; z-index:9999; animation:toast-in .3s ease; }
  @keyframes toast-in { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  .adm-size-table-edit { width:100%; border-collapse:collapse; }
  .adm-size-table-edit th { font-size:.75rem; letter-spacing:.1em; color:#555; padding:8px 12px; text-align:center; border-bottom:1px solid #1e1e1e; text-transform:uppercase; }
  .adm-size-table-edit td { padding:6px 8px; }
  .adm-size-input { width:100%; background:#0d0d0d; border:1px solid #222; color:#e5e5e5; padding:7px 10px; font-family:'Inter',sans-serif; font-size:.82rem; outline:none; border-radius:3px; text-align:center; }
  .drop-zone { border:2px dashed #333; border-radius:8px; padding:32px 20px; text-align:center; cursor:pointer; background:#0d0d0d; transition:all .2s; }
  .drop-zone:hover, .drop-zone.dragging { border-color:#fff; background:rgba(255,255,255,.04); }
`;
 
// ── Image Uploader ──────────────────────────────────────────────────────────
function ImageUploader({ value, onChange, label = "圖片" }) {
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef();
  const process = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 3 * 1024 * 1024) { alert("圖片請勿超過 3MB"); return; }
    setBusy(true);
    const r = new FileReader();
    r.onload = (e) => { onChange(e.target.result); setBusy(false); };
    r.readAsDataURL(file);
  };
  return (
    <div>
      <label className="adm-label">{label}</label>
      <div
        className={`drop-zone${dragging ? " dragging" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); process(e.dataTransfer.files[0]); }}
        onClick={() => ref.current.click()}
      >
        <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => process(e.target.files[0])} />
        {busy
          ? <span style={{ fontFamily: "'Inter',sans-serif", fontSize: ".85rem", color: "#666" }}>處理中...</span>
          : <>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>📷</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: ".85rem", color: "#666", marginBottom: 4 }}>拖曳圖片到這裡，或點擊選擇</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: ".72rem", color: "#444" }}>JPG、PNG、WEBP｜最大 3MB</div>
            </>
        }
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "10px 0" }}>
        <div style={{ flex: 1, height: 1, background: "#1e1e1e" }} />
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: ".68rem", color: "#444" }}>或貼上圖片網址</span>
        <div style={{ flex: 1, height: 1, background: "#1e1e1e" }} />
      </div>
      <input className="adm-input" value={value && value.startsWith("data:") ? "" : value || ""} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
      {value && (
        <div style={{ position: "relative", marginTop: 8 }}>
          <img src={value} className="adm-img-preview" alt="preview" onError={(e) => e.target.style.display = "none"} />
          <button onClick={() => onChange("")} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,.7)", border: "1px solid #333", color: "#fff", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}>×</button>
          {value.startsWith("data:") && <div style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(0,0,0,.7)", borderRadius: 4, padding: "3px 8px", fontFamily: "'Inter',sans-serif", fontSize: ".65rem", color: "#aaa" }}>本地圖片</div>}
        </div>
      )}
    </div>
  );
}
 
// ── STOREFRONT ──────────────────────────────────────────────────────────────
function Storefront({ brand, products, sizes }) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const goShopee = (url) => window.open(url || brand.shopeeStore, "_blank");
 
  return (
    <div style={{ fontFamily: "'Bebas Neue','Arial Black',sans-serif", background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(10,10,10,0.95)" : "transparent", borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent", transition: "all .4s", backdropFilter: scrolled ? "blur(12px)" : "none" }}>
        <span style={{ fontSize: "1.1rem", letterSpacing: ".25em" }}>{brand.name}</span>
        <div style={{ display: "flex", gap: 28 }}>
          {["DROP", "ABOUT", "SIZE", "CONTACT"].map((l) => (
            <button key={l} className="sf-nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
          ))}
        </div>
      </nav>
 
      {/* TICKER */}
      <div style={{ background: "#fff", color: "#000", fontFamily: "'Bebas Neue',sans-serif", fontSize: ".85rem", letterSpacing: ".25em", padding: "10px 0", whiteSpace: "nowrap", overflow: "hidden" }}>
        <div className="sf-ticker-inner">
          {Array(6).fill(`★ ${brand.name} — NEW DROP 2026 — LIMITED EDITION — OVERSIZED — STREETWEAR — TOKYO × SEOUL `).join("")}
        </div>
      </div>
 
      {/* HERO */}
      <section className="sf-hero-bg" style={{ backgroundImage: `url('${brand.heroImage}')`, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0 6vw", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,0,0,.85) 0%,rgba(0,0,0,.3) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, letterSpacing: ".35em", fontSize: ".75rem", color: "#888", marginBottom: 24, textTransform: "uppercase" }}>2026 SPRING / SUMMER COLLECTION</p>
          <h1 className="sf-hero-title" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 1s ease .2s" }}>
            {brand.name.split(" ").map((w, i) => <span key={i}>{w}<br /></span>)}
          </h1>
          <div style={{ width: 40, height: 1, background: "#333", margin: "32px 0" }} />
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, color: "#aaa", fontSize: ".9rem", letterSpacing: ".05em", marginBottom: 40, maxWidth: 420, lineHeight: 1.8 }}>{brand.tagline}</p>
          <button className="sf-btn-primary" style={{ background: brand.accentColor, color: brand.accentColor === "#ffffff" ? "#000" : "#fff" }} onClick={() => scrollTo("drop")}>
            SHOP THE DROP
          </button>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: .4 }}>
          <div style={{ width: 1, height: 48, background: "#fff" }} />
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: ".6rem", letterSpacing: ".3em" }}>SCROLL</span>
        </div>
      </section>
 
      {/* PRODUCTS */}
      <section id="drop" style={{ padding: "100px 6vw" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 64, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: ".65rem", letterSpacing: ".4em", color: "#555", textTransform: "uppercase", marginBottom: 12 }}>SS26 COLLECTION</p>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: ".06em", lineHeight: 1 }}>NEW DROP</h2>
          </div>
          <button className="sf-btn-outline" onClick={() => goShopee(brand.shopeeStore)}>VIEW ALL ON SHOPEE</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {products.map((item) => (
            <div key={item.id} className="sf-card">
              <div style={{ overflow: "hidden", position: "relative" }}>
                <img src={item.img} alt={item.title} className="sf-card-img" />
                <div style={{ position: "absolute", top: 16, left: 16 }}><span className="sf-tag">{item.tag}</span></div>
              </div>
              <div style={{ padding: "24px 24px 28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <h3 style={{ fontSize: "1.2rem", letterSpacing: ".06em", lineHeight: 1.2 }}>{item.title}</h3>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: ".9rem", color: "#888", whiteSpace: "nowrap", marginLeft: 12 }}>{item.price}</span>
                </div>
                {item.colors?.length > 0 && (
                  <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                    {item.colors.map((c, ci) => <div key={ci} style={{ width: 14, height: 14, borderRadius: "50%", background: c, border: "1px solid #333" }} />)}
                  </div>
                )}
                <button className="sf-btn-outline" style={{ width: "100%", textAlign: "center" }} onClick={() => goShopee(item.shopeeUrl)}>
                  🛒 前往蝦皮購買
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 6vw", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
          <div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: ".65rem", letterSpacing: ".4em", color: "#555", textTransform: "uppercase", marginBottom: 16 }}>EST. 2022 — TAIWAN</p>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: ".06em", lineHeight: 1, marginBottom: 32 }}>ABOUT<br />THE BRAND</h2>
            <div style={{ width: 40, height: 1, background: "#333" }} />
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, color: "#666", lineHeight: 2, fontSize: ".95rem" }}>{brand.description}</p>
        </div>
      </section>
 
      {/* SIZE */}
      <section id="size" style={{ padding: "100px 6vw" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: ".65rem", letterSpacing: ".4em", color: "#555", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>FIT GUIDE</p>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: ".06em", lineHeight: 1, marginBottom: 56, textAlign: "center" }}>SIZE CHART</h2>
          <div style={{ border: "1px solid #1e1e1e" }}>
            <table className="sf-size-table">
              <thead><tr><th style={{ textAlign: "left" }}>SIZE</th>{sizes.cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>
                {sizes.rows.map((row) => (
                  <tr key={row}>
                    <td style={{ textAlign: "left", color: "#aaa", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: ".1em" }}>{row}</td>
                    {sizes.cols.map((c) => <td key={c}>{sizes.data[row]?.[c] ?? "—"}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: ".75rem", color: "#444", marginTop: 16, textAlign: "center" }}>All measurements in cm. Oversized fit — size down if preferred.</p>
        </div>
      </section>
 
      {/* FOOTER */}
      <footer id="contact" style={{ padding: "80px 6vw 60px", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 40 }}>
          <div className="sf-footer-brand">{brand.name.split(" ").map((w, i) => <div key={i}>{w}</div>)}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="sf-btn-outline" onClick={() => window.open(brand.instagram, "_blank")}>INSTAGRAM</button>
              <button className="sf-btn-outline" onClick={() => goShopee(brand.shopeeStore)}>SHOPEE</button>
            </div>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: ".7rem", color: "#333", letterSpacing: ".15em" }}>© 2026 {brand.name}. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
 
// ── ADMIN: Brand ────────────────────────────────────────────────────────────
function AdminBrand({ brand, setBrand, showToast }) {
  const [local, setLocal] = useState({ ...brand });
  const set = (k, v) => setLocal((p) => ({ ...p, [k]: v }));
  const save = () => {
    try { localStorage.setItem("ba_brand", JSON.stringify(local)); } catch {}
    setBrand(local);
    showToast("品牌設定已儲存！");
  };
  return (
    <div>
      <div className="adm-page-title">品牌設定</div>
      <div className="adm-card">
        <div className="adm-card-title">基本資訊</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label className="adm-label">品牌名稱</label><input className="adm-input" value={local.name} onChange={(e) => set("name", e.target.value)} /></div>
          <div><label className="adm-label">Hero 標語</label><input className="adm-input" value={local.tagline} onChange={(e) => set("tagline", e.target.value)} /></div>
          <div><label className="adm-label">About 說明</label><textarea className="adm-textarea" value={local.description} onChange={(e) => set("description", e.target.value)} rows={4} /></div>
        </div>
      </div>
      <div className="adm-card">
        <div className="adm-card-title">Hero 背景圖</div>
        <ImageUploader value={local.heroImage} onChange={(v) => set("heroImage", v)} label="背景圖片" />
      </div>
      <div className="adm-card">
        <div className="adm-card-title">按鈕顏色</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <input type="color" value={local.accentColor} onChange={(e) => set("accentColor", e.target.value)} style={{ width: 48, height: 48, border: "none", background: "none", cursor: "pointer", padding: 0 }} />
          <input className="adm-input" value={local.accentColor} onChange={(e) => set("accentColor", e.target.value)} style={{ maxWidth: 140 }} />
          <div style={{ width: 120, height: 40, background: local.accentColor, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: ".15em", fontSize: ".85rem", color: local.accentColor === "#ffffff" ? "#000" : "#fff" }}>PREVIEW</div>
        </div>
      </div>
      <div className="adm-card">
        <div className="adm-card-title">連結設定</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label className="adm-label">蝦皮店首頁 URL</label><input className="adm-input" value={local.shopeeStore} onChange={(e) => set("shopeeStore", e.target.value)} placeholder="https://shopee.tw/yourstore" /></div>
          <div><label className="adm-label">Instagram URL</label><input className="adm-input" value={local.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="https://instagram.com/youraccount" /></div>
        </div>
      </div>
      <button className="adm-btn-save" onClick={save}>SAVE</button>
    </div>
  );
}
 
// ── ADMIN: Products ─────────────────────────────────────────────────────────
function AdminProducts({ products, setProducts, showToast }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(null);
  const [newColor, setNewColor] = useState("#ffffff");
 
  const openEdit = (p) => { setForm({ ...p, colors: [...(p.colors || [])] }); setEditing(p.id); };
  const openNew = () => { setForm({ id: Date.now(), title: "NEW PRODUCT", price: "NT$ 0", tag: "NEW DROP", colors: [], img: "", shopeeUrl: "" }); setEditing("new"); };
  const setF = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const save = () => {
    let newProducts;
    if (editing === "new") {
      newProducts = [...products, form];
    } else {
      newProducts = products.map((p) => p.id === editing ? form : p);
    }
    try { localStorage.setItem("ba_products", JSON.stringify(newProducts)); } catch {}
    setProducts(newProducts);
    setEditing(null); setForm(null); showToast("商品已儲存！");
  };
  const del = (id) => {
    const newProducts = products.filter((p) => p.id !== id);
    try { localStorage.setItem("ba_products", JSON.stringify(newProducts)); } catch {}
    setProducts(newProducts);
    showToast("商品已刪除。");
  };
 
  if (editing !== null && form) return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <button onClick={() => { setEditing(null); setForm(null); }} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: ".85rem" }}>← 返回</button>
        <div className="adm-page-title" style={{ margin: 0 }}>{editing === "new" ? "新增商品" : "編輯商品"}</div>
      </div>
      <div className="adm-card">
        <div className="adm-card-title">基本資訊</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><label className="adm-label">商品名稱</label><input className="adm-input" value={form.title} onChange={(e) => setF("title", e.target.value)} /></div>
          <div className="adm-grid2">
            <div><label className="adm-label">售價</label><input className="adm-input" value={form.price} onChange={(e) => setF("price", e.target.value)} placeholder="NT$ 1,280" /></div>
            <div><label className="adm-label">標籤</label><select className="adm-select" value={form.tag} onChange={(e) => setF("tag", e.target.value)}>{TAGS.map((t) => <option key={t}>{t}</option>)}</select></div>
          </div>
        </div>
      </div>
      <div className="adm-card">
        <div className="adm-card-title">商品圖片</div>
        <ImageUploader value={form.img || ""} onChange={(v) => setF("img", v)} label="商品主圖" />
      </div>
      <div className="adm-card">
        <div className="adm-card-title">蝦皮商品連結</div>
        <label className="adm-label">貼上此商品的蝦皮網址，前台「前往蝦皮購買」按鈕會直接跳過去</label>
        <input className="adm-input" value={form.shopeeUrl || ""} onChange={(e) => setF("shopeeUrl", e.target.value)} placeholder="https://shopee.tw/product/..." style={{ marginTop: 8 }} />
        {form.shopeeUrl && (
          <a href={form.shopeeUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 8, fontFamily: "'Inter',sans-serif", fontSize: ".75rem", color: "#f97316" }}>
            ↗ 預覽連結
          </a>
        )}
      </div>
      <div className="adm-card">
        <div className="adm-card-title">顏色</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
          <input type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} style={{ width: 40, height: 40, border: "none", background: "none", cursor: "pointer", padding: 0 }} />
          <input className="adm-input" value={newColor} onChange={(e) => setNewColor(e.target.value)} style={{ maxWidth: 120 }} />
          <button className="adm-btn-save" style={{ padding: "8px 20px" }} onClick={() => { if (!form.colors.includes(newColor)) setF("colors", [...form.colors, newColor]); }}>+ 加入</button>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {form.colors.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: "#111", border: "1px solid #222", borderRadius: 4, padding: "5px 10px" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: c, border: "1px solid #333" }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: ".75rem", color: "#888" }}>{c}</span>
              <button onClick={() => setF("colors", form.colors.filter((x) => x !== c))} style={{ background: "none", border: "none", color: "#555", cursor: "pointer" }}>×</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button className="adm-btn-save" onClick={save}>SAVE</button>
        <button onClick={() => { setEditing(null); setForm(null); }} style={{ background: "none", border: "1px solid #333", color: "#666", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: ".1em", padding: "10px 24px", cursor: "pointer", borderRadius: 4 }}>取消</button>
      </div>
    </div>
  );
 
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div className="adm-page-title" style={{ margin: 0 }}>商品管理</div>
        <button className="adm-btn-save" onClick={openNew}>+ 新增商品</button>
      </div>
      {products.map((p) => (
        <div key={p.id} className="adm-product-row">
          <img src={p.img} className="adm-product-thumb" alt={p.title} onError={(e) => { e.target.style.background = "#1e1e1e"; }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", letterSpacing: ".08em", fontSize: "1.1rem", marginBottom: 4 }}>{p.title}</div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: ".82rem", color: "#888" }}>{p.price}</span>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: ".65rem", letterSpacing: ".2em", color: "#555", border: "1px solid #222", padding: "2px 8px" }}>{p.tag}</span>
              {p.colors?.map((c, i) => <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: c, border: "1px solid #333" }} />)}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="adm-btn-save" style={{ padding: "8px 18px", fontSize: ".78rem" }} onClick={() => openEdit(p)}>編輯</button>
            <button className="adm-btn-danger" onClick={() => del(p.id)}>刪除</button>
          </div>
        </div>
      ))}
    </div>
  );
}
 
// ── ADMIN: Sizes ────────────────────────────────────────────────────────────
function AdminSizes({ sizes, setSizes, showToast }) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(sizes)));
  const setCell = (row, col, val) => setLocal((s) => ({ ...s, data: { ...s.data, [row]: { ...s.data[row], [col]: val } } }));
  const save = () => {
    try { localStorage.setItem("ba_sizes", JSON.stringify(local)); } catch {}
    setSizes(local);
    showToast("尺寸表已儲存！");
  };
  return (
    <div>
      <div className="adm-page-title">尺寸表</div>
      <div className="adm-card">
        <div className="adm-card-title">數據（cm）</div>
        <div style={{ overflowX: "auto" }}>
          <table className="adm-size-table-edit">
            <thead><tr><th style={{ textAlign: "left", minWidth: 140 }}>量測部位</th>{local.cols.map((c) => <th key={c} style={{ minWidth: 80 }}>{c}</th>)}</tr></thead>
            <tbody>
              {local.rows.map((row) => (
                <tr key={row}>
                  <td style={{ fontFamily: "'Inter',sans-serif", fontSize: ".8rem", color: "#888", paddingRight: 12 }}>{row}</td>
                  {local.cols.map((col) => (
                    <td key={col}><input className="adm-size-input" type="number" value={local.data[row]?.[col] ?? ""} onChange={(e) => setCell(row, col, e.target.value === "" ? "" : Number(e.target.value))} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="adm-card">
        <div className="adm-card-title">新增尺寸欄位</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input className="adm-input" placeholder="e.g. 3XL" id="newcol" style={{ maxWidth: 140 }} />
          <button className="adm-btn-save" style={{ padding: "10px 20px" }} onClick={() => {
            const v = document.getElementById("newcol").value.trim();
            if (v && !local.cols.includes(v)) {
              setLocal((s) => ({ ...s, cols: [...s.cols, v], data: Object.fromEntries(s.rows.map((r) => [r, { ...s.data[r], [v]: "" }])) }));
              document.getElementById("newcol").value = "";
            }
          }}>+ 新增</button>
        </div>
      </div>
      <button className="adm-btn-save" onClick={save}>SAVE</button>
    </div>
  );
}
 
// ── ADMIN Shell ─────────────────────────────────────────────────────────────
function Admin({ brand, setBrand, products, setProducts, sizes, setSizes, onPreview }) {
  const [page, setPage] = useState("brand");
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const nav = [
    { id: "brand", label: "品牌設定" },
    { id: "products", label: "商品管理" },
    { id: "sizes", label: "尺寸表" },
  ];
  return (
    <div className="adm-root">
      <aside className="adm-sidebar">
        <div className="adm-logo">⬛ ADMIN</div>
        {nav.map((n) => (
          <button key={n.id} className={`adm-nav-item${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>{n.label}</button>
        ))}
        <div style={{ marginTop: "auto", padding: "0 16px" }}>
          <button className="adm-nav-item" style={{ width: "100%", color: "#888", borderTop: "1px solid #1e1e1e", paddingTop: 20 }} onClick={onPreview}>
            👁 Preview Store
          </button>
        </div>
      </aside>
      <main className="adm-content">
        {page === "brand" && <AdminBrand brand={brand} setBrand={setBrand} showToast={showToast} />}
        {page === "products" && <AdminProducts products={products} setProducts={setProducts} showToast={showToast} />}
        {page === "sizes" && <AdminSizes sizes={sizes} setSizes={setSizes} showToast={showToast} />}
      </main>
      {toast && <div className="adm-toast">{toast}</div>}
    </div>
  );
}
 
// ── localStorage 儲存 ───────────────────────────────────────────────────────
function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
 
// ── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState("admin");
  const [brand, setBrand] = useState(() => load("ba_brand", DEFAULT_BRAND));
  const [products, setProducts] = useState(() => load("ba_products", DEFAULT_PRODUCTS));
  const [sizes, setSizes] = useState(() => load("ba_sizes", DEFAULT_SIZES));
 
  useEffect(() => { save("ba_brand", brand); }, [brand]);
  useEffect(() => { save("ba_products", products); }, [products]);
  useEffect(() => { save("ba_sizes", sizes); }, [sizes]);
 
  // 用網址 #admin 進入後台，#store 回前台
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#admin") setMode("admin");
      else if (window.location.hash === "#store") setMode("store");
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);
 
  return (
    <>
      <style>{CSS}</style>
      {/* 後台隱藏進入：網址後面加 #admin 進入後台，加 #store 回前台 */}
      {mode === "admin" && (
        <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999, display: "flex", background: "#111", border: "1px solid #222", borderRadius: 6, overflow: "hidden", fontFamily: "'Bebas Neue',sans-serif" }}>
          <button onClick={() => { setMode("store"); window.location.hash = ""; }} style={{ padding: "8px 20px", fontSize: ".85rem", letterSpacing: ".15em", background: "transparent", color: "#666", border: "none", cursor: "pointer" }}>
            👁 回前台
          </button>
        </div>
      )}
      {mode === "admin"
        ? <Admin brand={brand} setBrand={setBrand} products={products} setProducts={setProducts} sizes={sizes} setSizes={setSizes} onPreview={() => { setMode("store"); window.location.hash = ""; }} />
        : <Storefront brand={brand} products={products} sizes={sizes} />
      }
    </>
  );
}
 