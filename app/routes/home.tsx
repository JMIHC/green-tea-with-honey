import type { Route } from "./+types/home";
import { Link } from "react-router";
import logo from "../assets/brand/logo.svg";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Luci" },
    { name: "description", content: "Luci" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_NETLIFY || "Running locally" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="px-4 pt-4 pb-2 sm:px-8 sm:pt-6 sm:pb-3 lg:px-16">
        <img src={logo} alt="Luci" className="h-auto w-full max-w-3xl" />
      </div>
      <div className="px-4 pb-8 sm:px-8 lg:px-16">
        <main className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest mb-4 font-normal">About</h2>
            <p className="text-base leading-relaxed font-light">
              Art!
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest mb-4 font-normal">Work</h2>
            <Link to="/work" className="text-base hover:underline">
              View Gallery
            </Link>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-4 font-normal">Contact</h2>
            <a href="mailto:luciart222@gmail.com" className="text-base font-light">luciart222@gmail.com</a>
          </section>
        </main>
      </div>
    </div>
  );
}
