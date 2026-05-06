import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';

const pages = ['home', 'about', 'products', 'gallery', 'contact', 'admin'] as const;
type Page = (typeof pages)[number];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '');
    setCurrentPage(pages.includes(path as Page) ? (path as Page) : 'home');
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
      setCurrentPage(pages.includes(path as Page) ? (path as Page) : 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'products':
        return <Products />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <AdminLogin />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-20">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
