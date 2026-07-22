export default function IconBadge({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "sky" | "navy";
}) {
  const toneClass = {
    gold: "bg-gold-light",
    sky: "bg-sky-light",
    navy: "bg-navy-light",
  }[tone];

  return (
    <div className={`w-11 h-11 rounded-full ${toneClass} flex items-center justify-center`}>
      {children}
    </div>
  );
}
