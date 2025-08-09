import { useNavigate } from 'react-router-dom';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-10 text-center">
      <h2
        data-testid="not-found-title"
        className="mb-4 text-4xl font-bold text-slate-800 dark:text-gray-100"
      >
        404 - Page Not Found
      </h2>
      <p className="mb-6 text-slate-600 dark:text-gray-300">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <AppButton text="← Back" onClick={() => navigate(-1)} />
    </div>
  );
};
