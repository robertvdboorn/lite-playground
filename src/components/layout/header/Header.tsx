import React from 'react';
import { Button } from '../../ui/button';
import { useMobileMenu } from '../../../contexts/MobileMenuContext';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
// Uniform imports for creating editable components
import { UniformSlot, registerUniformComponent, useUniformContextualEditingState } from '@uniformdev/canvas-react';

export interface HeaderProps {
  className?: string;
}

/**
 * Header Component - Website Navigation
 * 
 * This is a responsive header that works with Uniform CMS:
 * - Contains branded logo that links to homepage
 * - Contains UniformSlot for navigation links (editable in Uniform)
 * - Responsive: hamburger menu on mobile, horizontal nav on desktop
 * - Sticky header that stays at top when scrolling (except in Uniform preview mode)
 * 
 * Key Uniform Concepts:
 * - UniformSlot: Creates editable areas where content authors can add components
 * - registerUniformComponent: Makes this React component available in Uniform editor
 * - Non-sticky in preview mode: Makes it easier to edit components below the header
 */
export function Header({ className = '' }: HeaderProps) {
  // Mobile menu state management
  const { isOpen: isMobileMenuOpen, toggle: toggleMobileMenu } = useMobileMenu();
  
  // Detect Uniform preview mode - make header non-sticky in editor for better UX
  const { previewMode } = useUniformContextualEditingState({ global: true });
  const isInPreviewMode = previewMode === 'editor' || previewMode === 'preview';

  return (
    <>
      <header className={`${isInPreviewMode ? 'relative' : 'sticky top-0'} z-50 w-full bg-white border-b border-gray-200 ${className}`}>
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between lg:justify-start lg:gap-8">
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? 
                <X className="h-5 w-5 text-gray-900" /> : 
                <Menu className="h-5 w-5 text-gray-900" />
              }
            </Button>

            {/* Logo - Center on mobile, left on desktop */}
            <Link 
              href="/" 
              className="flex items-center lg:mr-8"
              aria-label="Home"
            >
              <Image
                src="/VB.png"
                alt="Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation - Hidden on mobile, shown on large screens */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1">
              {/* UNIFORM SLOT: This creates an editable area in Uniform where 
                  content authors can add NavigationLink components */}
              <UniformSlot name="navigationLinks" />
            </nav>

            {/* Mobile menu spacer - keeps layout balanced on mobile */}
            <div className="lg:hidden w-10"></div>
          </div>

          {/* Mobile Navigation - Collapsible menu for mobile devices */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="border-t border-gray-200 bg-white">
              <nav className="py-4 space-y-1">
                <div className="flex flex-col space-y-1 mobile-navigation-context">
                  {/* UNIFORM SLOT: Same navigation links as desktop, but in mobile layout */}
                  <UniformSlot name="navigationLinks" />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

// UNIFORM REGISTRATION: This registers the component with Uniform CMS
// - "type": The ID used in Uniform (must match component definition in Uniform)
// - "component": The React component to render
// After registering, this component becomes available in Uniform's visual editor
registerUniformComponent({
  type: "header",
  component: Header,
});

export default Header;