import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import { useAuth } from './context/AuthContext';
import { appRoutes, type AppRoute, type PublicRoute } from './appRoutes';

const pages = appRoutes;

function App() {
  const { isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState<AppRoute>('home');

  const goToPage = (page: PublicRoute) => setCurrentPage(page);

  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '');
    setCurrentPage(pages.includes(path as AppRoute) ? (path as AppRoute) : 'home');
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    document.title = 'Martamora General Dealers - Natural Wellness Through Herbs';
  }, []);

  useEffect(() => {
    const path = currentPage === 'home' ? '/' : `/${currentPage}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '');
      setCurrentPage(pages.includes(path as AppRoute) ? (path as AppRoute) : 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home adminMode={isAdmin} onNavigate={goToPage} />;
      case 'about':
        return <About />;
      case 'products':
        return <Products adminMode={isAdmin} onNavigate={goToPage} />;
      case 'gallery':
        return <Gallery adminMode={isAdmin} />;
      case 'contact':
        return <Contact adminMode={isAdmin} />;
      case 'admin':
        return <AdminLogin />;
      default:
        return <Home adminMode={isAdmin} onNavigate={goToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-20">{renderPage()}</main>
      <Footer onNavigate={goToPage} />
    </div>
  );
}

export default App;
