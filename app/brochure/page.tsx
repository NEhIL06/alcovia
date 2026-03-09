export const metadata = {
  robots: "noindex, nofollow",
};

export default function BrochurePage() {
  return (
    <iframe
      src="/flipbook.html"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
        zIndex: 9999,
      }}
      title="Alcovia Brochure"
    />
  );
}
