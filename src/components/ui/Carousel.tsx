import React, { useState, useEffect } from "react";
import {
  UniformSlot,
  registerUniformComponent,
  useUniformContextualEditingState,
} from "@uniformdev/canvas-react";
import type { ComponentInstance } from "@uniformdev/canvas";
import { cn } from "@/lib/utils";
import { getAllChildrenIds } from "@/utilities/canvas";

export interface CarouselProps {
  className?: string;
  component?: ComponentInstance;
}

export interface CarouselSlideProps {
  className?: string;
  component?: ComponentInstance;
}

/**
 * Carousel Slide Component - Individual Slide
 * 
 * A single slide within the Carousel. Contains a slot for any content.
 * 
 * Features:
 * - Flexible content slot
 * - Full-width display
 * - Smooth transitions
 * 
 * Best used inside the Carousel component.
 */
export const CarouselSlide: React.FC<CarouselSlideProps> = ({
  className = "",
}) => {
  return (
    <div className={cn("w-full flex-shrink-0", className)} data-carousel-slide>
      <UniformSlot name="content" />
    </div>
  );
};

/**
 * Carousel Component - Content Slider with Navigation
 * 
 * An interactive carousel/slider for showcasing multiple pieces of content
 * with smooth transitions and navigation controls.
 * 
 * Features:
 * - Previous/Next navigation buttons
 * - Dot indicators for slide position
 * - Smooth slide transitions
 * - Keyboard navigation support
 * - Touch/swipe ready structure
 * - Flexible content via slots
 * 
 * Design Pattern:
 * - One slide visible at a time
 * - Navigation at bottom center
 * - Clear visual feedback
 * - Responsive design
 * 
 * Use Cases:
 * - Image galleries
 * - Product showcases
 * - Testimonial rotators
 * - Feature highlights
 * - Content teasers
 * - Hero rotations
 */
export const Carousel: React.FC<CarouselProps> = ({ className = "", component }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [slideComponents, setSlideComponents] = useState<ComponentInstance[]>([]);

  // Canvas editor integration - auto-navigate to selected slide
  const { previewMode, selectedComponentReference } = useUniformContextualEditingState({ global: true });
  const isContextualEditing = previewMode === 'editor';

  // Update slide count and components when slot renders
  useEffect(() => {
    // Extract slide components from slots
    const slides = component?.slots?.slides || [];
    setSlideComponents(slides);
    setSlideCount(slides.length);

    // In editor mode, apply visibility to slides directly (editor adds wrapper elements)
    // In preview/production mode, clear any inline styles to let CSS transform work
    setTimeout(() => {
      const slideElements = document.querySelectorAll('[data-carousel-slide]');
      slideElements.forEach((el, index) => {
        if (isContextualEditing) {
          // Editor mode: show/hide using display
          (el as HTMLElement).style.display = index === currentSlide ? 'block' : 'none';
        } else {
          // Preview/production mode: clear inline styles, let flex + transform work
          (el as HTMLElement).style.display = '';
        }
      });
    }, 0);
  }, [component, currentSlide, isContextualEditing]);

  // Auto-navigate to selected slide in editor
  useEffect(() => {
    if (!isContextualEditing || !selectedComponentReference) return;

    const selectedSlideIndex = slideComponents.findIndex((slide) => {
      const allChildIds = getAllChildrenIds(slide);
      return slide._id === selectedComponentReference.id || allChildIds.includes(selectedComponentReference.id);
    });

    if (selectedSlideIndex !== -1) {
      setCurrentSlide(selectedSlideIndex);
    }
  }, [isContextualEditing, selectedComponentReference, slideComponents]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(slideCount, 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(slideCount, 1)) % Math.max(slideCount, 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className={cn("py-16 px-6", className)}>
      <div className="max-w-5xl mx-auto">
        {/* CAROUSEL CONTAINER */}
        <div className="relative bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
          {/* SLIDES WRAPPER */}
          <div className="relative overflow-hidden">
            <div
              data-carousel-slides
              className={cn(
                "transition-transform duration-500 ease-in-out",
                isContextualEditing ? "block" : "flex"
              )}
              style={{ 
                transform: isContextualEditing ? undefined : `translateX(-${currentSlide * 100}%)` 
              }}
            >
              <UniformSlot name="slides" />
            </div>
          </div>

          {/* NAVIGATION BUTTONS */}
          {slideCount > 1 && (
            <>
              {/* PREVIOUS BUTTON */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* NEXT BUTTON */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* DOT INDICATORS */}
          {slideCount > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {Array.from({ length: slideCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    currentSlide === index
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* EMPTY STATE */}
        {slideCount === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p>Add slides to the carousel →</p>
          </div>
        )}
      </div>
    </section>
  );
};

// UNIFORM REGISTRATIONS
registerUniformComponent({
  type: "carousel",
  component: Carousel,
});

registerUniformComponent({
  type: "carouselSlide",
  component: CarouselSlide,
});

export default Carousel;

