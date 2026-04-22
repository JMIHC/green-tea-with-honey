export type Category = 'digital' | 'drawings' | 'mixed-media' | 'paintings';

export interface Artwork {
  id: string;
  src: string;
  title: string;
  dimensions: string;
  medium: string;
  year: string;
  category: Category;
}

export interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  artworks: Artwork[];
  pageCategory: Category | 'all';
}
