export default function Pagination() {
  return (
    <div className="flex items-center justify-center gap-3">
      {[1, 2, 3].map((page) => (
        <button key={page} className={`h-11 w-11 rounded-full border text-sm transition ${page === 2 ? "border-white bg-white text-black" : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/30"}`}>
          {page}
        </button>
      ))}
      <button className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.24em] text-zinc-300 transition hover:border-white/30 hover:text-white">Next</button>
    </div>
  );
}
