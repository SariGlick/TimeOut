import React, { useState } from 'react';
import ToastMessage from './ToastMessage';

export default {
  title: 'Components/ToastMessage',
  component: ToastMessage,
  argTypes: {
    type: {
      control: { type: 'select', options: ['error', 'success', 'warning', 'info'] },
    },
    message: {
      control: 'text',
    },
    open: {
      control: 'boolean',
    },
   
  },
};

const Template = (args) => {
  const [open, setOpen] = useState(args.open);

  

  return <ToastMessage {...args} open={open}  />;
};

export const Success = Template.bind({});
Success.args = {
  open: true,
  type: 'success',
  message: 'This is a success message!',
};

export const Error = Template.bind({});
Error.args = {
  open: true,
  type: 'error',
  message: 'This is an error message!',
};

export const Warning = Template.bind({});
Warning.args = {
  open: true,
  type: 'warning',
  message: 'This is a warning message!',
};

export const Info = Template.bind({});
Info.args = {
  open: true,
  type: 'info',
  message: 'This is an info message!',
};
