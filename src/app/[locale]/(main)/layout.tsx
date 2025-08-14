export default function MainLayout({
  children,
  details,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div>{children}</div>
      <aside className="hidden lg:block">{details}</aside>
    </section>
  );
}
