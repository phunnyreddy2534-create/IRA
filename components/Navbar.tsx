import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
      <Link href="/">IRA</Link> |{" "}
      <Link href="/projects">Projects</Link> |{" "}
      <Link href="/upload">Upload</Link> |{" "}
      <Link href="/auth/login">Login</Link>
    </nav>
  );
}
