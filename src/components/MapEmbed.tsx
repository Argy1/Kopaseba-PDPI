export default function MapEmbed({ src }: { src: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-ink/10 h-80 md:h-96">
      <iframe
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Lokasi sekretariat Kopaseba"
        className="w-full h-full border-0"
      />
    </div>
  );
}
