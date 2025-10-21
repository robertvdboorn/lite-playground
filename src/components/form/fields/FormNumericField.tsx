import React from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { useFormContext } from '../context/FormContext';
import { sanitizeName } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { NumericInputType } from '../form-types';
import { Input } from '@/components/ui/Input';

function FormNumericField({
  name,
  label,
  placeholder = '',
  required = false,
  minimum,
  maximum,
  step,
  type = 'number',
}: {
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  minimum?: number;
  maximum?: number;
  step?: number;
  type?: NumericInputType;
}) {
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
      <Input
        id={identifier}
        name={identifier}
        placeholder={placeholder}
        required={required}
        type={type}
        min={minimum}
        max={maximum}
        step={step}
        value={formData[identifier]?.value || ''}
        onChange={handleChange}
        aria-invalid={required && !formData[identifier]?.value}
      />
    </div>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "formNumericField",
  component: FormNumericField,
});

export default FormNumericField;
