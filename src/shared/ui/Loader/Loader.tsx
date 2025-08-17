interface LoaderProps {
  fullScreen?: boolean;
}

export const Loader = ({ fullScreen = true }: LoaderProps) => {
  return (
    <div
      className={`z-50 flex items-center justify-center ${
        fullScreen ? 'fixed inset-0 bg-black/30' : 'h-full w-full'
      }`}
    >
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800"
        aria-label="loading"
      />
    </div>
  );
};
