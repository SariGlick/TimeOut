import React from 'react';
import { Popup } from './popup';

export default {
  title: 'Components/Popup',
  component: Popup,           
};

const Template = (args) => <Popup {...args} />;

export const DefaultPopup = Template.bind({});
DefaultPopup.args = {
  popupContent: '<p>תוכן ברירת מחדל</p>',
  isOpen: true,
  onClose: () => alert('Popup closed!'),
};