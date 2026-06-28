import { ImageResponse } from "next/og";

export const alt = "Leon Pllana IT-Solutions - Innovation in every Step.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <div style={{ width: "58px", height: "58px", borderRadius: "18px", background: "#0f172a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: 700 }}>LP</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "30px", fontWeight: 700 }}>Leon Pllana IT-Solutions</div>
          <div style={{ fontSize: "18px", color: "#475569", marginTop: "4px" }}>Strategischer Digitalisierungspartner</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
        <div style={{ fontSize: "82px", lineHeight: 0.95, letterSpacing: "-5px", fontWeight: 800 }}>Innovation in every Step.</div>
        <div style={{ marginTop: "30px", fontSize: "28px", lineHeight: 1.35, color: "#334155" }}>Prozessanalyse · IT-Strategie · Cloud · Cyber Security · Automatisierung · KI</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px", color: "#475569" }}>
        <div>Technology follows the process.</div>
        <div>pllana.io</div>
      </div>
    </div>,
    size,
  );
}
