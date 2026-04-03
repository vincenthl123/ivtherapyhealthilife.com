import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, GraduationCap, Shield, Stethoscope } from "lucide-react";
import drPetchImage from "@/assets/dr-petch.jpg";
import drFirstImage from "@/assets/dr-first.jpg";
import { useLanguage } from "@/lib/i18n";

const MedicalTeam = () => {
  const { t } = useLanguage();

  const doctors = [
    {
      nameKey: "team.drFirst.name",
      titleKey: "team.drFirst.role",
      image: drFirstImage,
      specialtyKey: "team.drFirst.specialty",
      boardKey: null,
      education: [
        "team.drFirst.edu1",
        "team.drFirst.edu2",
        "team.drFirst.edu3",
        "team.drFirst.edu4"
      ],
      certifications: [
        "team.drFirst.cert1",
        "team.drFirst.cert2",
        "team.drFirst.cert3",
        "team.drFirst.cert4",
        "team.drFirst.cert5",
        "team.drFirst.cert6"
      ]
    },
    {
      nameKey: "team.drPetch.name",
      titleKey: "team.drPetch.role",
      image: drPetchImage,
      specialtyKey: "team.drPetch.specialty",
      boardKey: "team.drPetch.board",
      education: [
        "team.drPetch.edu1",
        "team.drPetch.edu2",
        "team.drPetch.edu3"
      ],
      certifications: [
        "team.drPetch.cert1",
        "team.drPetch.cert2",
        "team.drPetch.cert3",
        "team.drPetch.cert4",
        "team.drPetch.cert5",
        "team.drPetch.cert6"
      ]
    },
  ];

  return (
    <section id="doctors" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            <Stethoscope className="w-3 h-3 mr-1" />
            {t("team.badge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("team.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("team.subtitle")}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {doctors.map((doctor, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
            >
              <CardContent className="p-0">
                {/* Doctor Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={doctor.image}
                    alt={`${t(doctor.nameKey)} - ${t(doctor.specialtyKey)}`}
                    className="aspect-square w-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  {/* Specialty Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {t(doctor.specialtyKey)}
                    </Badge>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {t(doctor.nameKey)}
                    </h3>
                    <p className="text-primary font-medium text-sm">
                      {t(doctor.titleKey)}
                    </p>
                  </div>

                  {/* Education */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{t("team.education")}</span>
                    </div>
                    <ul className="space-y-1">
                      {doctor.education.slice(0, 3).map((eduKey, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {t(eduKey)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{t("team.certifications")}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {doctor.certifications.slice(0, 4).map((certKey, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className="text-[10px] bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {t(certKey).split('–')[0].trim()}
                        </Badge>
                      ))}
                      {doctor.certifications.length > 4 && (
                        <Badge 
                          variant="outline" 
                          className="text-[10px] border-primary/30 text-primary"
                        >
                          +{doctor.certifications.length - 4} {t("team.more")}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>{t("team.trustAAM")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <span>{t("team.trustISSCA")}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>{t("team.trustIntl")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalTeam;
