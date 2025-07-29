import { Routes, Route } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
import { HomePage } from '@/pages/HomePage/HomePage';
import { AboutPage } from '@/pages/AboutPage/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
