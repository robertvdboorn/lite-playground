import React from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { useFormContext } from '../context/FormContext';
import { sanitizeName } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';

function FormColorField({ name, label, required = false }: { name?: string; label?: string; required?: boolean }) {
  const { formData, handleInputChange } = useFormContext();
  const identifier = name && name.length > 0 ? sanitizeName(name) : uuidv4();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(identifier, e.target.value);
  };

  return (
    <div className="mb-6">
      <label htmlFor={identifier} className="block text-sm font-medium text-foreground mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={identifier}
        name={identifier}
        type="color"
        required={required}
        value={formData[identifier]?.value || '#000000'}
        onChange={handleChange}
        aria-invalid={required && !formData[identifier]?.value}
        className={cn(
          "border-input flex h-10 w-full cursor-pointer rounded-lg border bg-transparent p-1 shadow-xs transition-all duration-300 outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "hover:shadow-lg disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
    </div>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "formColorField",
  component: FormColorField,
});

export default FormColorField;
