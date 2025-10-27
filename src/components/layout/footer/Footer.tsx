import React from 'react';
// Uniform imports for creating footer layout
import { UniformSlot, UniformText, registerUniformComponent } from '@uniformdev/canvas-react';

export interface FooterProps {
  className?: string;
}

/**
 * Footer Component - Website Footer
 * 
 * A modern, visually appealing footer with improved design and spacing.
 * Features a darker color scheme for better contrast and visual hierarchy.
 * 
 * Features:
 * - Responsive layout (stacked on mobile, horizontal on desktop)
 * - UniformSlot for footer navigation links
 * - Editable copyright text
 * - Dark, modern design with subtle gradients
 * - Enhanced spacing and typography
 * - Sophisticated visual effects
 * 
 * Layout Structure:
 * - Mobile: Links stacked above copyright (centered)
 * - Desktop: Links on left, copyright on right
 * 
 * Content Areas:
 * - footerLinks slot: For FooterNavLink components
 * - copyrightText: Editable copyright notice
 * 
 * This footer provides a polished, professional finish to the page
 * while maintaining excellent usability.
 */
function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`relative bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800 ${className}`}>
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          
          {/* FOOTER NAVIGATION: Links to important pages */}
          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3">
            {/* UNIFORM SLOT: Content authors can add FooterNavLink components here */}
            <UniformSlot name="footerLinks" />
          </nav>

          {/* COPYRIGHT TEXT: Editable legal/copyright information */}
          <div className="text-sm text-gray-400 text-center md:text-right">
            <UniformText 
              parameterId="copyrightText" 
              placeholder="Copyright text goes here" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

// UNIFORM REGISTRATION: Makes this component available as a footer
// Used in the Page component's footer slot
registerUniformComponent({
  type: "footer",
  component: Footer,
});

export default Footer;