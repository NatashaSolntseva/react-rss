import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchPhotoDetails } from '@/api/api';
import { UnsplashImageDetails } from '@/api/types';
import { Loader } from '@/components/Loader/Loader';
import { HeaderWithCloseBtn } from '@/components/HeaderWithCloseBtn/HeaderWithCloseBtn';
import { DEFAULT_PAGE } from '@/api/constants';

export const ImageDetails = () => {
  const { id, page: pageParam } = useParams();
  const navigate = useNavigate();
  const page = Number(pageParam) || Number(DEFAULT_PAGE);

  const [details, setDetails] = useState<UnsplashImageDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setDetails(null);
      setError(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPhotoDetails(id);
        setDetails(data);
      } catch (err) {
        console.error('Error loading details:', err);

        const is404 =
          err instanceof Error &&
          (err.message.includes('404') || err.message === 'API error: 404');

        if (is404) {
          setError(`Image not found (ID: ${id})`);
        } else {
          setError('Error fetching image details');
        }

        setDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleClose = () => {
    navigate(`/${page}`);
  };

  if (!id) return null;

  return (
    <aside className="p-4 bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
      {loading && <Loader />}

      {!loading && error && (
        <div>
          <HeaderWithCloseBtn
            headerText="Image Details"
            onClose={handleClose}
          />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {!loading && details && (
        <div>
          <HeaderWithCloseBtn
            headerText="Image Details"
            onClose={handleClose}
          />

          <Link
            to={details.urls.full}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4"
          >
            <img
              src={details.urls.small}
              alt={details.alt_description || ''}
              className="rounded hover:opacity-80 transition"
            />
          </Link>

          <p className="text-sm text-slate-600 dark:text-gray-100 mb-1">
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

          <p className="text-sm text-slate-600 dark:text-gray-100 mb-1">
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
