export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-white">
      <div className="text-center max-w-xl">
        <h1 className="text-8xl font-black text-black tracking-tighter leading-none mb-8">404</h1>
        <p className="text-xs uppercase tracking-[0.15em] text-black mb-4">Page Not Found</p>
        <p className="text-black mb-12 text-sm font-light">
          The requested page does not exist.
        </p>
        <a href="/" className="inline-block text-xs uppercase tracking-[0.1em] text-black border-b border-black hover:border-b-2 transition-none">
          Return Home
        </a>
      </div>
    </div>
  );
}