export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
      <h1 className="text-xl font-bold">IRA</h1>
      <div className="flex gap-4 text-sm">
        <a href="/projects">Projects</a>
        <a href="/apply">Apply</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
}
