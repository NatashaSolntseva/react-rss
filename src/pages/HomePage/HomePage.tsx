import { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';

import { SearchBar } from '@/components/SearchBar/SearchBar';
import { CardList } from '@/components/CardList/CardList';
import { Loader } from '@/components/Loader/Loader';
import { Flyout } from '@/components/Flyout/Flyout';
import { DEFAULT_PAGE, IMAGES_PER_PAGE } from '@/api/constants';
import { useSearchImages } from './model/useSearchImages';
import { useLatestImage } from './model/useLatestImages';
import { AppButton } from '@/shared/ui/AppButton/AppButton';

export const HomePage = () => {
  const navigate = useNavigate();
  const { page: pageParam, id: idParam } = useParams();
  const page = Number(pageParam) || Number(DEFAULT_PAGE);

  const pageNumber = pageParam ? parseInt(pageParam, 10) : Number(DEFAULT_PAGE);

  const isPageValid =
    !pageParam ||
    (!isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageParam === pageNumber.toString());

  const isIdValid = !idParam || /^[\w-]{10,}$/.test(idParam);

  useEffect(() => {
    if (!isPageValid || !isIdValid) {
      navigate('/404-not-found', { replace: true });
    }
  }, [isPageValid, isIdValid, navigate]);

  const searchTerm = localStorage.getItem('searchTerm') || '';
  const isSearch = !!searchTerm;

  const {
    data: searchData,
    isFetching: isSearchFetching,
    isError: isSearchError,
    error: searchError,
    refetch: searchRefetch,
  } = useSearchImages(searchTerm, page);

  const {
    data: latestData,
    isFetching: isLatestFetching,
    isError: isLatestError,
    error: latestError,
    refetch: latestRefetch,
  } = useLatestImage(page, IMAGES_PER_PAGE, !isSearch);

  const images = isSearch ? (searchData?.results ?? []) : (latestData ?? []);
  const totalImages = searchData?.totalImages ?? null;

  const error =
    (isSearchError && searchError?.message) ||
    (isLatestError && latestError?.message) ||
    null;

  const loading = isSearch ? isSearchFetching : isLatestFetching;
  const totalPages = totalImages
    ? Math.ceil(totalImages / IMAGES_PER_PAGE)
    : null;

  const handleSearch = (term: string) => {
    const trimmed = term.trim();
    localStorage.setItem('searchTerm', trimmed);
    navigate(`/${DEFAULT_PAGE}`);
  };

  const goToPage = (newPage: number) => {
    navigate(`/${newPage}${idParam ? `/${idParam}` : ''}`);
  };

  const handleRefresh = () => {
    if (isSearch) {
      searchRefetch();
    } else {
      latestRefetch();
    }
  };

  return (
    <div className="flex-grow">
      {loading && <Loader />}
      <SearchBar onSearch={handleSearch} initialValue={searchTerm} />

      <div className="flex min-h-[400px] flex-col items-stretch gap-6 transition-all md:flex-row">
        <div className={`${idParam ? 'md:w-2/3' : 'w-full'} h-full`}>
          {error && (
            <div className="mb-4 text-center font-medium text-red-600">
              {error}
            </div>
          )}
          <CardList items={images} />
        </div>

        {idParam && (
          <div className="h-full w-full md:w-1/3">
            <Outlet />
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <AppButton
          // data-testid="prev-btn"
          text="Previous"
          onClick={() => goToPage(page - 1)}
          disabled={page <= Number(DEFAULT_PAGE)}
        />

        <span className="px-2 font-medium text-slate-700 dark:text-gray-100">
          Page {page}
          {totalPages ? ` of ${totalPages}` : ''}
        </span>

        <AppButton
          // data-testid="next-btn"
          text="Next"
          onClick={() => goToPage(page + 1)}
        />
        <AppButton text="Refresh" onClick={handleRefresh} />
      </div>

      <Flyout />
    </div>
  );
};
