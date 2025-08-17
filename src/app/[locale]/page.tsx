import { fetchLatestImages } from '@/server/unsplash';
import { MainPageClient } from './MainPageClient';

export default async function MainPage() {
  const initialCardsData = await fetchLatestImages();
  return <MainPageClient initialCardData={initialCardsData} />;
}
