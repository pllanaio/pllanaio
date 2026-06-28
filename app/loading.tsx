export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-pulse rounded-2xl border border-border bg-card shadow-premium" />
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Innovation in every Step.</p>
      </div>
    </main>
  );
}
