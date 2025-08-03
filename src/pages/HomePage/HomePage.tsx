import { useCallback, useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';

import { fetchLatestImages, searchImages } from '@/api/api';
import type { CardItem } from '@/api/types';

import { SearchBar } from '@/components/SearchBar/SearchBar';
import { CardList } from '@/components/CardList/CardList';
import { Loader } from '@/components/Loader/Loader';
import { Flyout } from '@/components/Flyout/Flyout';
import { DEFAULT_PAGE, IMAGES_PER_PAGE } from '@/api/constants';

export const HomePage = () => {
  const [images, setImages] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const navigate = useNavigate();
  const { page: pageParam, id: idParam } = useParams();
  const page = Number(pageParam) || Number(DEFAULT_PAGE);

  const pageNumber = pageParam ? parseInt(pageParam, 10) : Number(DEFAULT_PAGE);

  const isPageValid =
    !pageParam ||
    (!isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageParam === pageNumber.toString());

  const isIdValid = !idParam || /^[a-zA-Z0-9]{11}$/.test(idParam);

  useEffect(() => {
    if (!isPageValid || !isIdValid) {
      navigate('/404-not-found', { replace: true });
    }
  }, [isPageValid, isIdValid, navigate]);

  const searchTerm = localStorage.getItem('searchTerm') || '';

  const fetchImages = useCallback(async () => {
    setLoading(true);

    try {
      if (searchTerm) {
        const { results, totalImages } = await searchImages(
          searchTerm,
          page,
          IMAGES_PER_PAGE
        );
        setImages(results);
        const calculatedTotalPages = Math.ceil(totalImages / IMAGES_PER_PAGE);
        setTotalPages(calculatedTotalPages);
      } else {
        const results = await fetchLatestImages(page, IMAGES_PER_PAGE);
        setImages(results);
        setTotalPages(null);
      }

      setError(null);
    } catch (err) {
      console.log(err);
      setError('Something went wrong while fetching images.');
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    localStorage.setItem('searchTerm', trimmed);
    navigate(`/${DEFAULT_PAGE}`);
  };

  const goToPage = (newPage: number) => {
    navigate(`/${newPage}${idParam ? `/${idParam}` : ''}`);
  };

  return (
    <div className="flex-grow">
      <SearchBar onSearch={handleSearch} initialValue={searchTerm} />

      <div className="flex flex-col md:flex-row gap-6 transition-all items-stretch min-h-[400px]">
        <div className={`${idParam ? 'md:w-2/3' : 'w-full'} h-full`}>
          {error && (
            <div className="text-center text-red-600 font-medium mb-4">
              {error}
            </div>
          )}
          <CardList items={images} />
        </div>

        {idParam && (
          <div className="w-full md:w-1/3 h-full">
            <Outlet />
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          data-testid="prev-btn"
          onClick={() => goToPage(page - 1)}
          disabled={page <= Number(DEFAULT_PAGE)}
          className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>

        <span className="text-slate-700 dark:text-gray-100 font-medium px-2">
          Page {page}
          {totalPages ? ` of ${totalPages}` : ''}
        </span>

        <button
          data-testid="next-btn"
          onClick={() => goToPage(page + 1)}
          className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 cursor-pointer"
        >
          Next
        </button>
      </div>

      {loading && <Loader />}
      <Flyout />
    </div>
  );
};
