'use client';

import { useSearchParams } from 'next/navigation';

import { CardItem } from '@/server/types';
import {
  CardList,
  Flyout,
  SearchBar,
  Pagination,
  ImageDetails,
} from '@/widgets';

export function MainPageClient({
  initialCardData,
}: {
  initialCardData: CardItem[];
}) {
  const imageId = useSearchParams().get('imageId');

  console.log(' initialCardData', initialCardData);

  return (
    <div className="flex-grow">
      <SearchBar />
      <div className="flex min-h-[400px] flex-col items-stretch gap-6 transition-all md:flex-row">
        <div className={`${imageId ? 'md:w-2/3' : 'w-full'} h-full`}>
          <CardList />
        </div>

        {imageId && (
          <div className="h-full w-full md:w-1/3">
            <ImageDetails id={imageId} />
          </div>
        )}
      </div>
      <Pagination />
      <Flyout />
    </div>
  );
}
