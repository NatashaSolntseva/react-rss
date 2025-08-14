import { fetchLatestImages, searchImages } from '@/server/unsplash';
import CardListClient from './CardListClient';
import { IMAGES_PER_PAGE } from '@/server/constants';

type Props = {
  params: { page: string };
  searchParams?: { q?: string };
};

export default async function ListPage({ params, searchParams }: Props) {
  const { page } = await params;
  const pageNumber = Number(page ?? '1');

  const { q } = (await searchParams) ?? {};
  const query = q?.trim();

  let items;
  let totalImages: number | null = null;

  if (query) {
    const { results, totalImages: total } = await searchImages(
      query,
      pageNumber,
      IMAGES_PER_PAGE
    );
    items = results;
    totalImages = total;
  } else {
    items = await fetchLatestImages(pageNumber, IMAGES_PER_PAGE);
  }

  return (
    <CardListClient
      initialItems={items}
      page={pageNumber}
      totalImages={totalImages}
      searchQuery={query || ''}
    />
  );
}
