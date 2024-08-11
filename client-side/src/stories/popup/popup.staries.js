import React from 'react';
import { storiesOf } from '@storybook/react';
import { popup } from '../popup/popup';
import CloseIcon from '@mui/icons-material/Close';
import '../popup/popup.scss';

const PopupContentExample = () => (
  <div>
    <h2>Example Content</h2>
    <p>This is an example content inside the popup.</p>
  </div>
);

const onCloseExample = (...params) => {
  console.log('Popup closed with params:', ...params);
};

storiesOf('Popup', module)
  .add('Default', () => (
    <popup
      popupContent={<PopupContentExample />}
      isOpen={true}
      onClose={onCloseExample}
    />
  ));
