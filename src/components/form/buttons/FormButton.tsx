import React from 'react';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { Button } from '@/components/ui/Button';

function FormButton({ label, type }: { label: string; type: 'submit' | 'reset' | 'button' }) {
  return (
    <div className="mt-6">
      <Button type={type} size="lg">
        {label}
      </Button>
    </div>
  );
}

// UNIFORM REGISTRATION
registerUniformComponent({
  type: "formButton",
  component: FormButton,
});

export default FormButton;
