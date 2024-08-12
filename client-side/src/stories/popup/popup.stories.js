import React from "react";

import SimplePopup from "./popup.jsx";


export default{
    title: 'popup',
    component: SimplePopup,
};



const Template = (args) => <SimplePopup {...args}/>;

export const Primary = Template.bind({});
Primary.args ={
    message:'',
    labelButtonOutThePopup:'open message',
    iconInButton,
    labelButtonInThePopup:'delete message',
    onClick
}


