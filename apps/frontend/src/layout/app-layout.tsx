import { Link, Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="grid h-dvh grid-cols-[18rem_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] bg-canvas">
      <header className="col-span-2 flex h-14 items-center border-b border-line px-6">
        <Link to="/" className="text-large font-medium text-ink">
          jet hunter
        </Link>
      </header>
      <aside className="overflow-y-auto border-r border-line">
        <nav
          aria-label="Основная навигация"
          className="flex flex-col px-4 py-6"
        />
      </aside>
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
