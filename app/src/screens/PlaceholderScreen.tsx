/** Stand-in for a screen that is not built yet: shows the screen name and nothing else. */
export function PlaceholderScreen({ name }: { name: string }) {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <h1 className="text-xl font-semibold text-ink-strong">{name}</h1>
    </main>
  );
}
