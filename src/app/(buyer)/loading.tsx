export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-rose-700 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Loading</p>
      </div>
    </div>
  );
}
