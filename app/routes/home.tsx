import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lucifer portfolio" },
    { name: "description", content: "Luci's portfolio" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_NETLIFY || "Running locally" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen bg-white text-black p-16">
      <header className="mb-16">
        <h1 className="text-6xl font-black uppercase tracking-tight leading-none mb-4">Lucifer</h1>
        <p className="text-sm uppercase tracking-widest">Portfolio</p>
      </header>
      
      <main className="max-w-4xl">
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest mb-4 font-normal">About</h2>
          <p className="text-base leading-relaxed font-light">
            Art!
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest mb-4 font-normal">Portfolio</h2>
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
