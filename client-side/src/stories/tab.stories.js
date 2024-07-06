import * as React from 'react';

export default {
    title:"tab",
    component:"TabsC"
    // argsTypes:{}
}

const Template=(args)=><button {...args}/>

export const large=Template.bind({})
large.args={
    size:"large",
    text:"pppp",
    nav:"rrr"
}