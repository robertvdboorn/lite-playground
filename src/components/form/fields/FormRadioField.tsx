import React from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { useFormContext } from '../context/FormContext';
import { sanitizeName } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { RadioOption } from '../form-types';
import { cn } from '@/lib/utils';

function FormRadioField({
  name,
  label,
  options,
  required = false,
}: {
  name?: string;
  label?: string;
  options?: RadioOption[];
  required?: boolean;
}) {
  const { formData, handleInputChange } = useFormContext();
  const identifier = name && name.length > 0 ? sanitizeName(name) : uuidv4();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(identifier, e.target.value);
  };

  return (
    <div className="mb-6">
      <fieldset>
        <legend className="block text-sm font-medium text-foreground mb-3">
          {label} {required && <span className="text-destructive">*</span>}
        </legend>
        <div className="space-y-3">
          {options?.map((option, index) => {
            const { fields } = option;

            const optionId =
              fields?.identifier?.value && fields.identifier.value.length > 0
                ? sanitizeName(fields.identifier.value)
                : `${identifier}-option-${index}`;

            // Default values for isDefault, isHidden, and isDisabled if options field doesn't exist
            const isDefault = Array.isArray(fields?.options?.value) && fields.options.value.includes('default');
            const isHidden = Array.isArray(fields?.options?.value) && fields.options.value.includes('hidden');
            const isDisabled = Array.isArray(fields?.options?.value) && fields.options.value.includes('disabled');

            // Render the radio button only if it's not hidden
            return !isHidden ? (
              <div key={index} className="flex items-start gap-3">
                <input
                  id={optionId}
                  name={identifier}
                  type="radio"
                  value={fields?.value?.value || ''}
                  checked={isDefault || formData[identifier]?.value === fields?.value?.value}
                  required={required}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className={cn(
                    "border-input mt-0.5 size-4 cursor-pointer rounded-full border bg-transparent transition-all duration-200",
                    "checked:bg-ui-primary checked:border-ui-primary checked:ring-4 checked:ring-ui-primary/20",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
                    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                />
                <label htmlFor={optionId} className="text-sm font-medium text-foreground cursor-pointer select-none">
                  {fields?.label?.value || ''}
                </label>
              </div>
            ) : null;
          })}
        </div>
      </fieldset>
    </div>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "formRadioField",
  component: FormRadioField,
});

export default FormRadioField;
