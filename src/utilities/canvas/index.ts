import type { ComponentInstance } from '@uniformdev/canvas';

/**
 * Get All Child Component IDs
 * 
 * Recursively collects all child component IDs from a component tree.
 * Used to detect if a selected component in Canvas editor is a child
 * of the current component.
 * 
 * @param component - The root component to traverse
 * @returns Array of all child component IDs
 */
export const getAllChildrenIds = (component?: ComponentInstance): string[] => {
  if (!component) return [];

  const ids: string[] = [];

  // Get all slots from the component
  const slots = component.slots || {};

  // Iterate through each slot
  Object.values(slots).forEach((slotComponents) => {
    if (Array.isArray(slotComponents)) {
      slotComponents.forEach((child) => {
        // Add this child's ID (if it exists)
        if (child._id) {
          ids.push(child._id);
        }
        
        // Recursively get IDs from this child's children
        ids.push(...getAllChildrenIds(child));
      });
    }
  });

  return ids;
};

export * from './canvasClients';

