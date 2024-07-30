import { Title } from '@mui/icons-material';
import React from 'react';
import VerticalTabss from './verticalTabss';
export default {
    title:'verticalTabs',
    components:'verticalTabs'
}
const Template = (args) =>  <VerticalTabss  {...args}/>;
export const classicVerticalTab= Template.bind({});