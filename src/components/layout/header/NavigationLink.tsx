import React from 'react';
// Uniform imports for creating navigation links
import { UniformText } from '@uniformdev/canvas-react';
import Link from 'next/link'; // Next.js optimized navigation
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { useMobileMenu } from '../../../contexts/MobileMenuContext';
import { LinkParamValue, ProjectMapLinkParamValue } from '@uniformdev/canvas';

export interface NavigationLinkProps {
  linkText?: string;
  linkUrl?: LinkParamValue | ProjectMapLinkParamValue; // Uniform link parameter
  isMobile?: boolean;
  onClick?: () => void;
}

/**
 * Navigation Link Component - Clean Navigation Links
 * 
 * This component creates navigation links with a clean, minimal design that
 * matches the footer styling. Both mobile and desktop use the same approach.
 * 
 * Features:
 * - Editable link text (UniformText)
 * - Uniform link parameter (supports internal/external links)
 * - Animated underline hover effect (both mobile and desktop)
 * - Mobile menu integration (auto-closes menu on click)
 * - Automatic context detection
 * - Consistent styling with footer links
 * 
 * Styling:
 * - Clean text links (no background bubbles)
 * - Color: gray-700 → black on hover
 * - Animated underline: blue line slides in from left
 * - Distance: -bottom-1 (matches footer exactly)
 * - Mobile: Full-width with extra padding for easier tapping
 * - Desktop: Compact horizontal layout
 * 
 * Link Types Supported:
 * - Internal pages (Next.js routing)
 * - External URLs
 * - Project map links (Uniform routing)
 * 
 * Used in Header component's navigationLinks slot.
 */
export const NavigationLink: React.FC<NavigationLinkProps> = ({
  linkUrl,
  isMobile = false,
  onClick,
}) => {
  // Mobile menu context for closing menu on navigation
  const mobileMenu = useMobileMenu();

  // Smart context detection: check if we're inside a mobile navigation container
  // This allows the same component to work in both desktop and mobile layouts
  const isInMobileContext = isMobile || (typeof window !== 'undefined' && document.querySelector('.mobile-navigation-context'));

  // Both mobile and desktop now use the same clean link style with underline

  const handleClick = () => {
    // Close mobile menu if we're in mobile context
    if (isInMobileContext && mobileMenu) {
      mobileMenu.close();
    }
    // Call any additional onClick handler
    if (onClick) {
      onClick();
    }
  };

  // Function to render the appropriate link based on Uniform link parameter
  // Render the appropriate link based on Uniform link parameter type
  const renderLink = (linkData: LinkParamValue | ProjectMapLinkParamValue | undefined) => {
    // Wrapper padding class - different for mobile vs desktop
    const linkWrapperClassName = isInMobileContext
      ? "block px-4 py-3"
      : "block px-3 py-2";
    
    // If the link is a project map node, we can get the node id, dynamic input values, and project map id
    if (linkData?.type === "projectMapNode") {
      // Access node metadata if needed: linkData.nodeId, linkData.dynamicInputValues, linkData.projectMapId
      // Use the path for the URL
      const url = linkData?.path?.length ? linkData.path : "#";
      
      return (
        <Link 
          href={url} 
          onClick={handleClick}
          className={linkWrapperClassName}
        >
          <span className="relative text-gray-700 hover:text-black font-medium transition-colors duration-300 group inline-block">
            <UniformText parameterId="linkText" placeholder="Link goes here" />
            {/* Animated underline effect - only under the text */}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>
      );
    }

    // For URL links
    if (linkData?.type === "url") {
      const url = linkData?.path?.length ? linkData.path : "#";
      
      return (
        <Link 
          href={url} 
          onClick={handleClick}
          className={linkWrapperClassName}
        >
          <span className="relative text-gray-700 hover:text-black font-medium transition-colors duration-300 group inline-block">
            <UniformText parameterId="linkText" placeholder="Link goes here" />
            {/* Animated underline effect - only under the text */}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>
      );
    }

    // For email or telephone links
    if (linkData?.type === "email" || linkData?.type === "tel") {
      return (
        <a 
          href={linkData?.path} 
          onClick={handleClick}
          className={linkWrapperClassName}
        >
          <span className="relative text-gray-700 hover:text-black font-medium transition-colors duration-300 group inline-block">
            <UniformText parameterId="linkText" placeholder="Link goes here" />
            {/* Animated underline effect - only under the text */}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
          </span>
        </a>
      );
    }

    // Fallback - render as Link with # href
    return (
      <Link 
        href="#" 
        onClick={handleClick}
        className={linkWrapperClassName}
      >
        <span className="relative text-gray-700 hover:text-black font-medium transition-colors duration-300 group inline-block">
          <UniformText parameterId="linkText" placeholder="Link text" />
          {/* Animated underline effect - only under the text */}
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
        </span>
      </Link>
    );
  };

  return renderLink(linkUrl);
};

// UNIFORM REGISTRATION: Makes this component available in navigation slots
// Used in Header component's navigationLinks slot for building menus
registerUniformComponent({
  type: "navigationLink",
  component: NavigationLink,
});

export default NavigationLink;
