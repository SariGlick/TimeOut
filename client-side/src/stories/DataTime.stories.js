//DateTime.stories.js
import * as React from 'react';
import DateTime from '../Components/DateTime'

  const Template = ({ date }) => <DateTime date={date} />;
  export default {
    title: 'DateTime',
    component: DateTime,
  };
  
  export const dateTimeExample = Template.bind({});
  dateTimeExample.args = {
    date: new Date(),
  };