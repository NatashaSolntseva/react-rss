import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import CardList from '../../components/CardList/CardList';
import Loader from '../../components/Loader/Loader';
import ThrowErrorButton from '../../components/ThrowErrorButton/ThrowErrorButton';
import { fetchLatestImages, searchImages } from '../../api/api';
import { UnsplashImage } from '../../api/types';

const HomePage = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (term: string) => {
    setLoading(true);
    const fetchFn = term ? searchImages(term) : fetchLatestImages();

    fetchFn
      .then((data) => {
        setImages(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Search error:', err);
        setError(
          'Something went wrong while fetching images. Please try again later.'
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    const savedTerm = localStorage.getItem('searchTerm')?.trim();

    setLoading(true);

    const fetchFn = savedTerm ? searchImages(savedTerm) : fetchLatestImages();

    fetchFn
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Initial fetch error:', err);
        setError('Failed to load images');
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex-grow p-6 bg-slate-100 min-h-[calc(100vh-64px-48px)]">
      <SearchBar
        onSearch={handleSearch}
        initialValue={localStorage.getItem('searchTerm') || ''}
      />

      {error && (
        <div className="text-center text-red-600 font-medium mb-4">{error}</div>
      )}

      <CardList items={images} />
      <ThrowErrorButton />

      {loading && <Loader />}
    </main>
  );
};

export default HomePage;
