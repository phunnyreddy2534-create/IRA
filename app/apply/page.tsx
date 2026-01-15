export default function ApplyPage() {
  return (
    <div className="px-6 py-20 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Sell Your Project on IRA
      </h2>
      <p className="text-gray-400 mb-6">
        Upload your academic or real-world project and earn money
        whenever it is sold.
      </p>

      <form className="space-y-4">
        <input
          placeholder="Project Title"
          className="w-full bg-black border border-gray-700 p-3 rounded"
        />
        <textarea
          placeholder="Project Description"
          className="w-full bg-black border border-gray-700 p-3 rounded"
        />
        <button className="bg-white text-black px-6 py-3 rounded font-semibold">
          Submit for Review
        </button>
      </form>
    </div>
  );
}
