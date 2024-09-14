import { ModeToggle } from "./modeToggle";
export default function Navbar() {
  return (
    <nav className="w-full px-10 py-2 flex items-center justify-end">
      <ModeToggle />
    </nav>
  );
}
