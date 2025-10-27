import React from 'react';
// Uniform imports for creating footer navigation links
import { UniformText, registerUniformComponent } from '@uniformdev/canvas-react';
import Link from "next/link"; // Next.js optimized navigation

export interface FooterNavLinkProps {
  className?: string;
  link?: {
    path: string; // URL destination
  };
}

/**
 * Footer Navigation Link Component - Modern Footer Links
 * 
 * A lightweight navigation link component specifically designed for footer use.
 * Features enhanced styling to match the dark footer design with sophisticated
 * hover effects and better visual hierarchy.
 * 
 * Features:
 * - Editable link text (UniformText)
 * - Simple link parameter
 * - Elegant hover effects with underline
 * - Dark theme styling
 * - Responsive text sizing
 * 
 * Styling:
 * - Medium text size (text-sm to text-base)
 * - Light colors (gray-300 → white on hover)
 * - Smooth transitions with underline effect
 * - Modern, clean appearance
 * 
 * Common Use Cases:
 * - Privacy Policy links
 * - Terms of Service
 * - Contact information
 * - About pages
 * - Social media links
 * 
 * Used in Footer component's footerLinks slot.
 */
export const FooterNavLink: React.FC<FooterNavLinkProps> = ({ 
  className = '',
  link
}) => {
  const href = link?.path || "#";
  
  return (
    <Link 
      href={href} 
      className={`
        relative text-gray-300 hover:text-white text-sm md:text-base
        transition-colors duration-300 group
        ${className}
      `.trim()}
    >
      {/* UNIFORM TEXT: Editable link text for footer navigation */}
      <UniformText
        placeholder="Link goes here"
        parameterId="text"
        as="span"
        className="inline"
      />
      {/* Animated underline effect */}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
};

// UNIFORM REGISTRATION: Makes this component available in footer slots
// Used in Footer component's footerLinks slot for building footer navigation
registerUniformComponent({
  type: "footerNavLink",
  component: FooterNavLink,
});

export default FooterNavLink;
