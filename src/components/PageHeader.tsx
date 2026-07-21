export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-navy text-paper">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="text-gold font-semibold tracking-widest text-xs uppercase mb-4">
          {eyebrow}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium max-w-2xl leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-paper/70 mt-5 max-w-xl leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  );
}
