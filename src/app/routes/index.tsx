import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/HomePage/HomePage';
import About from '../../pages/AboutPage/AboutPage';
import Layout from '../../components/Layout/Layout';
import NotFound from '../../pages/NotFoundPage/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
