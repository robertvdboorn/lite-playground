import React from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { useFormContext } from '../context/FormContext';
import { sanitizeName } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';

function FormCheckboxField({ name, label, required = false }: { name?: string; label?: string; required?: boolean }) {
  const { formData, handleInputChange } = useFormContext();
  const identifier = name && name.length > 0 ? sanitizeName(name) : uuidv4();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(identifier, e.target.checked.toString());
  };

  return (
    <div className="mb-6 flex items-start gap-3">
      <input
        id={identifier}
        name={identifier}
        type="checkbox"
        required={required}
        checked={formData[identifier]?.value === 'true'}
        onChange={handleChange}
        aria-invalid={required && formData[identifier]?.value !== 'true'}
        className={cn(
          "border-input mt-0.5 size-4 cursor-pointer rounded border bg-transparent transition-all duration-200",
          "checked:bg-ui-primary checked:border-ui-primary",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
      <label htmlFor={identifier} className="text-sm font-medium text-foreground cursor-pointer select-none">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
    </div>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "formCheckboxField",
  component: FormCheckboxField,
});

export default FormCheckboxField;
