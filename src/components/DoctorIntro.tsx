import { Badge } from "@/components/ui/badge";
import { Stethoscope } from "lucide-react";
import drPetchPortrait from "@/assets/dr-petch-portrait.jpg";
import clinicPrivateSuite from "@/assets/clinic-private-room.jpg";

// Founder-quote credibility strip, placed right after the hero/trust banner —
// a fast trust hook before the reader hits the video. Dr. Petch's full bio
// (credentials, board, certifications) already lives in MedicalTeam further
// down the page; this section intentionally doesn't repeat it.
const DoctorIntro = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary/10" aria-labelledby="doctor-intro-heading">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
            <Stethoscope className="w-3 h-3 mr-1" />
            Doctor-Led Care
          </Badge>
          <img
            src={drPetchPortrait}
            alt="Dr. Petch, Co-Founder & Chief Medical Strategy Officer at Healthi-Life"
            loading="lazy"
            decoding="async"
            width={112}
            height={112}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover object-top mx-auto mb-4 ring-4 ring-primary/10 shadow-md"
          />
          <p className="font-semibold text-foreground">Dr. Petch</p>
          <p className="text-sm text-muted-foreground mb-6">
            Co-Founder &amp; Chief Medical Strategy Officer
          </p>
          <h2
            id="doctor-intro-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-snug"
          >
            &ldquo;Come for recovery, <span className="text-primary">stay for longevity.</span>&rdquo;
          </h2>
        </div>

        <figure className="max-w-3xl mx-auto mt-10 md:mt-12 relative overflow-hidden rounded-2xl shadow-lg">
          <img
            src={clinicPrivateSuite}
            alt="Private treatment suite at Healthi Life"
            loading="lazy"
            decoding="async"
            className="w-full aspect-[16/9] object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent p-4">
            <p className="text-white text-sm md:text-base font-semibold">Private Suite</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default DoctorIntro;
