import Image from "next/image";

export default function Fitur() {
  const data = [
    {
      title: "Stimulasi Kognitif Terstruktur",
      desc: "Latihan daya ingat dan pemecahan masalah yang dirancang khusus untuk mempertahankan ketajaman mental usia matang.",
      img: "/fitur-1.jpg"
    },
    {
      title: "Terapi Aktivitas Fisik Ringan",
      desc: "Gerakan koordinasi tubuh yang aman namun efektif untuk meningkatkan aliran oksigen ke otak dan menjaga kebugaran.",
      img: "/fitur-2.jpg"
    }
  ];

  return (
    <section className="py-24 bg-background border-t border-gray-200/50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col gap-20">
          {data.map((item, i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center gap-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Sisi Gambar */}
              <div className="w-full md:w-1/2 relative h-[350px] rounded-[32px] overflow-hidden shadow-xl border border-white">
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover" 
                />
              </div>

              {/* Sisi Teks */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="w-12 h-1 bg-primary rounded-full"></div>
                <h3 className="text-3xl font-bold text-dark-gray">{item.title}</h3>
                <p className="text-lg text-gray-500 leading-relaxed italic">
                  "{item.desc}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}