import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useStore } from '../store';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state } = useStore();

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ESPORTS', path: '/esports' },
    { name: 'TOURNAMENTS', path: '/tournaments' },
    { name: 'ABOUT', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-700 rounded-sm flex items-center justify-center">
              <span className="font-display font-bold text-white text-xs">V</span>
            </div>
            <span className="font-display font-bold text-white text-sm tracking-wider">VEXORA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-200 rounded ${
                  isActive(item.path)
                    ? 'text-violet-400 bg-violet-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={state.siteContent.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold tracking-wider rounded transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 flex items-center gap-2"
            >
              JOIN DISCORD
              <ChevronRight size={12} />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/5 animate-fadeIn">
          <div className="px-4 py-4 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-sm font-semibold tracking-wider rounded ${
                  isActive(item.path)
                    ? 'text-violet-400 bg-violet-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href={state.siteContent.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 bg-violet-600 text-white text-sm font-bold tracking-wider rounded text-center mt-4"
            >
              JOIN DISCORD
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  const { state } = useStore();

  return (
    <footer className="bg-black border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-700 rounded-sm flex items-center justify-center">
                <span className="font-display font-bold text-white text-xs">V</span>
              </div>
              <span className="font-display font-bold text-white text-sm tracking-wider">VEXORA ESPORTS</span>
            </div>
            <p className="text-gray-500 text-sm max-w-md">
              {state.siteContent.heroDescription}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-xs font-bold text-white tracking-wider mb-4">NAVIGATE</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-500 hover:text-violet-400 text-sm transition-colors">Home</Link>
              <Link to="/esports" className="block text-gray-500 hover:text-violet-400 text-sm transition-colors">Esports</Link>
              <Link to="/tournaments" className="block text-gray-500 hover:text-violet-400 text-sm transition-colors">Tournaments</Link>
              <Link to="/about" className="block text-gray-500 hover:text-violet-400 text-sm transition-colors">About</Link>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-display text-xs font-bold text-white tracking-wider mb-4">COMMUNITY</h4>
            <div className="space-y-2">
              <a href={state.siteContent.discordUrl} target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-violet-400 text-sm transition-colors">Discord</a>
              <a href="#" className="block text-gray-500 hover:text-violet-400 text-sm transition-colors">Twitter</a>
              <a href="#" className="block text-gray-500 hover:text-violet-400 text-sm transition-colors">Instagram</a>
              <a href="#" className="block text-gray-500 hover:text-violet-400 text-sm transition-colors">YouTube</a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">{state.siteContent.footerText}</p>
          <a
            href="#/admin"
            className="text-gray-700 hover:text-gray-500 text-xs transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
