import { ImageResponse } from "next/og";

export const alt = "Edital no Controle — guias visuais e independentes de concursos públicos";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#05070a",
          color: "#f5f7fa",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "76px 84px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg, rgba(255,196,0,0.09), transparent)",
            borderTop: "1px solid rgba(255,196,0,0.45)",
            display: "flex",
            height: 1,
            left: 0,
            position: "absolute",
            top: 46,
            width: "100%",
          }}
        />
        <div
          style={{
            color: "rgba(255,255,255,0.035)",
            display: "flex",
            fontSize: 390,
            fontWeight: 900,
            lineHeight: 1,
            position: "absolute",
            right: -30,
            top: 100,
          }}
        >
          01
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720, position: "relative" }}>
          <div
            style={{
              alignItems: "center",
              color: "#ffc400",
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              marginBottom: 28,
              textTransform: "uppercase",
            }}
          >
            Projeto independente e não oficial
          </div>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 900, letterSpacing: -1, lineHeight: 0.94 }}>
            Edital no Controle
          </div>
          <div style={{ color: "#c8ced6", display: "flex", fontSize: 36, lineHeight: 1.2, marginTop: 24 }}>
            Guias visuais de concursos públicos
          </div>
          <div style={{ background: "#ffc400", display: "flex", height: 6, marginTop: 42, width: 132 }} />
        </div>
        <div
          style={{
            alignItems: "center",
            border: "1px solid rgba(255,196,0,0.4)",
            borderRadius: 6,
            display: "flex",
            height: 330,
            justifyContent: "center",
            position: "relative",
            width: 290,
          }}
        >
          <svg aria-hidden="true" height="270" viewBox="0 0 240 280" width="230">
            <path
              d="M56 33 L91 22 L125 31 L159 29 L189 47 L201 81 L190 111 L215 137 L198 165 L205 196 L176 221 L143 229 L116 255 L82 246 L58 226 L31 205 L38 174 L24 142 L39 111 L36 78 Z"
              fill="rgba(255,196,0,0.04)"
              stroke="#ffc400"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <path
              d="M54 58 L177 208 M43 107 L190 157"
              opacity="0.25"
              stroke="#00a3ff"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
