import { useEffect, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useLightbox } from './LightboxProvider';
import { getCategoryDisplayName, getCategoryPath } from '../lib/artwork';

export default function Lightbox() {
  const { isOpen, currentIndex, artworks, pageCategory, close, next, prev } = useLightbox();
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentArtwork = artworks[currentIndex];
  const showCategoryBadge = currentArtwork && pageCategory !== 'all' && currentArtwork.category !== pageCategory;

  const handleClose = useCallback(() => {
    // If current image is from different category, navigate to that category
    if (currentArtwork && pageCategory !== 'all' && currentArtwork.category !== pageCategory) {
      navigate(getCategoryPath(currentArtwork.category));
    }
    close();
  }, [currentArtwork, pageCategory, navigate, close]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          prev();
          break;
        case 'ArrowRight':
          next();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, prev, next]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Touch/swipe handling
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!isOpen || !currentArtwork) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={(e) => {
        if (e.target === containerRef.current) {
          handleClose();
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute right-4 top-4 z-10 p-2 text-white/80 transition-colors hover:text-white"
        aria-label="Close lightbox"
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      {artworks.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 text-white/80 transition-colors hover:text-white"
          aria-label="Previous image"
        >
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {artworks.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 text-white/80 transition-colors hover:text-white"
          aria-label="Next image"
        >
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main content */}
      <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center">
        {/* Category badge */}
        {showCategoryBadge && (
          <div className="mb-2 rounded-full bg-white/20 px-3 py-1 text-xs text-white">
            {getCategoryDisplayName(currentArtwork.category)}
          </div>
        )}

        {/* Image */}
        <img
          src={currentArtwork.src}
          alt={currentArtwork.title}
          className="max-h-[70vh] max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Metadata */}
        <div className="mt-4 text-center text-white">
          <p className="text-lg font-medium">{currentArtwork.title}</p>
          <p className="mt-1 text-sm opacity-80">
            {[currentArtwork.dimensions, currentArtwork.medium, currentArtwork.year]
              .filter(Boolean)
              .join(' | ')}
          </p>
        </div>

        {/* Image counter */}
        <p className="mt-2 text-xs text-white/60">
          {currentIndex + 1} / {artworks.length}
        </p>
      </div>
    </div>
  );
}
