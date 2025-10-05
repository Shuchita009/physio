import React, { useEffect, useMemo, useRef, useState } from 'react';

// Simple gallery that loads images from public/assets/gallery
// Place your images in public/assets/gallery and they will be referenced by URL

const defaultImages = [
  // Add your filenames here or just drop files in public/assets/gallery and update this list
  'p1.jpg', 'p2.jpg', 'p3.jpg', 'p4.jpg', 'p5.jpg', 'p6.jpg'
];

/**
 * Gallery auto-detects images in public/assets/gallery by probing common names
 * If you pass the `images` prop, that list is used instead.
 */
const Gallery = ({ images }) => {
  // Carousel state: index of the currently displayed image
  const [currentIndex, setCurrentIndex] = useState(0);
  // Detected images from probing
  const [detected, setDetected] = useState([]);
  // Autoplay pause flag (when hovering)
  const [isHovered, setIsHovered] = useState(false);
  const AUTO_DELAY_MS = 10000; // 10 seconds

  // Build a small candidate list to probe
  const candidates = useMemo(() => {
    // Probe only JPG files named p1.jpg ... p16.jpg to reduce 404 noise
    const nums = Array.from({ length: 16 }, (_, i) => i + 1); // 1..16
    return nums.map((n) => `p${n}.jpg`);
  }, []);

  // Use provided list if given, else prefer detected JPGs; if none detected, fall back to defaults
  const effectiveImages = useMemo(() => {
    if (images && images.length) return images;
    if (detected && detected.length) return detected;
    return defaultImages;
  }, [images, detected]);

  const srcFor = (name) => `/assets/gallery/${name}`;
  const next = () => {
    if (!effectiveImages.length) return;
    setCurrentIndex((i) => (i + 1) % effectiveImages.length);
  };
  const prev = () => {
    if (!effectiveImages.length) return;
    setCurrentIndex((i) => (i - 1 + effectiveImages.length) % effectiveImages.length);
  };

  // Keyboard and touch support
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const SWIPE_THRESHOLD = 40; // px

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  const onTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
    }
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : null;
    if (endX == null) return;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (dx <= -SWIPE_THRESHOLD) {
      next();
    } else if (dx >= SWIPE_THRESHOLD) {
      prev();
    }
  };

  // Autoplay: rotate images every AUTO_DELAY_MS, pause on hover and when tab hidden
  useEffect(() => {
    if (effectiveImages.length <= 1) return; // nothing to rotate
    if (isHovered) return; // pause when hovered

    let timerId = null;
    const start = () => {
      if (timerId) clearInterval(timerId);
      timerId = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % effectiveImages.length);
      }, AUTO_DELAY_MS);
    };
    const stop = () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };
    const handleVisibility = () => {
      if (document.hidden) stop(); else start();
    };

    start();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [effectiveImages.length, isHovered]);

  useEffect(() => {
    if (images && images.length) return; // user provided list
    let cancelled = false;
    let pending = 0;
    const found = new Set();

    const tryLoad = (name) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ name, ok: true });
      img.onerror = () => resolve({ name, ok: false });
      img.src = srcFor(name);
    });

    // Limit total probes to avoid too many requests
    const toProbe = candidates.slice(0, 32);
    pending = toProbe.length;
    Promise.all(toProbe.map(tryLoad)).then((results) => {
      if (cancelled) return;
      results.forEach(r => { if (r.ok) found.add(r.name); });
      setDetected(Array.from(found));
    });

    return () => { cancelled = true; };
  }, [images, candidates]);

  // Prefer starting from p1.* when available
  useEffect(() => {
    if (!effectiveImages.length) return;
    const priorityNames = ['p1.jpg', 'p1.jpeg', 'p1.png', 'p1.webp'];
    const foundIdx = effectiveImages.findIndex(n => priorityNames.includes(n.toLowerCase()));
    setCurrentIndex(foundIdx >= 0 ? foundIdx : 0);
  }, [effectiveImages]);

  return (
    <section id="gallery" className="py-16 bg-white">
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Gallery</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">Swipe through moments with patients and at events.</p>

          {effectiveImages.length === 0 ? (
            <div className="text-center text-gray-500">No images found. Add files into public/assets/gallery.</div>
          ) : (
            <div
              ref={containerRef}
              className="relative w-full overflow-hidden rounded-lg shadow border border-gray-100"
              role="region"
              aria-label="Image carousel"
              tabIndex={0}
              onKeyDown={onKeyDown}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div style={{ aspectRatio: '4 / 3', width: '100%', position: 'relative', background: '#f8fafc' }}>
                <img
                  key={effectiveImages[currentIndex]}
                  src={srcFor(effectiveImages[currentIndex])}
                  alt={effectiveImages[currentIndex]}
                  onError={(e) => {
                    const el = e.currentTarget;
                    // Fallback once to /assets/{name}
                    if (!el.dataset.fallback) {
                      el.dataset.fallback = '1';
                      el.src = `/assets/${effectiveImages[currentIndex]}`;
                    } else {
                      // If still failing, skip to next available image to avoid a broken frame
                      if (effectiveImages.length > 1) next();
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Controls */}
              {/* <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute top-1/2 -translate-y-1/2 left-3 bg-white/90 hover:bg-white text-black h-10 w-10 rounded-full shadow flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 12 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute top-1/2 -translate-y-1/2 right-3 bg-white/90 hover:bg-white text-black h-10 w-10 rounded-full shadow flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 12 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M9 6l6 6-6 6" />
                </svg> */}
              {/* </button> */}

              {/* Counter */}
              {/* <div className="absolute bottom-2 right-2 bg-black/60 text-white text-sm px-2 py-1 rounded">
                {currentIndex + 1} / {effectiveImages.length}
              </div> */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;