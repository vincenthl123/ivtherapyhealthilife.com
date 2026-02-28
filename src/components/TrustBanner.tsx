import { Star, Users, Globe, Shield, Award } from "lucide-react";
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

  return (
    <section className="bg-foreground py-3 md:py-5 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 md:gap-10 lg:gap-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 md:gap-3 text-background group"
            >
              <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.highlight ? 'text-yellow-400' : 'text-background/70'} group-hover:scale-110 transition-transform`} />
              <div className="text-center md:text-left">
                <p className={`font-bold text-lg md:text-xl leading-tight ${stat.highlight ? 'text-yellow-400' : 'text-background'}`}>
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-background/70 whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
