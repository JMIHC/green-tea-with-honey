import type { Artwork } from '../lib/types';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: () => void;
}

export default function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-square w-full overflow-hidden bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      <img
        src={artwork.src}
        alt={artwork.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40" />
      <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="text-left text-white">
          <p className="text-sm font-medium leading-tight">{artwork.title}</p>
          <p className="mt-1 text-xs opacity-80">{artwork.year}</p>
          {artwork.dimensions && (
            <p className="text-xs opacity-80">{artwork.dimensions}</p>
          )}
          {artwork.medium && (
            <p className="text-xs opacity-80">{artwork.medium}</p>
          )}
        </div>
      </div>
    </button>
  );
}
