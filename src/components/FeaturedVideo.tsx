import { useState } from "react";
import { Play } from "lucide-react";
import { trackButtonClick } from "@/lib/tracking";

/**
 * Featured IV-therapy explainer. Landscape (16:9), so it lives here rather than
 * in the 9:16 Shorts triptych of VideoTestimonials.
 *
 * Click-to-play facade: the YouTube iframe is only mounted on click, so the
 * page does not pay ~1MB of player JS on first paint — this is a paid-traffic
 * landing page and the hero image is the LCP element.
 */
const VIDEO_ID = "wrh6TbONr-M";
const VIDEO_TITLE = "Unlock Your Energy & Vitality — IV Drip Therapy at Healthi-Life Bangkok";

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "@id": `https://ivtherapyhealthilife.com/#video-${VIDEO_ID}`,
  name: VIDEO_TITLE,
  description:
    "How IV drip therapy works at Healthi-Life Longevity Center in Ekkamai, Bangkok: physician assessment, protocol selection, and what a session looks like.",
  thumbnailUrl: [
    `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`,
  ],
  contentUrl: `https://www.youtube.com/watch?v=${VIDEO_ID}`,
  embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    "@id": "https://ivtherapyhealthilife.com/#org",
    name: "Healthi-Life IV Therapy Bangkok",
  },
};

const FeaturedVideo = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="py-16 md:py-20" aria-labelledby="featured-video-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            See It For Yourself
          </span>
          <h2
            id="featured-video-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Unlock Your Energy &amp; Vitality
          </h2>
          <p className="text-lg text-muted-foreground">
            A look inside IV drip therapy at our Bangkok clinic — how a session runs, and
            who it is for.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {playing ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title={VIDEO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                trackButtonClick("featured-video-iv-explainer");
                setPlaying(true);
              }}
              className="group relative block w-full aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label={`Play video: ${VIDEO_TITLE}`}
            >
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt="IV drip therapy at Healthi-Life Longevity Center, Bangkok"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  <Play
                    className="h-10 w-10 md:h-12 md:w-12 text-primary-foreground ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;
