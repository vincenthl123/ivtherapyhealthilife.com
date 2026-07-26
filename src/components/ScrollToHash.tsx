import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Fait defiler jusqu a l ancre demandee apres une navigation React Router.
 *
 * POURQUOI CE COMPOSANT EXISTE
 *
 * Un <Link to="/sitemap#athlete-pro-max-iv"> ne declenche PAS le defilement natif
 * du navigateur. React Router intercepte le clic et appelle history.pushState :
 * aucun clic d ancre reel n a lieu, donc le navigateur n a rien a faire defiler.
 *
 * Le 26/07, six liens du footer ont ete « repares » en ajoutant les id
 * manquants sur /sitemap — la cible existait enfin, mais le visiteur restait en
 * haut de page. Une passe adversariale l a signale. Poser l id est la moitie du
 * travail ; y aller est l autre moitie.
 *
 * Ce depot utilise <BrowserRouter>, pas un routeur de donnees : <ScrollRestoration>
 * de react-router n est donc pas disponible. D ou ce composant.
 *
 * LE REESSAI N EST PAS DE LA PRECAUTION SUPERFLUE
 *
 * Les routes sont chargees en lazy derriere un <Suspense>. Quand l URL change,
 * la page cible n est pas encore montee et getElementById renvoie null. On
 * reessaie donc sur quelques frames au lieu de supposer que l element est la.
 */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));
    let frames = 0;
    let raf = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        // scroll-mt-* sur la cible compense l en-tete fixe.
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // ~1 s de tolerance, le temps qu une route lazy finisse de se monter.
      // Passe ce delai on abandonne en silence : mieux vaut ne rien faire que
      // faire sauter la page a un moment ou l utilisateur lit deja autre chose.
      if (frames++ < 60) raf = requestAnimationFrame(tryScroll);
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
