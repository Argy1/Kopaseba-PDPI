import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Tentang Kami — Kopaseba",
  description:
    "Sejarah, landasan, azas, dan tujuan Koperasi Paru Sejahtera Bahagia (KOPASEBA).",
};

export default function TentangPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang Kopaseba"
        title="Koperasi serba usaha, berlandaskan kekeluargaan."
        description="Mengenal sejarah, landasan, dan tujuan Koperasi Paru Sejahtera Bahagia."
      />

      <section className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        <div>
          <h2 className="font-serif text-2xl font-medium text-navy mb-4">Sejarah</h2>
          <p className="text-ink/70 leading-relaxed">
            KOPASEBA berawal dari kerja sama Perhimpunan Dokter Paru Indonesia
            (PDPI) dengan PT Indofarma pada tahun 2011. Saat itu terbit
            peraturan yang menegaskan bahwa organisasi profesi tidak boleh
            mencari keuntungan lewat usaha niaga/jasa secara langsung, sehingga
            dibentuklah KOPASEBA sebagai badan usaha tersendiri milik PDPI,
            dengan Ketua pertama Dr. M. Arifin Nawas, Sp.P(K), masa
            kepengurusan 2011–2023. Anggaran Dasar dan Anggaran Rumah Tangga
            koperasi pertama kali ditetapkan pada 8 September 2008, dan telah
            direvisi pada Konferensi Kerja 2023.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-medium text-navy mb-4">
            Landasan, azas &amp; prinsip
          </h2>
          <p className="text-ink/70 leading-relaxed mb-4">
            Koperasi berlandaskan Pancasila dan Undang-Undang Dasar 1945, serta
            berazaskan kekeluargaan. Koperasi melaksanakan prinsip:
          </p>
          <ul className="space-y-2 text-ink/70">
            {[
              "Keanggotaan adalah seluruh anggota PDPI.",
              "Pengelolaan dilakukan secara demokratis.",
              "Pembagian Sisa Hasil Usaha (SHU) dilakukan secara adil sebanding dengan besarnya jasa usaha masing-masing anggota.",
              "Pemberian balas jasa yang terbatas terhadap modal.",
              "Kemandirian.",
              "Pendidikan perkoperasian bagi anggota.",
              "Kerjasama antar koperasi.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-gold">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-2xl font-medium text-navy mb-4">
            Fungsi, peran &amp; tujuan
          </h2>
          <p className="text-ink/70 leading-relaxed mb-4">
            KOPASEBA merupakan koperasi serba usaha yang berfungsi untuk
            membangun dan mengembangkan potensi dan kemampuan anggota
            khususnya, dan masyarakat pada umumnya, untuk meningkatkan
            kesejahteraan ekonomi dan sosial. Koperasi bertujuan mewujudkan
            kesejahteraan anggota dan kelangsungan hidup organisasi profesi
            PDPI.
          </p>
          <p className="text-ink/70 leading-relaxed">
            Koperasi berperan aktif mempertinggi kualitas kehidupan masyarakat,
            memperkokoh perekonomian rakyat sebagai dasar kekuatan ketahanan
            perekonomian nasional, serta mewujudkan perekonomian nasional atas
            azas kekeluargaan dan demokrasi ekonomi.
          </p>
        </div>
      </section>
    </>
  );
}
