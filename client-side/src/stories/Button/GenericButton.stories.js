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
export const WithIcon=Template.bind({});
WithIcon.args={
    className:"secondary",
    label: "primary button",
    size: "medium",
    icon:<DeleteIcon/>,
    onIconClick: () => console.log('Icon clicked')
}
