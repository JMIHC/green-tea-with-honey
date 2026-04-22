import type { Route } from "./+types/work.paintings";
import { getPaintingsArtworks, getAllArtworks, sortByYear } from "../lib/artwork";
import { LightboxProvider } from "../components/LightboxProvider";
import GalleryGrid from "../components/GalleryGrid";
import CategoryTabs from "../components/CategoryTabs";
import Lightbox from "../components/Lightbox";
import Navigation from "../components/Navigation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Paintings | Luci" },
    { name: "description", content: "Paintings by Luci" },
  ];
}

export default function WorkPaintings() {
  const categoryArtworks = sortByYear(getPaintingsArtworks());
  const allArtworks = sortByYear(getAllArtworks());

  return (
    <LightboxProvider>
      <div className="min-h-screen bg-white text-black">
        <Navigation />
        <main className="px-4 py-8 sm:px-8 lg:px-16">
          <h1 className="mb-8 text-2xl font-light">Paintings</h1>
          <CategoryTabs />
          <GalleryGrid
            artworks={categoryArtworks}
            allArtworks={allArtworks}
            pageCategory="paintings"
          />
        </main>
        <Lightbox />
      </div>
    </LightboxProvider>
  );
}
