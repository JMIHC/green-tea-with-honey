import type { Artwork, Category } from '../lib/types';
import { useLightbox } from './LightboxProvider';
import ArtworkCard from './ArtworkCard';

interface GalleryGridProps {
  artworks: Artwork[];
  allArtworks: Artwork[];
  pageCategory: Category | 'all';
}

export default function GalleryGrid({ artworks, allArtworks, pageCategory }: GalleryGridProps) {
  const { open } = useLightbox();

  const handleClick = (artwork: Artwork) => {
    // Find index in allArtworks array for cross-category navigation
    const index = allArtworks.findIndex(a => a.id === artwork.id);
    open(index >= 0 ? index : 0, allArtworks, pageCategory);
  };

  if (artworks.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No artworks in this category yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onClick={() => handleClick(artwork)}
        />
      ))}
    </div>
  );
}
