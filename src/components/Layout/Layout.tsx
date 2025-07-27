import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const Layout = () => {
  return (
    <div className="layout bg-slate-100">
      <Header />
      <main className="min-h-[calc(100vh-60px-56px)] px-6 py-4 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
