import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-10 px-4">
      <h2
        data-testid="not-found-title"
        className="text-4xl font-bold text-slate-800 dark:text-gray-100 mb-4"
      >
        404 - Page Not Found
      </h2>
      <p className="text-slate-600 dark:text-gray-300 mb-6">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer mt-4 px-6 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition"
      >
        ← Назад
      </button>
    </div>
  );
};
