import Link from "next/link";
import { ThemeToggleButton } from "./ThemeToggleButton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-neutral-950/80">
      <nav className="site-container flex items-center justify-between h-14">
        <div className="flex items-center gap-1">
          <Link href="/" className="nav-link">
            home
          </Link>
          <Link href="/post" className="nav-link">
            posts
          </Link>
        </div>
        <ThemeToggleButton />
      </nav>
    </header>
  );
}
