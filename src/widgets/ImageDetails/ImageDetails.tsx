import Image from 'next/image';
import Link from 'next/link';

import { AppButton } from '@/shared/ui/AppButton/AppButton';
import { HeaderWithCloseBtn } from '../../shared/ui/HeaderWithCloseBtn/HeaderWithCloseBtn';

export const ImageDetails = () => {
  const { id, page: pageParam } = useParams();
  const navigate = useNavigate();
  const page = Number(pageParam) || Number(DEFAULT_PAGE);

  const { data: details, isFetching, error, refetch } = useImageDetails(id);

  const handleClose = () => {
    navigate(`/${page}`);
  };

  if (!id) return null;

  return (
    <aside className="overflow-hidden rounded bg-white p-4 shadow dark:bg-gray-800">
      {/* {isFetching && <Loader fullScreen={false} />}

      {!isFetching && error && (
        <div>
          <HeaderWithCloseBtn
            headerText="Image Details"
            onClose={handleClose}
          />
          <p className="font-medium text-red-600">{error.message}</p>
        </div>
      )} */}

      {details && (
        <div>
          <HeaderWithCloseBtn
            headerText="Image Details"
            onClose={handleClose}
          />

          <Link
            href={details.urls.full}
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
              href={details.user.links.html}
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
        </div>
      )}
    </aside>
  );
};
