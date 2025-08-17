import { fetchLatestImages } from '@/server/unsplash';
import { DEFAULT_PAGE, IMAGES_PER_PAGE } from '@/server/constants';

import { MainPageClient } from './MainPageClient';

export default async function MainPage() {
  const initialCardsData = await fetchLatestImages(
    Number(DEFAULT_PAGE),
    IMAGES_PER_PAGE
  );

  return <MainPageClient initialCardData={initialCardsData} />;
}
