import type { Artwork, Category } from './types';

// Import images from each category folder using Vite's glob import
const digitalImages = import.meta.glob<string>(
  '/app/assets/Digital /*.(jpg|jpeg|png|JPG|PNG)',
  { eager: true, import: 'default' }
);

const drawingsImages = import.meta.glob<string>(
  '/app/assets/Drawings/*.(jpg|jpeg|png|JPG|PNG)',
  { eager: true, import: 'default' }
);

const mixedMediaImages = import.meta.glob<string>(
  '/app/assets/Mixed Media /*.(jpg|jpeg|png|JPG|PNG)',
  { eager: true, import: 'default' }
);

const paintingsImages = import.meta.glob<string>(
  '/app/assets/Paintings/*.(jpg|jpeg|png|JPG|PNG)',
  { eager: true, import: 'default' }
);

// Parse filename to extract metadata
// Format: "Title, Dimensions_ medium details, Year.ext"
function parseFilename(filepath: string): { title: string; dimensions: string; medium: string; year: string } {
  const filename = filepath.split('/').pop() || '';
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|JPG|PNG)$/, '');

  // Extract year (last 4 digits before extension)
  const yearMatch = nameWithoutExt.match(/(\d{4})$/);
  const year = yearMatch ? yearMatch[1] : '';

  // Remove year and trailing comma/space
  const withoutYear = nameWithoutExt.replace(/,?\s*\d{4}$/, '');

  // Split by "_ " to separate dimensions from medium
  // Format is: "Title, Dimensions_ medium details"
  const underscoreIndex = withoutYear.indexOf('_ ');

  if (underscoreIndex === -1) {
    // Fallback: try to split by last comma
    const parts = withoutYear.split(', ');
    if (parts.length >= 2) {
      return {
        title: parts[0],
        dimensions: '',
        medium: parts.slice(1).join(', '),
        year
      };
    }
    return { title: withoutYear, dimensions: '', medium: '', year };
  }

  const beforeUnderscore = withoutYear.substring(0, underscoreIndex);
  const afterUnderscore = withoutYear.substring(underscoreIndex + 2);

  // beforeUnderscore is "Title, Dimensions"
  const lastCommaIndex = beforeUnderscore.lastIndexOf(', ');

  if (lastCommaIndex === -1) {
    return {
      title: beforeUnderscore,
      dimensions: '',
      medium: afterUnderscore,
      year
    };
  }

  const title = beforeUnderscore.substring(0, lastCommaIndex);
  const dimensions = beforeUnderscore.substring(lastCommaIndex + 2);
  const medium = afterUnderscore;

  return { title, dimensions, medium, year };
}

// Convert image glob result to Artwork array
function processImages(images: Record<string, string>, category: Category): Artwork[] {
  return Object.entries(images)
    .filter(([path]) => !path.includes('UNSURE ABOUT UPLOADING'))
    .map(([path, src]) => {
      const { title, dimensions, medium, year } = parseFilename(path);
      return {
        id: `${category}-${path}`,
        src,
        title,
        dimensions,
        medium,
        year,
        category
      };
    });
}

// Get artworks by category
export function getDigitalArtworks(): Artwork[] {
  return processImages(digitalImages, 'digital');
}

export function getDrawingsArtworks(): Artwork[] {
  return processImages(drawingsImages, 'drawings');
}

export function getMixedMediaArtworks(): Artwork[] {
  return processImages(mixedMediaImages, 'mixed-media');
}

export function getPaintingsArtworks(): Artwork[] {
  return processImages(paintingsImages, 'paintings');
}

// Get all artworks combined
export function getAllArtworks(): Artwork[] {
  return [
    ...getDigitalArtworks(),
    ...getDrawingsArtworks(),
    ...getMixedMediaArtworks(),
    ...getPaintingsArtworks()
  ];
}

// Sort artworks by year (newest first)
export function sortByYear(artworks: Artwork[]): Artwork[] {
  return [...artworks].sort((a, b) => {
    const yearA = parseInt(a.year) || 0;
    const yearB = parseInt(b.year) || 0;
    return yearB - yearA;
  });
}

// Get category display name
export function getCategoryDisplayName(category: Category | 'all'): string {
  const names: Record<Category | 'all', string> = {
    'all': 'All Work',
    'digital': 'Digital',
    'drawings': 'Drawings',
    'mixed-media': 'Mixed Media',
    'paintings': 'Paintings'
  };
  return names[category];
}

// Get category route path
export function getCategoryPath(category: Category | 'all'): string {
  if (category === 'all') return '/work';
  return `/work/${category}`;
}
