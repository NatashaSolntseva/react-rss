import { Link, useNavigate } from 'react-router-dom';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-3xl font-bold text-slate-800 dark:text-gray-200">
        About Image Explorer
      </h1>

      <p className="mb-4 text-slate-700 dark:text-gray-200">
        This application allows users to search and explore high-quality images
        using the{' '}
        <Link
          to={'https://unsplash.com/developers'}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-500"
        >
          Unsplash API
        </Link>
        . It features live search, image results, pagination, and a responsive
        interface.
      </p>

      <p className="mb-4 text-slate-700 dark:text-gray-200">
        Built as part of the&nbsp;
        <Link
          to="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-blue-500"
        >
          RS School React course
        </Link>
      </p>

      <p className="mb-6 text-slate-600 italic dark:text-gray-200">
        Created by{' '}
        <Link
          to={'https://github.com/NatashaSolntseva'}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-500"
        >
          Natasha Solntseva
        </Link>
      </p>
      <AppButton text="← Back" onClick={() => navigate(-1)} />
    </div>
  );
};
