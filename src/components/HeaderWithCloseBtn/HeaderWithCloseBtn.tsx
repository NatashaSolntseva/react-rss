import { FC } from 'react';

interface Props {
  onClose: () => void;
  headerText: string;
}

const HeaderWithCloseBtn: FC<Props> = ({ onClose, headerText }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">{headerText}</h2>
      <button
        onClick={onClose}
        className="text-slate-500 hover:text-slate-800 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
};

export default HeaderWithCloseBtn;
