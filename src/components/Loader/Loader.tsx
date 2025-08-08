export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800"
        aria-label="loading"
      />
    </div>
  );
};
