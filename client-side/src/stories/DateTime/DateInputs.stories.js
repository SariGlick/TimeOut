import React from "react";

import DateInputs from './DateInputs';


export default{
    title: 'DateInputs',
    component: DateInputs,
    argTypes:{
    }
};



const Template = (args) => <DateInputs {...args}/>;

export const ClasicDateInputs = Template.bind({});


