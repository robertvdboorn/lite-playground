import React from "react";
import {
  UniformText,
  UniformRichText,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-react";
import NextImage from "next/image";
import type { AssetParamValue } from "@uniformdev/assets";
import { getTransformedImageUrl } from "@/utilities/imageTransform";

export interface ContentHeroProps {
  className?: string;
  image?: AssetParamValue;
  imagePosition?: "left" | "right";
}

/**
 * Content Hero Component - Featured Content with Image
 * 
 * A hero-style component perfect for product and article views. Features
 * a large image positioned left or right alongside rich content.
 * 
 * Features:
 * - Configurable image position (left or right)
 * - Large featured image with focal point support
 * - Rich text content area
 * - CTA slot for buttons/links
 * - Responsive design (stacks on mobile)
 * - Consistent spacing and alignment
 * 
 * Design Pattern:
 * - Desktop: Side-by-side layout (50/50 split)
 * - Mobile: Stacked (image on top)
 * - Content always vertically centered
 * 
 * Use Cases:
 * - Product showcases
 * - Article features
 * - Service highlights
 * - Team member profiles
 * - Case studies
 */
export const ContentHero: React.FC<ContentHeroProps> = ({
  className = "",
  image,
  imagePosition = "left",
}) => {
  // Process the Uniform asset parameter
  const imageAssets = image ?? [];
  const [firstAsset] = imageAssets;
  
  // Generate optimized image URL with focal point support
  const focalPoint = firstAsset?.fields?.focalPoint?.value;
  const imageUrl = getTransformedImageUrl(firstAsset, {
    width: 1200,
    height: 900,
    fit: "cover",
    focal: focalPoint || "center",
    quality: 85,
  });

  // Extract alt text for accessibility
  const imageAlt = firstAsset?.fields?.description?.value || 
                  firstAsset?.fields?.title?.value || 
                  'Feature image';

  // Determine layout order based on image position
  const isImageLeft = imagePosition === "left";

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
          {/* IMAGE SECTION: Large featured image */}
          <div className="w-full lg:w-1/2">
            {imageUrl ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
                <NextImage
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              // PLACEHOLDER: Shown when no image is selected
              <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm">Select an image in the panel →</p>
                </div>
              </div>
            )}
          </div>

          {/* CONTENT SECTION: Text and CTA */}
          <div className="w-full lg:w-1/2">
            {/* TITLE: Large headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <UniformText
                placeholder="Hero title goes here"
                parameterId="title"
                as="span"
              />
            </h1>

            {/* DESCRIPTION: Rich text content */}
            <div className="text-lg text-gray-600 leading-relaxed mb-8">
              <UniformRichText
                placeholder="Hero description goes here. Add compelling content about your product or article."
                parameterId="description"
              />
            </div>

            {/* CTA SLOT: Area for action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <UniformSlot name="cta" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATION: Makes this component available for hero sections
registerUniformComponent({
  type: "contentHero",
  component: ContentHero,
});

export default ContentHero;

