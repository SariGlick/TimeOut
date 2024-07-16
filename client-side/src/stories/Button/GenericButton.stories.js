import React from "react";

import GenericButton from './GenericButton';


export default{
    title: 'Button/GenericButton',
    component: GenericButton,
    argTypes:{
        className:{ control: {type: 'select', options:['primary','secondary']}},
    }
};


// Button variations

const Template = (args) => <GenericButton {...args}/>;

export const Primary = Template.bind({});
Primary.args ={
    className:"primary",
    label: "primary button",
    size: "medium"
}

export const Secondary = Template.bind({});
Secondary.args = {
    className: "secondary",
    label: "secondary button",
    size: "medium"
}

