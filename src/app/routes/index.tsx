import { Routes, Route } from 'react-router-dom';

import { Layout } from '@/shared/ui/Layout/Layout';
import { HomePage } from '@/pages/HomePage/HomePage';
import { AboutPage } from '@/pages/AboutPage/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { ImageDetails } from '@/components/ImageDetails/ImageDetails';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path=":page" element={<HomePage />}>
          <Route path=":id" element={<ImageDetails />} />
        </Route>
        <Route path="404-not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
