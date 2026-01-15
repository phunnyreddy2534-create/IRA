export default function UploadPage() {
  return (
    <main className="container">
      <h1>Upload Your Project</h1>

      <form className="form">
        <input type="text" placeholder="Project Title" required />
        <textarea placeholder="Project Description" required />
        <input type="file" />
        <button type="submit">Submit Project</button>
      </form>
    </main>
  );
}
