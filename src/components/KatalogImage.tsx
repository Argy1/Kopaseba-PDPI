import Image from "next/image";

export default function KatalogImage({
  mediaId,
  alt,
  aspect = "aspect-4/3",
}: {
  mediaId: number | null;
  alt: string;
  aspect?: string;
}) {
  if (mediaId) {
    return (
      <div className={`${aspect} rounded-xl overflow-hidden relative border border-ink/10 bg-white`}>
        <Image src={`/api/media/${mediaId}`} alt={alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
      </div>
    );
  }

  return (
    <div className={`${aspect} rounded-xl overflow-hidden relative flex items-center justify-center border border-ink/10 bg-sky-light`}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1F5FA8" strokeWidth="1.2" className="opacity-60">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
}
