import React from "react";
// Uniform imports for creating hero components with background images
import {
  UniformText,
  UniformRichText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/imageTransform";

export interface ImageHeroProps {
  className?: string;
  backgroundImage?: AssetParamValue; // Uniform background image asset
}

/**
 * Image Hero Component - Full-Screen Hero with Background Image
 * 
 * This component creates a dramatic, full-screen hero section with a background
 * image and overlaid content. It's perfect for creating impactful landing pages
 * and section headers that grab attention.
 * 
 * Features:
 * - Full-screen background image with optimized transformations
 * - Overlay content area with glassmorphism styling
 * - Responsive design (70vh mobile → 80vh desktop)
 * - Editable title and description
 * - CTA slot for action buttons
 * - Fallback gradient when no image selected
 * - Focal point support for precise image cropping
 * 
 * Image Processing:
 * - Automatic resizing to 1920x1080 for optimal quality
 * - Smart cropping with "cover" fit
 * - Focal point support for precise positioning
 * - Optimized delivery via Uniform's image transformation
 * 
 * Design Pattern:
 * - Background image fills entire component
 * - Content overlaid in center with white/glass background
 * - Subtle overlay to improve text readability
 * - Responsive padding and sizing
 * 
 * When to Use:
 * - Landing page headers
 * - Section dividers
 * - Campaign announcements
 * - Product showcases
 * - Any content requiring visual impact
 */
export const ImageHero: React.FC<ImageHeroProps> = ({ 
  className = "", 
  backgroundImage 
}) => {
  // Process the Uniform background image asset
  const imageAssets = backgroundImage ?? [];
  const [firstAsset] = imageAssets;
  
  // Generate optimized background image URL with high resolution
  // For background images, use scale-down to avoid pre-cropping
  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 2560,
    fit: "scale-down",
    quality: 85,
  });

  // Extract focal point for CSS positioning
  const focalPoint = firstAsset?.fields?.focalPoint?.value;
  const backgroundPosition = focalPoint
    ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
    : 'center';

  return (
    <section 
      className={`relative py-32 px-6 text-center overflow-hidden ${className}`}
      style={{
        backgroundImage: imageUrl ? `url('${imageUrl}')` : undefined,
        backgroundSize: 'cover',
        backgroundPosition,
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Fallback background if no image */}
      {!imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
      )}
      
      {/* Overlay for images only */}
      {imageUrl && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
          <UniformText
            placeholder="Hero title goes here"
            parameterId="title"
            as="span"
          />
        </h1>
        
        <div className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 text-white">
          <UniformRichText
            placeholder="Hero description goes here"
            parameterId="description"
          />
        </div>
        
        {/* CTA Slot */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <UniformSlot name="cta" />
        </div>
      </div>

      {/* Placeholder for when no background image */}
      {!imageUrl && (
        <div className="absolute bottom-4 right-4 z-20 text-white/60 text-sm">
          Select background image in panel →
        </div>
      )}
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this component available for hero sections
// Perfect for landing pages, campaign headers, or any impactful visual content
registerUniformComponent({
  type: "imageHero",
  component: ImageHero,
});

export default ImageHero;
