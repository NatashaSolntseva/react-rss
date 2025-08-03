import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchLatestImages, searchImages } from '@/api/api';
import type { CardItem } from '@/api/types';

import { SearchBar } from '@/components/SearchBar/SearchBar';
import { CardList } from '@/components/CardList/CardList';
import { Loader } from '@/components/Loader/Loader';
import { ImageDetails } from '@/components/ImageDetails/ImageDetails';
import { Flyout } from '@/components/Flyout/Flyout';
import { IMAGES_PER_PAGE } from '@/api/constants';

export const HomePage = () => {
  const [images, setImages] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('query')?.trim() || '';
  const selectedId = searchParams.get('details');

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
    if (term.trim()) {
      localStorage.setItem('searchTerm', term.trim());
      setSearchParams({ page: '1', query: term.trim() });
    } else {
      localStorage.removeItem('searchTerm');
      setSearchParams({ page: '1' });
    }
  };

  return (
    <div className="flex-grow">
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
              ...(selectedId && { details: selectedId }),
            })
          }
          disabled={page <= 1}
          className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>

        <span className="text-slate-700 dark:text-gray-100 font-medium px-2">
          Page {page}
          {totalPages ? ` of ${totalPages}` : ''}
        </span>

        <button
          onClick={() =>
            setSearchParams({
              page: String(page + 1),
              ...(searchTerm && { query: searchTerm }),
              ...(selectedId && { details: selectedId }),
            })
          }
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
