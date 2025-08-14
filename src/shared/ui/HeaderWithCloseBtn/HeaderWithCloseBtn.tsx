interface Props {
  onClose: () => void;
  headerText: string;
}

export const HeaderWithCloseBtn = ({ onClose, headerText }: Props) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-bold text-slate-600 dark:text-gray-100">
        {headerText}
      </h2>
      <button
        onClick={onClose}
        className="cursor-pointer text-slate-500 hover:text-slate-800 dark:text-gray-100"
      >
        ✕
      </button>
    </div>
  );
};
