export default function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#fafaf8]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-black/20 border-t-black" />
        <p className="text-xs uppercase tracking-[0.16em] text-black/50">Loading</p>
      </div>
    </div>
  );
}
