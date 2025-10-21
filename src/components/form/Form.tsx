import React, { useEffect, useState } from 'react';
import { UniformSlot, registerUniformComponent } from '@uniformdev/canvas-react';
import { FormProvider, useFormContext } from './context/FormContext';
import { FormElement, FormEventAction, FormSetQuirkActionFields } from './form-types';
import type { ComponentInstance } from '@uniformdev/canvas';
import { useUniformContext } from '@uniformdev/context-react';

export interface FormProps {
  formName: string;
  formIdentifier: string;
  formActions?: FormEventAction[];
  component: ComponentInstance;
}

function extractFormElements(component: ComponentInstance): FormElement[] {
  if (!component.slots || !component.slots['formFields']) return [];

  return component.slots['formFields'].map((fieldInstance: ComponentInstance, index: number) => {
    const { type, parameters } = fieldInstance;
    return {
      type,
      fields: parameters,
      index,
    } as FormElement;
  });
}

function FormComponent({
  formName,
  formIdentifier,
  formActions,
}: {
  formName: string;
  formIdentifier: string;
  formActions?: FormEventAction[];
  component: ComponentInstance;
}) {
  const { formData, dispatch } = useFormContext();
  const { context } = useUniformContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formIdentifier: formIdentifier, ...formData }),
      });

      if (response.ok) {
        // Handle quirk actions
        formActions?.forEach(action => {
          if (action.type === 'formSetQuirkAction') {
            const setQuirkActionFields = action.fields as FormSetQuirkActionFields;
            if (setQuirkActionFields.quirkName && setQuirkActionFields.quirkValue) {
              context.update({
                quirks: {
                  [setQuirkActionFields.quirkName.value]: setQuirkActionFields.quirkValue.value,
                },
              });
            }
          }
        });

        dispatch({ type: 'RESET', payload: {} });
      } else {
        const result = await response.json();
        alert(`Failed to submit the form: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{formName}</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <UniformSlot name="formFields" />

        <UniformSlot name="formButtons" />
      </form>
    </div>
  );
}

/**
 * Form Component - Dynamic Form Builder with Supabase Integration
 * 
 * A flexible form component that allows building forms with drag-and-drop
 * field components in Uniform. Submissions are stored in Supabase and can
 * trigger Uniform context quirks for personalization.
 * 
 * Features:
 * - Dynamic form fields via slots (text, dropdown, checkbox, radio, date, etc.)
 * - Form data submission to Supabase
 * - Context quirk actions for personalization
 * - Form validation and error handling
 * - Automatic form state management
 * 
 * Slots:
 * - formFields: Container for form field components
 * - formButtons: Container for submit button
 * 
 * Use Cases:
 * - Contact forms
 * - Lead generation forms
 * - Newsletter signups
 * - Survey/questionnaire forms
 * - Registration forms
 */
export const Form: React.FC<FormProps> = ({
  formName,
  formIdentifier,
  formActions,
  component,
}) => {
  const [initialFormElements, setInitialFormElements] = useState<FormElement[]>([]);
  useEffect(() => {
    const formElements = extractFormElements(component);
    setInitialFormElements(formElements);
  }, [component]);

  return (
    <FormProvider initialFormElements={initialFormElements}>
      <FormComponent
        formName={formName}
        formIdentifier={formIdentifier}
        component={component}
        formActions={formActions}
      />
    </FormProvider>
  );
};

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "form",
  component: Form,
});

export default Form;
