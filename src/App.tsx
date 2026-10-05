import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './store';
import { Navigation, Footer } from './components/Layout';
import Home from './pages/Home';
import Esports from './pages/Esports';
import Tournaments from './pages/Tournaments';
import About from './pages/About';
import AdminLayout from './pages/Admin';

function PublicLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main key={location.pathname}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <AdminLayout><div /></AdminLayout>;
  }

  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/esports" element={<Esports />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </PublicLayout>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </StoreProvider>
  );
}
