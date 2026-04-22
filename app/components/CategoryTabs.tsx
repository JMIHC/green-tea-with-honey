import { Link, useLocation } from 'react-router';
import type { Category } from '../lib/types';

const categories: { path: string; label: string; category: Category | 'all' }[] = [
  { path: '/work', label: 'All', category: 'all' },
  { path: '/work/digital', label: 'Digital', category: 'digital' },
  { path: '/work/drawings', label: 'Drawings', category: 'drawings' },
  { path: '/work/mixed-media', label: 'Mixed Media', category: 'mixed-media' },
  { path: '/work/paintings', label: 'Paintings', category: 'paintings' },
];

export default function CategoryTabs() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/work') {
      return location.pathname === '/work';
    }
    return location.pathname === path;
  };

  return (
    <nav className="mb-8 flex flex-wrap gap-2 sm:gap-4">
      {categories.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`text-sm transition-colors ${
            isActive(path)
              ? 'text-black font-medium'
              : 'text-gray-500 hover:text-black'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
