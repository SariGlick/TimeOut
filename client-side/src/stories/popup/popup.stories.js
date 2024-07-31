import React from "react";

import BasicPopup from "./popup.jsx";


export default{
    title: 'popup',
    component: BasicPopup,
};



const Template = (args) => <BasicPopup {...args}/>;

export const Primary = Template.bind({});
Primary.args ={
    message:'',
    labelButtonOutThePopup:'open message',
    iconInButton,
    labelButtonInThePopup:'delete message',
    onClick
}


