import Link from "next/link";

export default function CTASection({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="bg-navy rounded-3xl px-8 md:px-16 py-16 text-center relative overflow-hidden">
        <svg
          className="absolute -bottom-16 -left-16 opacity-10"
          width="300"
          height="300"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="95" stroke="#F7F6F2" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" stroke="#F7F6F2" strokeWidth="0.5" />
        </svg>
        <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-4 relative">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-paper max-w-2xl mx-auto relative">
          {title}
        </h2>
        {description && (
          <p className="text-paper/75 mt-5 max-w-xl mx-auto relative">{description}</p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 relative">
          <Link
            href={primary.href}
            className="inline-block bg-gold text-white px-8 py-3.5 rounded-full font-medium hover:bg-gold-dark transition"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-block text-paper/80 font-medium hover:text-paper transition"
            >
              {secondary.label} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
