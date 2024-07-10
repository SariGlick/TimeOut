//DateTime.stories.js
import * as React from 'react';
import DateTime from './DateTime'

  const Template = () => <DateTime  />;
  export default {
    title: 'DateTime',
    component: DateTime,
  };
  
  export const dateTimeExample = Template.bind({});
  dateTimeExample.args = {
    date: new Date(),
  };