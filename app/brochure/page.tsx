export const metadata = {
  robots: "noindex, nofollow",
  title: "Alcovia Brochure | Ambition Building Program",
  description: "Explore the Alcovia brochure - the world's first ambition building program for teenagers."
};

export default function BrochurePage() {
  return (
    <div
      style={{
        marginTop: "65px",
        paddingTop: "16px",
        background: "#0B1120",
        height: "calc(100vh - 65px)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <iframe
        src="/flipbook.html"
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          display: "block",
        }}
        title="Alcovia Brochure"
        allow="fullscreen"
      />
      <a
        href="/Alcovia_Brochure.pdf"
        download="Alcovia_Brochure.pdf"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 20px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)",
          color: "#0C0C0C",
          fontWeight: 700,
          fontSize: "14px",
          textTransform: "uppercase" as const,
          letterSpacing: "0.05em",
          textDecoration: "none",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          transition: "transform 150ms ease",
        }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download PDF
      </a>
    </div>
  );
}
