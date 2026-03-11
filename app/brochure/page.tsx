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
    </div>
  );
}
