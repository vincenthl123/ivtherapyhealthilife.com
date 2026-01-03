import { useState, useCallback } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const videoTestimonials = [
  {
    id: "0q0ht-nms4w",
    title: "Dr. Petch - Founder & Lifestyle Medicine",
    subtitle: "Meet Our Founder",
    description: "Dr. Petch introduces our holistic approach to regenerative medicine and longevity.",
    duration: "PT1M30S",
    uploadDate: "2024-01-15T00:00:00+07:00",
    transcript: "Welcome to Healthi-Life Longevity Center. I'm Dr. Petch, founder and lifestyle medicine specialist. Our approach combines cutting-edge regenerative medicine with personalized wellness protocols to help you achieve optimal health and longevity.",
    inLanguage: "en",
  },
  {
    id: "acuxB5dBjqw",
    title: "Blake from USA - Human Performance Enhancement",
    subtitle: "Human Performance",
    description: "Patient testimonial: Enhancing athletic performance with regenerative medicine at Healthi-Life Bangkok.",
    duration: "PT1M45S",
    uploadDate: "2024-03-10T00:00:00+07:00",
    transcript: "I'm Blake from the USA. As an athlete, I wanted to optimize my performance naturally. Healthi-Life's regenerative treatments helped me recover faster and perform better. Highly recommend for anyone serious about their health.",
    inLanguage: "en",
  },
  {
    id: "Q0-FuK5CViA",
    title: "Angelica from Philippines - Stem Cell Knee Treatment",
    subtitle: "Stem Cell Knee Treatment",
    description: "Patient testimonial: Recovery journey with stem cell therapy for knee pain at Healthi-Life Longevity Center Bangkok.",
    duration: "PT2M00S",
    uploadDate: "2024-02-20T00:00:00+07:00",
    transcript: "Hi, I'm Angelica from the Philippines. I came to Healthi-Life for stem cell treatment for my knee. After years of pain, I can now walk and exercise without discomfort. The team was amazing and the results exceeded my expectations.",
    inLanguage: "en",
  },
];

// VideoObject Schema for SEO with accessibility
const generateVideoSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": videoTestimonials.map((video, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "VideoObject",
      "@id": `https://stemcellhealthilife.com/#video-${video.id}`,
      "name": video.title,
      "description": video.description,
      "thumbnailUrl": `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
      "uploadDate": video.uploadDate,
      "duration": video.duration,
      "contentUrl": `https://www.youtube.com/watch?v=${video.id}`,
      "embedUrl": `https://www.youtube.com/embed/${video.id}`,
      "inLanguage": video.inLanguage,
      "transcript": video.transcript,
      "accessibilityFeature": ["captions", "transcript"],
      "accessibilityHazard": "noFlashingHazard",
      "accessibilitySummary": "Video includes captions and transcript for accessibility",
      "publisher": {
        "@type": "Organization",
        "name": "Healthi-Life Longevity Center",
        "logo": {
          "@type": "ImageObject",
          "url": "https://stemcellhealthilife.com/og-image.jpg"
        }
      },
      "potentialAction": {
        "@type": "WatchAction",
        "target": `https://www.youtube.com/watch?v=${video.id}`
      }
    }
  }))
});

const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<string>>(new Set());

  const handleThumbnailLoad = useCallback((id: string) => {
    setLoadedThumbnails(prev => new Set(prev).add(id));
  }, []);

  const openLightbox = useCallback((videoId: string) => {
    setSelectedVideo(videoId);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  return (
    <>
      {/* VideoObject Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateVideoSchema()) }}
      />

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Voices of Healthi-Life
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Real Stories. Real Results.
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear directly from Dr. Petch and patients who chose regenerative care at our Bangkok clinic.
            </p>
          </div>

          {/* Video Triptych Grid - Thumbnails with Play Button */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {videoTestimonials.map((video, index) => (
              <div
                key={video.id}
                className="group relative cursor-pointer"
                onClick={() => openLightbox(video.id)}
                role="button"
                tabIndex={0}
                aria-label={`Play video: ${video.title}`}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(video.id)}
              >
                {/* Thumbnail Container with 9:16 aspect ratio for Shorts */}
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                  {/* Lazy-loaded Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => handleThumbnailLoad(video.id)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      loadedThumbnails.has(video.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  
                  {/* Placeholder skeleton while loading */}
                  {!loadedThumbnails.has(video.id) && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                      <Play className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Gradient Overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Video Title on thumbnail */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-2 py-0.5 bg-primary text-primary-foreground rounded text-xs font-medium mb-2">
                      {video.subtitle}
                    </span>
                    <h3 className="font-bold text-white text-sm md:text-base line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                </div>

                {/* Video Info below thumbnail */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                </div>

                {/* Featured badge for doctor */}
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-medical text-white text-xs font-semibold rounded-full shadow-md z-10">
                    Featured
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black border-none overflow-hidden">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close video"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          
          {selectedVideo && (
            <div className="relative aspect-[9/16] max-h-[85vh] mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=en`}
                title={videoTestimonials.find(v => v.id === selectedVideo)?.title || "Video testimonial"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoTestimonials;
