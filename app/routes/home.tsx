import type { Route } from "./+types/home";
import InstagramFeed from "../components/InstagramFeed";
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
    <div className="min-h-screen bg-white text-black p-16">
      <header className="mb-16">
        <img src={logo} alt="Luci" className="w-full max-w-2xl mb-4" />
      </header>
      
      <main className="max-w-4xl">
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest mb-4 font-normal">About</h2>
          <p className="text-base leading-relaxed font-light">
            Art!
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest mb-4 font-normal">Work</h2>
          <ul className="space-y-2">
            <li className="text-base">Project One</li>
            <li className="text-base">Project Two</li>
            <li className="text-base">Project Three</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xs uppercase tracking-widest mb-4 font-normal">Contact</h2>
          <p className="text-base font-light">hello@example.com</p>
        </section>
      </main>
    </div>
  )
}
