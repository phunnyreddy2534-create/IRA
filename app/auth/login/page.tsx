export default function LoginPage() {
  return (
    <main className="container">
      <h1>Login</h1>

      <form className="form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
