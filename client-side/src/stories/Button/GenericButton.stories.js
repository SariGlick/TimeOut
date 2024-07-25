import React from "react";
import GenericButton from "./GenericButton";
import DeleteIcon from '@mui/icons-material/Delete';

export default{
    title: 'Button/GenericButton',
    component: GenericButton,
    argTypes:{
        className:{ control: {type: 'select', options:['primary','secondary']}},
    }
};
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
export const primaryIcon = Template.bind({});
primaryIcon.args = {
    className: "primary",    
    size: "medium",
    icon:DeleteIcon
   
}
export const SecondaryIcon = Template.bind({});
SecondaryIcon.args = {
    className: "secondary",
    icon:DeleteIcon,
    size: "medium",
     disabled:true
}
