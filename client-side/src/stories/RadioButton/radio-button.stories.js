import React, { useState } from 'react';

import RadioButton from './radio-Button';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  argTypes: {
    options: { control: 'array' },
    selectedOption: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

const Template = (args) => {
  const [selectedOption, setSelectedOption] = useState(args.selectedOption || '');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    args.onChange(event.target.value);
  };

  return (
    <RadioButton
      {...args}
      selectedOption={selectedOption}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
  selectedOption: 'option1',
};

export const NoInitialSelection = Template.bind({});
NoInitialSelection.args = {
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
  selectedOption: '',
};
