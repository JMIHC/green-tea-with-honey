import type { Route } from "./+types/work.drawings";
import { getDrawingsArtworks, getAllArtworks, sortByYear } from "../lib/artwork";
import { LightboxProvider } from "../components/LightboxProvider";
import GalleryGrid from "../components/GalleryGrid";
import CategoryTabs from "../components/CategoryTabs";
import Lightbox from "../components/Lightbox";
import Navigation from "../components/Navigation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Drawings | Luci" },
    { name: "description", content: "Drawings by Luci" },
  ];
}

export default function WorkDrawings() {
  const categoryArtworks = sortByYear(getDrawingsArtworks());
  const allArtworks = sortByYear(getAllArtworks());

  return (
    <LightboxProvider>
      <div className="min-h-screen bg-white text-black">
        <Navigation />
        <main className="px-4 py-8 sm:px-8 lg:px-16">
          <h1 className="mb-8 text-2xl font-light">Drawings</h1>
          <CategoryTabs />
          <GalleryGrid
            artworks={categoryArtworks}
            allArtworks={allArtworks}
            pageCategory="drawings"
          />
        </main>
        <Lightbox />
      </div>
    </LightboxProvider>
  );
}
