import { Star, Users, Globe, Shield, Award, Phone } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";
import { useLanguage } from "@/lib/i18n";

const TrustBanner = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Star,
      value: "5.0",
      label: t("trust.googleRating"),
      highlight: true,
    },
    {
      icon: Users,
      value: "2,500+",
      label: t("trust.patientsTreated"),
    },
    {
      icon: Globe,
      value: "50+",
      label: t("trust.countriesServed"),
    },
    {
      icon: Shield,
      value: "ISO · GMP",
      label: t("trust.certifiedLab"),
    },
    {
      icon: Award,
      value: t("trust.bestClinicValue"),
      label: t("trust.bestClinicLabel"),
    },
  ];

  // Mobile keeps only the 3 strongest conversion signals — rating, volume,
  // award — in a single horizontal row. Countries Served and ISO/GMP stay
  // desktop-only; five wrapped stats plus a call line was reading as clutter
  // on small screens, not proof.
  const mobileStats = [stats[0], stats[1], stats[4]];

  return (
    <section className="bg-secondary/50 py-4 md:py-5 border-y border-border/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Mobile: 3 stats, one row */}
        <div className="grid grid-cols-3 gap-2 md:hidden">
          {mobileStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-1">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <stat.icon className={`w-4 h-4 ${stat.highlight ? 'text-yellow-500 fill-yellow-500' : 'text-primary/70'}`} />
              </div>
              <p className="font-bold text-foreground text-sm leading-tight">
                {stat.value}
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop / tablet: full stat row + call link */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <stat.icon className={`w-5 h-5 ${stat.highlight ? 'text-yellow-500 fill-yellow-500' : 'text-primary/70'}`} />
              </div>
              <div>
                <p className="font-bold text-foreground text-base md:text-lg leading-tight flex items-center gap-1.5">
                  {stat.value}
                  {stat.highlight && (
                    <span className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </span>
                  )}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:flex mt-3 md:mt-4 justify-center">
          <a
            id="ivclick-trustbanner-phone"
            href="tel:+66919991744"
            onClick={() => trackButtonClick('ivclick-trustbanner-phone')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            Call us: +66 91 999 1744
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
