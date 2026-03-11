export const metadata = {
  robots: "noindex, nofollow",
  title: "Alcovia Brochure | Ambition Building Program",
  description: "Explore the Alcovia brochure - the world's first ambition building program for teenagers."
};

export default function BrochurePage() {
  return (
    <iframe
      src="/flipbook.html"
      style={{
        width: "100vw",
        height: "100vh",
        border: "none",
        display: "block",
      }}
      title="Alcovia Brochure"
      allow="fullscreen"
    />
  );
}
