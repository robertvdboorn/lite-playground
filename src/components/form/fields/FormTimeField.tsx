import React from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { useFormContext } from '../context/FormContext';
import { sanitizeName } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/Input';

function FormTimeField({ name, label, required = false }: { name?: string; label?: string; required?: boolean }) {
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
        type="time"
        required={required}
        value={formData[identifier]?.value || ''}
        onChange={handleChange}
        aria-invalid={required && !formData[identifier]?.value}
      />
    </div>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "formTimeField",
  component: FormTimeField,
});

export default FormTimeField;
