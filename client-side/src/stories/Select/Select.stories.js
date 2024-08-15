import React from 'react';
import Select from './Select';

export default {
  parameters: {
    layout: 'centered',
  },
  title: 'Select/Select',
  component: Select,
  argTypes: {
    className: { control: { type: 'select', options: ['primary', 'secondary'] } },
    onChange: { action: 'changed' }, // This line is for Storybook actions addon
  },
};

const Template = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: [
    { value: 1, text: "option1", iconSrc: 'https://img.icons8.com/?size=100&id=Z13asb8sqRyN&format=png&color=000000' },
    { value: 2, text: "option2", iconSrc: 'https://img.icons8.com/?size=100&id=Z13asb8sqRyN&format=png&color=000000' },
  ],
  className: "primary",
  title: "primary select",
  size: 'large',
  widthOfSelect: "150px",
  onChange: (selectedValue) => {
    console.log('Selected value in Primary:', selectedValue);
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  options: [
    { value: 1, text: "option1", iconSrc: 'https://img.icons8.com/?size=100&id=Z13asb8sqRyN&format=png&color=000000' },
    { value: 2, text: "option2", iconSrc: 'https://img.icons8.com/?size=100&id=Z13asb8sqRyN&format=png&color=000000' },
    { value: 3, text: "option3", iconSrc: 'https://img.icons8.com/?size=100&id=Z13asb8sqRyN&format=png&color=000000' },
  ],
  className: "secondary",
  title: "secondary select",
  size: 'small',
  widthOfSelect: "170px",
  onChange: (selectedValue) => {
    console.log('Selected value in Secondary:', selectedValue);
  },
};
