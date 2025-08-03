export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div
        className="w-16 h-16 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin"
        aria-label="loading"
      />
    </div>
  );
};
