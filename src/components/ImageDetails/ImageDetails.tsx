import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchPhotoDetails } from '../../api/api';
import { UnsplashImageDetails } from '../../api/types';
import Loader from '../Loader/Loader';
import HeaderWithCloseBtn from '../HeaderWithCloseBtn/HeaderWithCloseBtn';

const ImageDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const [details, setDetails] = useState<UnsplashImageDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!detailsId) {
      setDetails(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetchPhotoDetails(detailsId)
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading details:', err);

        const is404 =
          err instanceof Error &&
          (err.message.includes('404') || err.message === 'API error: 404');

        if (is404) {
          setError(`Image not found (ID: ${detailsId})`);
        } else {
          setError('Error fetching image details');
        }

        setDetails(null);
        setLoading(false);
      });
  }, [detailsId]);

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  if (!detailsId) return null;

  return (
    <aside className="p-4 border-l border-slate-300 bg-white">
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
              className="rounded hover:opacity-90 transition"
            />
          </Link>

          <p className="text-sm text-slate-600 mb-1">
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

          <p className="text-sm text-slate-600 mb-1">
            <strong>Likes:</strong> {details.likes}
          </p>

          {details.description && (
            <p className="text-sm text-slate-600">
              <strong>Description:</strong> {details.description}
            </p>
          )}
        </div>
      )}
    </aside>
  );
};

export default ImageDetails;
