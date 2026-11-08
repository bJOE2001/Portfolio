import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — Full-Stack Developer`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090909",
          color: "#f5f5f5",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          border: "1px solid #242424",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 18px",
              borderRadius: "9999px",
              border: "1px solid #262626",
              backgroundColor: "#121212",
              fontSize: "18px",
              color: "#d4d4d4",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: "#10b981",
              }}
            />
            <span>Open for Freelance Projects &amp; Remote Collaboration</span>
          </div>

          <span
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#a3a3a3",
              letterSpacing: "-0.02em",
            }}
          >
            bellyjoe.dev
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "960px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#a3a3a3",
            }}
          >
            FULL-STACK DEVELOPER
          </span>
          <span
            style={{
              fontSize: "74px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.04,
              color: "#ffffff",
            }}
          >
            {profile.name}
          </span>
          <span
            style={{
              fontSize: "30px",
              lineHeight: 1.35,
              color: "#d4d4d4",
              marginTop: "6px",
            }}
          >
            {profile.headline}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #242424",
            paddingTop: "28px",
            fontSize: "19px",
            color: "#a3a3a3",
          }}
        >
          <span>Laravel · Vue.js · Quasar · React · SQL Server · PostgreSQL</span>
          <span>Philippines</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
