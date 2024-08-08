import React from 'react';
import GenericInput from '../inputs/genericInput';
import PersonIcon from '@mui/icons-material/Person';

export default {
  title: 'Components/StyledInput',
  component: GenericInput,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium'],
      },
    },
    width: { 
      control: 'text', 
      description: 'Width of the input, e.g. 100%, 50%, 300px'
    },
  },
};

const Template = (args) => <GenericInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Enter your details',
  type: 'text',
};

export const InputWithPlaceholder = Template.bind({});
InputWithPlaceholder.args = { 
  label: 'this is label',
  type: 'text',
  placeholder: 'This is Placeholder',
};

export const InputWithError = Template.bind({});
InputWithError.args = {
  label: 'Enter your details',
  type: 'text',
  helperText: 'Error message',
  error: true,
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  label: 'email input',
  type: 'email',
  placeholder: 'example@example.com',
};

export const InputWithIcon = Template.bind({});
InputWithIcon.args = {
  label: 'input with icon',
  icon: PersonIcon,
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  label: 'Choose number',
  type: 'number',
  size: 'small',
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  label: 'Disabled Input',
  type: 'text',
  disabled: true,
  width: '300px',
};

export const TimeInput = Template.bind({});
TimeInput.args = {  
  label: '',
  type: 'time',
  size: 'medium',
  width: '50%',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  label: 'Enter password',
  type: 'password',
};
