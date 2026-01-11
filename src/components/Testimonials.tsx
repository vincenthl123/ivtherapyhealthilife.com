import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const testimonials = [
  {
    name: "James O'Connell",
    city: "Los Angeles",
    country: "USA",
    text: "After years of living with knee pain from an old sports injury, I finally found relief at Healthi-Life. The stem cell therapy not only reduced my inflammation but restored mobility I hadn't had in years. I'm walking without pain—and even jogging again. Truly life-changing.",
    rating: 5,
    initials: "JO",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Meera Kapoor",
    city: "Singapore City",
    country: "Singapore",
    text: "Healthi-Life gave me more than just a refreshed appearance—it gave me confidence. After one month, I noticed firmer skin, deeper sleep, and better focus. The stem cell therapy felt like a reset button for my whole body. Highly recommended for anyone serious about graceful aging.",
    rating: 5,
    initials: "MK",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Nathalie Dufresne",
    city: "Paris",
    country: "France",
    text: "I was told I had poor egg quality and limited chances with IVF. But after undergoing the fertility stem cell program at Healthi-Life, my hormone levels improved significantly. I felt energized, balanced, and within two months—I received a positive pregnancy test. Forever grateful!",
    rating: 5,
    initials: "ND",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Richard Chen",
    city: "Hong Kong",
    country: "China",
    text: "At 58, I was feeling the effects of aging—low energy, brain fog, and joint stiffness. After my anti-aging stem cell treatment at Healthi-Life, I feel 15 years younger. My energy levels are through the roof, my skin looks healthier, and I'm back to playing tennis every week. This is real regenerative medicine.",
    rating: 5,
    initials: "RC",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Sophie Williams",
    city: "Sydney",
    country: "Australia",
    text: "I came to Healthi-Life for their anti-aging stem cell program after researching clinics across Asia. The results exceeded my expectations—my wrinkles have softened, my hair is thicker, and I have mental clarity I haven't experienced in years. Dr. Petch and the team are exceptional professionals.",
    rating: 5,
    initials: "SW",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
];

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Testimonials Grid - First Row (3 items) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border relative overflow-hidden"
            >
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-medical opacity-10 rounded-full" />
              <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/30" />
              <Avatar className="absolute top-4 right-4 h-12 w-12 border-2 border-primary/20 shadow-sm">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback className="bg-gradient-medical text-white font-semibold text-sm">
                  {testimonial.initials}
                </AvatarFallback>
              </Avatar>
              <CardContent className="p-6 pt-14">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.city}, {testimonial.country}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid - Second Row (2 items centered) */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {testimonials.slice(3, 5).map((testimonial, index) => (
            <Card
              key={index + 3}
              className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border relative overflow-hidden"
            >
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-medical opacity-10 rounded-full" />
              <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/30" />
              <Avatar className="absolute top-4 right-4 h-12 w-12 border-2 border-primary/20 shadow-sm">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback className="bg-gradient-medical text-white font-semibold text-sm">
                  {testimonial.initials}
                </AvatarFallback>
              </Avatar>
              <CardContent className="p-6 pt-14">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.city}, {testimonial.country}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-medical bg-clip-text text-transparent mb-2">
              5.0
            </div>
            <p className="text-sm text-muted-foreground">{t("testimonials.googleRating")}</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-medical bg-clip-text text-transparent mb-2">
              2,500+
            </div>
            <p className="text-sm text-muted-foreground">{t("testimonials.patientsTreated")}</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-medical bg-clip-text text-transparent mb-2">
              50+
            </div>
            <p className="text-sm text-muted-foreground">{t("testimonials.countriesServed")}</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-medical bg-clip-text text-transparent mb-2">
              🏆
            </div>
            <p className="text-sm text-muted-foreground">{t("testimonials.bestClinic")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
