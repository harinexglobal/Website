import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="surface-navy on-navy flex min-h-[70vh] items-center">
      <div className="container relative text-center">
        <p className="font-display text-6xl font-extrabold tracking-tight text-emerald-400 sm:text-7xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          This page could not be found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-slate-300">
          The link may be out of date, or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center rounded-lg bg-saffron-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-saffron-600"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
