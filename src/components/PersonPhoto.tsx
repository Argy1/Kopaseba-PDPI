import Image from "next/image";

export default function PersonPhoto({
  src,
  alt,
  size = "md",
  tone = "navy",
}: {
  src?: string | null;
  alt?: string;
  size?: "sm" | "md";
  tone?: "navy" | "light";
}) {
  const isLight = tone === "light";

  if (src) {
    return (
      <div className="aspect-4/5 rounded-2xl overflow-hidden relative border border-ink/10">
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          loading="eager"
          className="object-cover"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>
    );
  }

  return (
    <div
      className={`aspect-4/5 rounded-2xl overflow-hidden relative flex items-center justify-center border ${
        isLight ? "bg-navy-light border-ink/10" : "bg-navy-light/10 border-paper/15"
      }`}
    >
      <svg
        width={size === "sm" ? "40" : "72"}
        height={size === "sm" ? "40" : "72"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#B8923F"
        strokeWidth="1.2"
        className="opacity-70"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
      <span
        className={`absolute bottom-3 right-3 text-[10px] uppercase tracking-wide px-2 py-1 rounded-full ${
          isLight ? "bg-ink/5 text-ink/50" : "bg-paper/10 text-paper/70"
        }`}
      >
        Foto menyusul
      </span>
    </div>
  );
}
