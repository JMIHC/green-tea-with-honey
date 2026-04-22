import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Artwork, Category } from '../lib/types';

interface LightboxContextValue {
  isOpen: boolean;
  currentIndex: number;
  artworks: Artwork[];
  pageCategory: Category | 'all';
  open: (index: number, artworks: Artwork[], pageCategory: Category | 'all') => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [pageCategory, setPageCategory] = useState<Category | 'all'>('all');

  const open = useCallback((index: number, arts: Artwork[], pageCat: Category | 'all') => {
    setArtworks(arts);
    setCurrentIndex(index);
    setPageCategory(pageCat);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex(i => (i + 1) % artworks.length);
  }, [artworks.length]);

  const prev = useCallback(() => {
    setCurrentIndex(i => (i - 1 + artworks.length) % artworks.length);
  }, [artworks.length]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <LightboxContext.Provider value={{
      isOpen,
      currentIndex,
      artworks,
      pageCategory,
      open,
      close,
      next,
      prev,
      goTo
    }}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
}
