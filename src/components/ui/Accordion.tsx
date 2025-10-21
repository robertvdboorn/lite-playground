import React, { useState, useMemo } from "react";
import {
  UniformText,
  UniformRichText,
  UniformSlot,
  registerUniformComponent,
  useUniformContextualEditingState,
} from "@uniformdev/canvas-react";
import type { ComponentInstance } from "@uniformdev/canvas";
import { cn } from "@/lib/utils";
import { getAllChildrenIds } from "@/utilities/canvas";

export interface AccordionProps {
  className?: string;
  component?: ComponentInstance;
}

export interface AccordionItemProps {
  className?: string;
  defaultOpen?: boolean;
  component?: ComponentInstance;
}

/**
 * Accordion Item Component - Individual Collapsible Section
 * 
 * A single collapsible item within an Accordion. Features smooth
 * animations and accessible markup.
 * 
 * Features:
 * - Smooth expand/collapse animation
 * - Editable title and rich text content
 * - Optional default open state
 * - Accessible keyboard navigation
 * - Visual indicators (chevron icon)
 * 
 * Best used inside the Accordion component.
 */
export const AccordionItem: React.FC<AccordionItemProps> = ({
  className = "",
  defaultOpen = false,
  component,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Canvas editor integration - auto-expand when selected
  const { previewMode, selectedComponentReference } = useUniformContextualEditingState({ global: true });
  const isContextualEditing = previewMode === 'editor';
  
  const allComponentChildrenIds = useMemo(() => getAllChildrenIds(component), [component]);
  
  const isThisComponentSelected = selectedComponentReference?.id === component?._id;
  const isChildComponentSelected = selectedComponentReference && allComponentChildrenIds.includes(selectedComponentReference.id);
  
  // Override open state in editor when this item or its children are selected
  const isItemOpen = isContextualEditing 
    ? (isThisComponentSelected || isChildComponentSelected) || isOpen
    : isOpen;

  return (
    <div className={cn("border-b border-gray-200", className)}>
      {/* ACCORDION HEADER: Clickable trigger */}
      <button
        className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isItemOpen}
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-8">
          <UniformText
            placeholder="Question or section title"
            parameterId="title"
            as="span"
          />
        </h3>
        
        {/* CHEVRON ICON: Rotates when open */}
        <svg
          className={cn(
            "w-5 h-5 text-gray-500 transition-transform flex-shrink-0",
            isItemOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* ACCORDION CONTENT: Expandable panel */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isItemOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          <UniformRichText
            placeholder="Answer or detailed content goes here"
            parameterId="content"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Accordion Component - Collapsible Sections Container
 * 
 * A container for collapsible sections, perfect for FAQs, documentation,
 * or any content that benefits from progressive disclosure.
 * 
 * Features:
 * - Clean, minimal design
 * - Smooth animations
 * - Flexible content via slots
 * - Optional title and description
 * - Accessible markup
 * 
 * Design Pattern:
 * - Each item can be expanded/collapsed independently
 * - Visual feedback on hover
 * - Clear visual hierarchy
 * 
 * Use Cases:
 * - FAQ sections
 * - Help documentation
 * - Product details
 * - Terms and conditions
 * - Knowledge base articles
 */
export const Accordion: React.FC<AccordionProps> = ({ className = "" }) => {
  return (
    <section className={cn("py-16 px-6", className)}>
      <div className="max-w-3xl mx-auto">
        {/* ACCORDION HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <UniformText
              placeholder="Frequently Asked Questions"
              parameterId="title"
              as="span"
            />
          </h2>
          <p className="text-lg text-gray-600">
            <UniformText
              placeholder="Find answers to common questions"
              parameterId="description"
              as="span"
            />
          </p>
        </div>

        {/* ACCORDION ITEMS SLOT */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <UniformSlot name="items" />
        </div>
      </div>
    </section>
  );
};

// UNIFORM REGISTRATIONS
registerUniformComponent({
  type: "accordion",
  component: Accordion,
});

registerUniformComponent({
  type: "accordionItem",
  component: AccordionItem,
});

export default Accordion;

