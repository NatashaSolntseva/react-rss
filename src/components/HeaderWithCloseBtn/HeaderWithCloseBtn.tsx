interface Props {
  onClose: () => void;
  headerText: string;
}

export const HeaderWithCloseBtn = ({ onClose, headerText }: Props) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-slate-600 dark:text-gray-100">
        {headerText}
      </h2>
      <button
        onClick={onClose}
        className="text-slate-500 dark:text-gray-100 hover:text-slate-800 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
};
