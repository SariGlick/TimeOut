import * as React from 'react';
import LabTabs from './tabs';

export default {
    title:"tab",
    component:"LabTabs",
    argsTypes:{onclick:{action:"lll"}}
}

const Template=(args)=><LabTabs {...args}/>

export const navbarTabs=Template.bind({})
navbarTabs.args={
    nameOfClass:"navbar-tabs",
    text:["home","reports","statistics","profiles"],
    nav:["/home","/reports","/statistics","/profiles"],
}

export const widthtabs=Template.bind({})
widthtabs.args={
    classNameOfTags:"width-tabs",
}

export const footerTabs=Template.bind({})
footerTabs.args={
    nameOfClass:"footer-tabs",
    text:["Kamatech"],
    nav:["https://ultracode.education/"],
}

export const profileTabs=Template.bind({})
profileTabs.args={
    nameOfClass:"profile-tabs",
    text:["blocked sites","manage profiles","browsing data"],
     nav:["/blockedsites","/manageprofiles","/browsingdata"]  
}
