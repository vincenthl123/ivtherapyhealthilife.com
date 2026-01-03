import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, GraduationCap, Shield, Stethoscope } from "lucide-react";
import drPetchImage from "@/assets/dr-petch.jpg";
import drFirstImage from "@/assets/dr-first.jpg";

const doctors = [
  {
    name: "Dr. Petch (Sarassawadee Suwanjinda)",
    title: "Founder & Lifestyle Medicine Specialist - MD",
    image: drPetchImage,
    specialty: "Lifestyle Medicine Specialist & Anti-Aging",
    education: [
      "Medical Physician",
      "Internship Training at Police General Hospital",
      "Internship Training at Ananda Mahidol Hospital"
    ],
    certifications: [
      "Certificate in Aesthetic Medicine – AAAM",
      "Member of American Academy of Aesthetic Medicine",
      "Certificate in IV Nutrition Infusion Therapy – CBAM",
      "Certificate in Allogeneic Cellular Therapy – ISSCA",
      "HEAT International Congress on Wellness Management",
      "Nutraceutical Certificate – Thai Traditional Medicine"
    ]
  },
  {
    name: "Dr. First (Napat Hunsajarupan)",
    title: "Founder MD, Dermatologist",
    image: drFirstImage,
    specialty: "Dermatology & Aesthetic Medicine",
    education: [
      "MSc. Dermatology – CICM, Thammasat University",
      "Doctor of Medicine (M.D.) – Thammasat University",
      "General Practitioner – Royal Thai Army Medical Dept",
      "Dermatology OPD – Benchakitti Park Hospital"
    ],
    certifications: [
      "Certificate in Aesthetic Medicine – AAAM",
      "Member of American Academy of Aesthetic Medicine",
      "Practical Cell Therapy Symposium",
      "American Board of Laser Surgery",
      "Integrative Botulinum Injection – Rassapoom Institute",
      "Nutraceutical Certificate – Thai Traditional Medicine"
    ]
  }
];

const MedicalTeam = () => {
  return (
    <section id="doctors" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            <Stethoscope className="w-3 h-3 mr-1" />
            World-Class Medical Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Your <span className="text-primary">Expert Physicians</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our internationally certified doctors combine decades of experience in regenerative medicine, 
            aesthetic procedures, and longevity science to deliver personalized treatment plans.
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
                    alt={`${doctor.name} - ${doctor.specialty}`}
                    className="aspect-square w-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  
                  {/* Specialty Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {doctor.specialty}
                    </Badge>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-primary font-medium text-sm">
                      {doctor.title}
                    </p>
                  </div>

                  {/* Education */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">Education & Training</span>
                    </div>
                    <ul className="space-y-1">
                      {doctor.education.slice(0, 3).map((edu, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">Key Certifications</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {doctor.certifications.slice(0, 4).map((cert, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className="text-[10px] bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {cert.split('–')[0].trim()}
                        </Badge>
                      ))}
                      {doctor.certifications.length > 4 && (
                        <Badge 
                          variant="outline" 
                          className="text-[10px] border-primary/30 text-primary"
                        >
                          +{doctor.certifications.length - 4} more
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
            <span>AAAM Certified Physicians</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            <span>ISSCA Stem Cell Specialists</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span>International Training</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalTeam;
