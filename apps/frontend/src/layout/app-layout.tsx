import { SideNav, type SideNavItem } from "@repo/ui";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { ThemeToggle } from "@/theme/theme-toggle";

const NAVIGATION_ITEMS: readonly SideNavItem[] = [
  { id: "/resume", label: "Мои резюме", href: "/resume" },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="grid h-dvh grid-cols-[18rem_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] bg-canvas">
      <header className="col-span-2 flex h-14 items-center border-b border-line px-6">
        <Link to="/" className="text-large font-medium text-ink">
          jet hunter
        </Link>
      </header>
      <aside className="flex flex-col justify-between gap-6 overflow-y-auto border-r border-line px-4 py-6">
        <SideNav
          label="Основная навигация"
          items={NAVIGATION_ITEMS}
          activeId={location.pathname}
          onSelect={(path) => {
            void navigate(path);
          }}
        />
        <ThemeToggle />
      </aside>
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
