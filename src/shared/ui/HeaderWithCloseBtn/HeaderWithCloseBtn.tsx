import { useTranslations } from 'next-intl';

interface Props {
  onClose: () => void;
}

export const HeaderWithCloseBtn = ({ onClose }: Props) => {
  const t = useTranslations('DetailsHeader');

  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-bold text-slate-600 dark:text-gray-100">
        {t('Title')}
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
