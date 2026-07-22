type TimelineEntry = {
  id: number | string;
  tahun: string;
  tanggal?: string | null;
  judul: string;
  deskripsi: string;
};

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative border-l border-gold/30 pl-8 space-y-10">
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span className="absolute -left-[calc(2rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-gold" />
          <p className="font-serif text-lg text-gold-dark font-medium">{entry.tahun}</p>
          <h3 className="font-medium text-navy mt-1">{entry.judul}</h3>
          {entry.tanggal && (
            <p className="text-xs text-ink/45 uppercase tracking-wide mt-0.5">{entry.tanggal}</p>
          )}
          <p className="text-sm text-ink/70 leading-relaxed mt-2">{entry.deskripsi}</p>
        </li>
      ))}
    </ol>
  );
}
