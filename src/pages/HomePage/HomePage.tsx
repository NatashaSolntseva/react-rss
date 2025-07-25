import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardList from '../../components/CardList/CardList';
import Loader from '../../components/Loader/Loader';
import ThrowErrorButton from '../../components/ThrowErrorButton/ThrowErrorButton';
import { fetchLatestImages, searchImages } from '../../api/api';
import { UnsplashImage } from '../../api/types';
import ImageDetails from '../../components/ImageDetails/ImageDetails';

const IMAGES_PER_PAGE = 6;

const HomePage = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchTerm = searchParams.get('query')?.trim() || '';
  const selectedId = searchParams.get('details');

  const fetchImages = () => {
    setLoading(true);

    const fetchFn = searchTerm
      ? searchImages(searchTerm, page, IMAGES_PER_PAGE)
      : fetchLatestImages(page, IMAGES_PER_PAGE);

    fetchFn
      .then((data) => {
        setImages(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Image fetch error:', err);
        setError('Something went wrong while fetching images.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchImages();
  }, [page, searchTerm]);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      localStorage.setItem('searchTerm', term.trim());
      setSearchParams({ page: '1', query: term.trim() });
    } else {
      localStorage.removeItem('searchTerm');
      setSearchParams({ page: '1' });
    }
  };

  return (
    <main className="flex-grow p-6 bg-slate-100 min-h-[calc(100vh-64px-48px)]">
      <SearchBar onSearch={handleSearch} initialValue={searchTerm} />

      <div
        className={`flex flex-col md:flex-row gap-6 transition-all items-stretch min-h-[400px]`}
      >
        <div className={`${selectedId ? 'md:w-2/3' : 'w-full'} h-full`}>
          {error && (
            <div className="text-center text-red-600 font-medium mb-4">
              {error}
            </div>
          )}
          <CardList items={images} />
        </div>

        {selectedId && (
          <div className="w-full md:w-1/3 h-full">
            <ImageDetails />
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8 ">
        <button
          onClick={() =>
            setSearchParams({
              page: String(page - 1),
              ...(searchTerm && { query: searchTerm }),
            })
          }
          disabled={page <= 1}
          className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>

        <span className="text-slate-700 font-medium px-2">Page {page}</span>

        <button
          onClick={() =>
            setSearchParams({
              page: String(page + 1),
              ...(searchTerm && { query: searchTerm }),
            })
          }
          className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 cursor-pointer"
        >
          Next
        </button>
      </div>

      <ThrowErrorButton />
      {loading && <Loader />}
    </main>
  );
};

export default HomePage;
