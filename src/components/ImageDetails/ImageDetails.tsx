import { Link, useNavigate, useParams } from 'react-router-dom';

import { Loader } from '@/components/Loader/Loader';
import { HeaderWithCloseBtn } from '@/components/HeaderWithCloseBtn/HeaderWithCloseBtn';
import { DEFAULT_PAGE } from '@/api/constants';
import { useImageDetails } from './model/useImageDetails';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

export const ImageDetails = () => {
  const { id, page: pageParam } = useParams();
  const navigate = useNavigate();
  const page = Number(pageParam) || Number(DEFAULT_PAGE);

  const { data: details, isLoading, error } = useImageDetails(id);

  const handleClose = () => {
    navigate(`/${page}`);
  };

  if (!id) return null;

  return (
    <aside className="overflow-hidden rounded bg-white p-4 shadow dark:bg-gray-800">
      {isLoading && <Loader />}

      {!isLoading && error && (
        <div>
          <HeaderWithCloseBtn
            headerText="Image Details"
            onClose={handleClose}
          />
          <p className="font-medium text-red-600">{error.message}</p>
        </div>
      )}

      {!isLoading && details && (
        <div>
          <HeaderWithCloseBtn
            headerText="Image Details"
            onClose={handleClose}
          />

          <Link
            to={details.urls.full}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 block"
          >
            <img
              src={details.urls.small}
              alt={details.alt_description || ''}
              className="rounded transition hover:opacity-80"
            />
          </Link>

          <p className="mb-1 text-sm text-slate-600 dark:text-gray-100">
            <strong>Author:</strong>{' '}
            <Link
              to={details.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {details.user.name}
            </Link>
          </p>

          <p className="mb-1 text-sm text-slate-600 dark:text-gray-100">
            <strong>Likes:</strong> {details.likes}
          </p>

          {details.description && (
            <p className="text-sm text-slate-600 dark:text-gray-100">
              <strong>Description:</strong> {details.description}
            </p>
          )}

          <AppButton
            text="Refresh"
            onClick={() => console.log('Refresh image details')}
            className="mt-3"
          />
        </div>
      )}
    </aside>
  );
};
