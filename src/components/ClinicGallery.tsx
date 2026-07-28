import imgEntrance from "@/assets/clinic-entrance.jpg";
import imgLounge from "@/assets/clinic-lounge.jpg";
import imgPrivateRoom from "@/assets/clinic-private-room.jpg";

type Tile = {
  src: string;
  alt: string;
  label: string;
};

// The patient's real path through the house: arrival, waiting, treatment.
// Doctors and team already have their own section (MedicalTeam.tsx) right
// after this one — no need to duplicate them here.
const tiles: Tile[] = [
  { src: imgEntrance, alt: "Entrance of the Healthi Life house in Ekkamai", label: "The Entrance" },
  { src: imgLounge, alt: "Healthi Life main lounge", label: "Main Lounge" },
  { src: imgPrivateRoom, alt: "Private treatment suite at Healthi Life", label: "Private Suite" },
];

const ClinicGallery = () => {
  return (
    <section id="our-house" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Inside the House
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            A private house for longevity
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            A calm, doctor-led space in Ekkamai — from arrival to the suites where your
            protocol takes place.
          </p>
        </div>

        {/* 3-image gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {tiles.map((t) => (
            <figure
              key={t.label}
              className="group relative overflow-hidden rounded-2xl shadow-sm aspect-[4/3]"
            >
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent p-3 md:p-4">
                <p className="text-white text-sm md:text-base font-semibold leading-tight">{t.label}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinicGallery;
