import imgElephant from "@/assets/clinic-elephant-pool.jpg";
import imgLounge from "@/assets/clinic-lounge.jpg";
import imgPrivateRoom from "@/assets/clinic-private-room.jpg";
import imgEntrance from "@/assets/clinic-entrance.jpg";
import imgDrFirst from "@/assets/dr-first-portrait.jpg";
import imgDrPetch from "@/assets/dr-petch-portrait.jpg";
import imgTeam from "@/assets/clinic-team.jpg";

type Tile = {
  src: string;
  alt: string;
  label: string;
  sub?: string;
  cls: string;
  badge?: boolean;
};

// Bento layout (md = 6 cols): elephant hero anchors the left; rooms top-right;
// doctors as tall portraits; team large; entrance + award fill the proof band.
const tiles: Tile[] = [
  {
    src: imgElephant,
    alt: "Healthi Life — The Urban Longevity House, Ekkamai, Bangkok",
    label: "The Urban Longevity House",
    sub: "Ekkamai · Bangkok",
    cls: "col-span-2 row-span-2 md:col-span-4 md:row-span-2",
  },
  { src: imgLounge, alt: "Healthi Life main lounge", label: "Main Lounge", cls: "col-span-1 md:col-span-2" },
  { src: imgPrivateRoom, alt: "Private treatment suite at Healthi Life", label: "Private Suite", cls: "col-span-1 md:col-span-2" },
  {
    src: imgDrFirst,
    alt: "Dr. First, Chief Medical Officer at Healthi Life",
    label: "Dr. First",
    sub: "Chief Medical Officer",
    cls: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    src: imgDrPetch,
    alt: "Dr. Petch, Longevity & Functional Medicine at Healthi Life",
    label: "Dr. Petch",
    sub: "Longevity & Functional Medicine",
    cls: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  },
  { src: imgTeam, alt: "The Healthi Life medical team", label: "Our Team", cls: "col-span-2 md:col-span-2 md:row-span-2" },
  {
    src: imgEntrance,
    alt: "Entrance of the Healthi Life house in Ekkamai",
    label: "The Entrance",
    cls: "col-span-2 md:col-span-2 md:row-span-2",
  },
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
            A calm, doctor-led space in Ekkamai — from our signature house to the suites where your
            protocol takes place.
          </p>
        </div>

        {/* Bento gallery */}
        <div className="grid grid-cols-2 md:grid-cols-6 grid-flow-row-dense auto-rows-[120px] md:auto-rows-[150px] gap-3 md:gap-4">
          {tiles.map((t) => (
            <figure
              key={t.label}
              className={`group relative overflow-hidden rounded-2xl shadow-sm ${t.cls} ${
                t.badge ? "bg-primary/5 border border-primary/15" : ""
              }`}
            >
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                decoding="async"
                className={`w-full h-full transition-transform duration-500 ${
                  t.badge ? "object-contain p-4" : "object-cover motion-safe:group-hover:scale-105"
                }`}
              />
              {t.badge ? (
                <figcaption className="absolute inset-x-0 bottom-0 text-center pb-2 px-2 text-[11px] font-semibold tracking-wide text-primary">
                  {t.label}
                </figcaption>
              ) : (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent p-3 md:p-4">
                  <p className="text-white text-xs md:text-sm font-semibold leading-tight">{t.label}</p>
                  {t.sub && <p className="text-white/80 text-[10px] md:text-xs">{t.sub}</p>}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinicGallery;
