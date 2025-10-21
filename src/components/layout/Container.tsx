import React from 'react';
import { registerUniformComponent, UniformSlot } from '@uniformdev/canvas-react';
import { cn } from '@/lib/utils';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type ContainerProps = {
  maxWidth?: ContainerSize;
  centerContent?: boolean;
  noPadding?: boolean;
};

/**
 * Container Component
 * 
 * A flexible container component that wraps content and controls its maximum width.
 * Perfect for forms, articles, and other content that shouldn't span the full viewport.
 * 
 * Features:
 * - Configurable max-width (sm, md, lg, xl, 2xl, full)
 * - Optional content centering
 * - Responsive padding
 * - Clean, modern design
 * 
 * Usage in Uniform:
 * - Add Container to a page
 * - Configure max-width (default: 'lg')
 * - Add content to the 'content' slot
 * 
 * Common Use Cases:
 * - Wrapping forms for better readability
 * - Creating focused content areas
 * - Building landing page sections
 * - Containing articles and blog posts
 */
function Container({ 
  maxWidth = 'lg',
  centerContent = true,
  noPadding = false
}: ContainerProps) {
  const maxWidthClasses: Record<ContainerSize, string> = {
    'sm': 'max-w-sm',   // 384px - narrow forms, sidebars
    'md': 'max-w-md',   // 448px - forms, cards
    'lg': 'max-w-lg',   // 512px - default, good for most content
    'xl': 'max-w-xl',   // 576px - wider forms
    '2xl': 'max-w-2xl', // 672px - articles, blog posts
    'full': 'max-w-full', // Full width
  };

  return (
    <div 
      className={cn(
        'w-full',
        maxWidthClasses[maxWidth],
        centerContent && 'mx-auto',
        !noPadding && 'px-4 sm:px-6 lg:px-8'
      )}
    >
      {/* Content Slot - Add any components here */}
      <UniformSlot name="content" />
    </div>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "container",
  component: Container,
});

export default Container;

