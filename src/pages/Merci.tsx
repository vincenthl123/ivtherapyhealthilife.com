import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackStandardEvent } from "@/lib/standard-events";

/**
 * /merci — page d aboutissement du formulaire de reservation.
 *
 * POURQUOI ELLE EXISTE
 *
 * Ce satellite portait 2 points d entree vers /book (reecrit vers Fillout
 * par vercel.json) et AUCUNE mesure d aboutissement. On savait donc combien de
 * gens partaient vers le formulaire, jamais combien allaient au bout : le
 * chiffre qui compte n existait pas dans GA4. Seul le satellite skin avait
 * cette page ; elle est portee ici a l identique.
 *
 * ⚠️ ELLE NE SE DECLENCHE PAS TOUTE SEULE
 *
 * Fillout doit etre configure pour rediriger vers /merci apres soumission
 * (tableau de bord Fillout → Settings → After submit → Redirect). Sans cette
 * configuration, la page existe et n est jamais atteinte : le compteur reste
 * a zero et on croira a tort que personne ne convertit.
 *
 * L evenement porte le meme nom que sur skin — form_submit — pour que les deux
 * satellites soient comparables dans le meme rapport.
 */
const Merci = memo(() => {
  useEffect(() => {
    document.title = "Thank You – IV Therapy Request Received | Healthi Life";
    trackStandardEvent("form_submit", {
      event_category: "engagement",
      event_label: "iv_booking",
      form_id: "iv_booking",
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-20 md:py-32">
      <div className="w-full max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
          <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden="true" strokeWidth={2.5} />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Thank you
        </h1>
        <p className="text-lg md:text-xl text-primary font-semibold mb-6">
          Your IV therapy request has been received
        </p>

        <div className="space-y-4 text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10">
          <p>
            Our team will review your request and contact you shortly to confirm the details of
            your appointment.
          </p>
          <p className="text-sm">
            Please check your inbox, including the spam folder. For anything urgent you can reach
            us directly on WhatsApp.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" />
              Return to homepage
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://wa.me/66919991744"
              target="_blank"
              rel="noopener noreferrer"
              data-wa-source="merci"
              data-wa-label="Merci"
            >
              <MessageCircle className="h-5 w-5 mr-2" aria-hidden="true" />
              Message us on WhatsApp
            </a>
          </Button>
        </div>

        <p className="mt-10 text-xs text-muted-foreground/80">
          Healthi Life Longevity Center · Ekkamai, Bangkok
        </p>
      </div>
    </div>
  );
});

Merci.displayName = "Merci";

export default Merci;
