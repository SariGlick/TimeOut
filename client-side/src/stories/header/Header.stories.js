import * as React from 'react';
import Header from './header';

export default {
    title:"header",
    component:"Header"
}
export const SETTINGS_LIST = ['setting1', 'setting2', 'setting3'];
const Template=(args)=><Header/>

export const clasicHeader=Template.bind({})
