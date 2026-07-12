export function Footer() {
  return (
    <footer>
      <div className="site-container flex items-center justify-center py-8 text-sm text-neutral-400 dark:text-neutral-500">
        <span>&copy; {new Date().getFullYear()} Seungwoo Kim</span>
      </div>
    </footer>
  );
}
