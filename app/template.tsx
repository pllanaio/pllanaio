export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-foreground px-5 py-3 font-medium text-background shadow-premium transition-transform focus:translate-y-0"
      >
        Zum Hauptinhalt springen
      </a>
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <address className="sr-only">
        Leon Pllana IT-Solutions, Rothschwaiger Straße 4, 82256 Fürstenfeldbruck, Deutschland.
        Telefon: +49 172 7255810. E-Mail: info@pllana.io.
      </address>
    </>
  );
}
