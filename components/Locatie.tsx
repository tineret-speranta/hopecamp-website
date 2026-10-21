import { upcomingEditions } from "@/lib/constants";
import Link from "next/link";

export default function Locatie() {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-archivo text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#1a1a1a] mb-12">
          Locații
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {upcomingEditions.map((edition) => (
            <div key={edition.name}>
              <h3 className="font-archivo text-2xl sm:text-3xl uppercase tracking-tight text-[#1a1a1a] mb-2">
                {edition.name} #{edition.number}:<br />
                <span className="text-[#FFD600]">{edition.location.name}</span>, {edition.location.addressLine}
              </h3>
              <div className="my-6">
                <iframe
                  className="w-full h-72 sm:h-80 border-2 border-gray-200"
                  src={edition.location.iframeSrc}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <Link
                href={edition.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 bg-[#1a1a1a] text-white text-sm font-bold uppercase tracking-wider hover:bg-[#333] transition-colors"
              >
                Vezi pe Google Maps →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
