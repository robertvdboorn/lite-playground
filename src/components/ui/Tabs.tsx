import React, { useState, useEffect } from "react";
import {
  UniformText,
  UniformSlot,
  registerUniformComponent,
  useUniformContextualEditingState,
} from "@uniformdev/canvas-react";
import type { ComponentInstance } from "@uniformdev/canvas";
import { cn } from "@/lib/utils";
import { getAllChildrenIds } from "@/utilities/canvas";

export interface TabsProps {
  className?: string;
  component?: ComponentInstance;
}

export interface TabPanelProps {
  className?: string;
  tabIndex?: number;
  component?: ComponentInstance;
}

/**
 * Tab Panel Component - Individual Tab Content
 * 
 * A single tab panel with label and content slot. The label appears
 * in the tab navigation, and the content is shown when active.
 * 
 * Features:
 * - Editable tab label
 * - Flexible content via slot
 * - Smooth transitions
 * 
 * Best used inside the Tabs component.
 */
export const TabPanel: React.FC<TabPanelProps> = ({
  className = "",
  tabIndex = 0,
  component,
}) => {
  return (
    <div 
      className={cn("w-full", className)}
      data-tab-panel
      data-tab-index={tabIndex}
      data-component-id={component?._id}
    >
      {/* Hidden label for extraction */}
      <div className="hidden" data-tab-label-text>
        <UniformText
          placeholder={`Tab ${tabIndex + 1}`}
          parameterId="label"
          as="span"
        />
      </div>
      
      {/* Tab content */}
      <div className="py-6">
        <UniformSlot name="content" />
      </div>
    </div>
  );
};

/**
 * Tabs Component - Tabbed Content Switcher
 * 
 * An interactive tabs component for organizing content into separate
 * panels that can be switched between.
 * 
 * Features:
 * - Multiple tab panels via slots
 * - Smooth content transitions
 * - Clear active state indicators
 * - Keyboard navigation ready
 * - Responsive tab bar
 * - Flexible content per tab
 * 
 * Design Pattern:
 * - Tab navigation at top
 * - One panel visible at a time
 * - Clear active tab indicator
 * - Smooth transitions
 * 
 * Use Cases:
 * - Product specifications
 * - Pricing tiers
 * - Multi-step content
 * - Category organization
 * - Feature comparisons
 * - Documentation sections
 */
export const Tabs: React.FC<TabsProps> = ({ className = "", component }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<{ index: number; label: string }[]>([]);
  const [tabPanelComponents, setTabPanelComponents] = useState<ComponentInstance[]>([]);

  // Canvas editor integration - auto-switch to selected tab
  const { previewMode, selectedComponentReference } = useUniformContextualEditingState({ global: true });
  const isContextualEditing = previewMode === 'editor';

  // Extract tab labels from children and panel components
  useEffect(() => {
    // Extract panel components from slots (this is the source of truth)
    const panels = component?.slots?.panels || [];
    setTabPanelComponents(panels);

    // Wait for DOM to render, then extract labels and apply visibility
    setTimeout(() => {
      const tabPanelElements = document.querySelectorAll('[data-tab-panel]');
      const extractedTabs = Array.from(tabPanelElements).map((el, index) => {
        const labelEl = el.querySelector('[data-tab-label-text]');
        const label = labelEl?.textContent?.trim() || `Tab ${index + 1}`;
        return { index, label };
      });
      setTabs(extractedTabs);
      
      // Apply visibility to tab panels
      tabPanelElements.forEach((el, index) => {
        (el as HTMLElement).style.display = index === activeTab ? 'block' : 'none';
      });
    }, 0);
  }, [component, activeTab]);

  // Auto-switch to selected tab in editor
  useEffect(() => {
    if (!isContextualEditing || !selectedComponentReference) return;

    const selectedTabIndex = tabPanelComponents.findIndex((panel) => {
      const allChildIds = getAllChildrenIds(panel);
      return panel._id === selectedComponentReference.id || allChildIds.includes(selectedComponentReference.id);
    });

    if (selectedTabIndex !== -1) {
      setActiveTab(selectedTabIndex);
    }
  }, [isContextualEditing, selectedComponentReference, tabPanelComponents]);

  return (
    <section className={cn("py-16 px-6", className)}>
      <div className="max-w-5xl mx-auto">
        {/* TABS HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <UniformText
              placeholder="Explore Our Features"
              parameterId="title"
              as="span"
            />
          </h2>
        </div>

        {/* TABS NAVIGATION */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex flex-wrap gap-2 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.index}
                onClick={() => setActiveTab(tab.index)}
                className={cn(
                  "px-6 py-3 font-medium text-sm transition-colors border-b-2",
                  activeTab === tab.index
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB PANELS */}
        <div className="relative" data-tabs-panels>
          <UniformSlot name="panels" />
        </div>

        {/* EMPTY STATE */}
        {tabs.length === 0 && (
          <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg">
            <p>Add tab panels to get started →</p>
          </div>
        )}
      </div>
    </section>
  );
};

// UNIFORM REGISTRATIONS
registerUniformComponent({
  type: "tabs",
  component: Tabs,
});

registerUniformComponent({
  type: "tabPanel",
  component: TabPanel,
});

export default Tabs;

