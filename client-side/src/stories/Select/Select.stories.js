import React from 'react';
import Select from './Select';

export default {
   parameters: {
    layout: 'centered',
  },
  title: 'Select/Select',
  component: Select,
  argTypes:{
    className:{ control: {type: 'select', options:['primary','secondary']}},
}
 
};
const Template = (args) => <Select {...args}/>;
export const Primary = Template.bind({});
Primary.args ={
  options:[{text:"option1",icon:'🖋️'},{text:"option2",icon:'🖋️'}],
    className:"primary",
    title: "primary select",
    size: 'large',
    widthOfSelect:"150px",

}
export const Secondary = Template.bind({});
Secondary.args = {
  options:[{text:"option1",icon:'🖋️'},{text:"option2",icon:'🖋️'},{text:"option3",icon:'🖋️'}],
    className: "secondary",
    title: "secondary select",
    size: 'small',
    widthOfSelect:"170px",

}





