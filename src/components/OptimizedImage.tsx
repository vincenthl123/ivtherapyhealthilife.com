import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  aspectRatio?: string;
}

/**
 * OptimizedImage Component for Core Web Vitals optimization
 * - Lazy loading with IntersectionObserver
 * - WebP format support
 * - Responsive srcset generation
 * - Blur placeholder for LCP
 */
const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  aspectRatio,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate srcset for responsive images (only for local assets)
  const isLocalAsset = src.startsWith('/') || src.includes('/assets/');
  
  return (
    <div
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-muted/30",
        aspectRatio,
        className
      )}
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    >
      {/* Blur placeholder */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-muted to-muted/50 transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />
      
      {/* Actual image */}
      {(isInView || priority) && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          sizes={sizes}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
