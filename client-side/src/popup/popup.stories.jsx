import React, { useState } from 'react';
import { Popup } from './popup'; 
import { Button } from '@mui/material'; 

export default {
  title: 'Components/Popup',
  component: Popup,
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div>
      <Button onClick={openPopup}>Open Popup</Button>
      <Popup 
        {...args} 
        isOpen={isOpen} 
        onClose={closePopup} 
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  popupContent: '<p>This is some <strong>HTML</strong> content inside the popup.</p>',
};
