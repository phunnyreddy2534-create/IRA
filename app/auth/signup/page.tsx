export default function SignupPage() {
  return (
    <main className="container">
      <h1>Create Account</h1>

      <form className="form">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}
