import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import drPetchPortrait from "@/assets/dr-petch-portrait.jpg";
import clinicPrivateSuite from "@/assets/clinic-private-room.jpg";

// Founder-quote credibility strip, placed after the programs/services area
// (matching the Stem Cell satellite) — a trust hook where the reader is
// weighing the offer. One consolidated card (badge + photo + name + role +
// slogan + Private Suite photo) instead of loose centered elements stacked
// down the page. Dr. Petch's full bio (credentials, board, certifications)
// already lives in MedicalTeam further down; this section intentionally
// doesn't repeat it.
const DoctorIntro = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary/10" aria-labelledby="doctor-intro-heading">
      <div className="container px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto overflow-hidden border-border/50 shadow-lg">
          <CardContent className="p-6 md:p-8 text-center">
            <Badge variant="outline" className="mb-5 border-primary/30 text-primary">
              <Stethoscope className="w-3 h-3 mr-1" />
              Doctor-Led Care
            </Badge>

            <div className="flex items-center justify-center gap-4">
              <img
                src={drPetchPortrait}
                alt="Dr. Petch, Co-Founder & Chief Medical Strategy Officer at Healthi-Life"
                loading="lazy"
                decoding="async"
                width={72}
                height={72}
                className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full object-cover object-top ring-4 ring-primary/10 shadow-md flex-shrink-0"
              />
              <div className="text-left">
                <p className="font-semibold text-foreground">Dr. Petch</p>
                <p className="text-sm text-muted-foreground">
                  Co-Founder &amp; Chief Medical Strategy Officer
                </p>
              </div>
            </div>

            <h2
              id="doctor-intro-heading"
              className="mt-6 text-2xl md:text-3xl font-bold text-foreground leading-snug"
            >
              &ldquo;Come for recovery, <span className="text-primary">stay for longevity.</span>&rdquo;
            </h2>
          </CardContent>

          <figure className="relative">
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
        </Card>
      </div>
    </section>
  );
};

export default DoctorIntro;
