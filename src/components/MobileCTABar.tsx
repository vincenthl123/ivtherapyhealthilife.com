import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { buildWaUrl } from "@/lib/whatsapp";
import { trackButtonClick, trackCallClick, trackWhatsAppClick } from "@/lib/tracking";

// Reveal only after the visitor scrolls past the hero. The hero already
// carries a primary WhatsApp CTA + an outline Book CTA — showing this bar
// on top of that from the first frame was 4 competing conversion points on
// the very first thing a visitor sees. One threshold (80% of the viewport
// height, roughly the hero's own height) keeps this simple and avoids
// wiring a ref/IntersectionObserver across component boundaries.
const REVEAL_AT_RATIO = 0.8;

/**
 * Barre de canaux, mobile uniquement.
 *
 * POURQUOI ELLE EXISTE, ET POURQUOI LA BULLE SE MASQUE EN MEME TEMPS
 *
 * La bulle WhatsApp flottante est un point d entree UNIQUE : elle ne propose
 * que le chat. Cette barre propose un CHOIX de canal, ce qui est le besoin
 * reel — le visiteur qui ne veut pas ouvrir WhatsApp a froid n avait aucune
 * porte de sortie.
 *
 * Les deux ne peuvent pas coexister en mobile : la bulle est a 16 px du bas,
 * donc DANS la zone de cette barre, et au meme z-50. Sur le satellite
 * check-up, ou les deux tournent deja, la bulle recouvre le bouton de droite.
 * Le LANCEUR rond de WhatsAppWidget (bouton vert persistant) est donc masque
 * sous md et cette barre le remplace ; au-dessus de md c est l inverse, il n y
 * a pas de barre et le lanceur reprend son role. Le POPUP de bienvenue
 * auto-declenche de WhatsAppWidget (30s / 50% scroll) est une surface
 * differente et reste actif sur mobile aussi — seul le bouton vert persistant
 * est concerne par ce masquage.
 *
 * Cette barre elle-meme ne s affiche qu apres le hero (scroll > 80% de la
 * hauteur d ecran) pour ne pas empiler un 3e/4e point de conversion sur la
 * toute premiere chose vue par le visiteur — le hero porte deja son propre
 * CTA WhatsApp primaire + Book en outline.
 *
 * TRACKING (zone John — lecture attentive avant de modifier)
 *
 * La source WhatsApp est "sticky", volontairement distincte de "widget".
 * Reutiliser "widget" aurait confondu les deux points d entree dans les
 * rapports — c est le defaut constate sur le check-up, dont le bouton
 * sticky-whatsapp emet data-wa-label="Floating Widget". Le total des clics ne
 * change pas ; leur ventilation devient exacte.
 *
 * Le troisieme bouton (formulaire) arrive avec le formulaire lui-meme. Un
 * bouton qui ne mene nulle part serait pire que son absence.
 */
const MobileCTABar = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * REVEAL_AT_RATIO) {
        setRevealed(true);
      } else {
        setRevealed(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
  <div
    className={`fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border
               bg-background/95 backdrop-blur-sm px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]
               transition-transform duration-300 ${revealed ? "translate-y-0" : "translate-y-full"}`}
    role="group"
    aria-label="Contact"
  >
    <div className="flex gap-2">
      <a
        href="tel:+66919991744"
        aria-label="Appeler le +66 91 999 1744"
        onClick={() => {
          trackButtonClick("sticky-call");
          trackCallClick("sticky");
        }}
        className="flex-none inline-flex h-11 w-12 items-center justify-center rounded-md
                   border border-border text-foreground hover:bg-muted transition-colors"
      >
        <Phone className="h-4 w-4" />
      </a>

      {/* data-wa-skip="1" est indispensable : sans lui, wa-interceptor.ts
          avale ce clic. Il ecoute en phase de CAPTURE sur document, fait
          preventDefault() + stopPropagation(), et reconstruit l URL avec
          source "default". Le onClick ci-dessous ne s executerait jamais
          (React 18 delegue a la racine, donc APRES la capture sur document)
          et la source "sticky" serait perdue — l inverse exact de ce que
          cette barre existe pour faire. Hero.tsx, Contact.tsx et
          WhatsAppWidget.tsx portent tous cet opt-out ; je l avais oublie. */}
      <a
        href={buildWaUrl({ source: "sticky", extras: { sourceLabel: "Mobile CTA bar" } })}
        target="_blank"
        rel="noopener noreferrer"
        data-wa-skip="1"
        data-wa-source="sticky"
        data-wa-label="Mobile CTA bar"
        onClick={() => {
          trackButtonClick("sticky-whatsapp");
          trackWhatsAppClick({ source: "sticky" });
        }}
        className="flex-1 inline-flex h-11 items-center justify-center rounded-md
                   bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        WhatsApp
      </a>
    </div>
  </div>
  );
};

export default MobileCTABar;
