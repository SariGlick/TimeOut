import React from 'react';
import { action } from '@storybook/addon-actions';

import DatePicker from './DatePicker';

export default {
  title: 'DatePicker',
  component: DatePicker,
};

const Template = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: action('date changed'),
};