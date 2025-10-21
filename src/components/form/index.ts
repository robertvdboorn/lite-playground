import { registerUniformComponent } from '@uniformdev/canvas-react';
import Form from './Form';
import FormTextField from './fields/FormTextField';
import FormNumericField from './fields/FormNumericField';
import FormDropdownField from './fields/FormDropdownField';
import FormCheckboxField from './fields/FormCheckboxField';
import FormRadioField from './fields/FormRadioField';
import FormDateField from './fields/FormDateField';
import FormTimeField from './fields/FormTimeField';
import FormColorField from './fields/FormColorField';
import FormButton from './buttons/FormButton';

const components = [
  { type: 'form', component: Form },
  { type: 'formTextField', component: FormTextField },
  { type: 'formNumericField', component: FormNumericField },
  { type: 'formDropdownField', component: FormDropdownField },
  { type: 'formCheckboxField', component: FormCheckboxField },
  { type: 'formRadioField', component: FormRadioField },
  { type: 'formDateField', component: FormDateField },
  { type: 'formTimeField', component: FormTimeField },
  { type: 'formColorField', component: FormColorField },
  { type: 'formButton', component: FormButton },
];

components.forEach(({ type, component }) => {
  registerUniformComponent({ type, component });
});

export * from './Form';
export * from './fields/FormTextField';
export * from './fields/FormNumericField';
export * from './fields/FormDropdownField';
export * from './fields/FormCheckboxField';
export * from './fields/FormRadioField';
export * from './fields/FormDateField';
export * from './fields/FormTimeField';
export * from './fields/FormColorField';
export * from './buttons/FormButton';
