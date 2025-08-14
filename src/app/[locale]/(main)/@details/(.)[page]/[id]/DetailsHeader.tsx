'use client';

import { HeaderWithCloseBtn } from '@/shared/ui';
import { useRouter } from '@/i18n/navigation';

export default function DetailsHeader({
  page,
  title,
}: {
  page: number;
  title: string;
}) {
  const router = useRouter();
  return (
    <HeaderWithCloseBtn
      headerText={title}
      onClose={() => router.push(`/${page}`)}
    />
  );
}
