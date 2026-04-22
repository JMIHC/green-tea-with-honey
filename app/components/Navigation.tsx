import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import logo from '../assets/brand/logo.svg';

export default function Navigation() {
  const [workOpen, setWorkOpen] = useState(false);
  const location = useLocation();

  const isWorkActive = location.pathname.startsWith('/work');

  return (
    <header className="px-4 py-6 sm:px-8 lg:px-16">
      <nav className="flex items-center justify-between">
        <Link to="/" className="block">
          <img src={logo} alt="Luci" className="h-12 w-auto" />
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className={`transition-colors ${
              location.pathname === '/' ? 'text-black' : 'text-gray-500 hover:text-black'
            }`}
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setWorkOpen(true)}
            onMouseLeave={() => setWorkOpen(false)}
          >
            <Link
              to="/work"
              className={`transition-colors ${
                isWorkActive ? 'text-black' : 'text-gray-500 hover:text-black'
              }`}
            >
              Work
            </Link>

            {workOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 min-w-[140px] bg-white py-2 shadow-lg">
                <Link
                  to="/work"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black"
                >
                  All Work
                </Link>
                <Link
                  to="/work/digital"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black"
                >
                  Digital
                </Link>
                <Link
                  to="/work/drawings"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black"
                >
                  Drawings
                </Link>
                <Link
                  to="/work/mixed-media"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black"
                >
                  Mixed Media
                </Link>
                <Link
                  to="/work/paintings"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black"
                >
                  Paintings
                </Link>
              </div>
            )}
          </div>

          <a
            href="mailto:luciart222@gmail.com"
            className="text-gray-500 transition-colors hover:text-black"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
