type LegalitasDoc = {
  judul: string;
  keterangan: string;
  pasal?: string | null;
  catatan?: string | null;
};

export default function DocumentCard({ doc }: { doc: LegalitasDoc }) {
  return (
    <div className="bg-white border border-ink/10 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 shrink-0 rounded-full bg-navy-light flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14335C" strokeWidth="1.5">
              <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
              <path d="M14 3v5h5" />
              <path d="M9 13h6M9 17h6" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-navy">{doc.judul}</h3>
            <p className="text-sm text-ink/60 mt-1 leading-relaxed">{doc.keterangan}</p>
            {doc.pasal && (
              <span className="inline-block mt-3 text-xs text-sky bg-sky-light rounded-full px-3 py-1">
                {doc.pasal}
              </span>
            )}
            {doc.catatan && (
              <p className="text-xs text-ink/45 mt-2 leading-relaxed italic">{doc.catatan}</p>
            )}
          </div>
        </div>
        <span className="text-xs text-ink/40 shrink-0 mt-1 whitespace-nowrap">Dokumen resmi</span>
      </div>
    </div>
  );
}
