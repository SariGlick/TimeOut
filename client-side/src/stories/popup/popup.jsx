import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import GenericButton from '../Button/GenericButton';
import './popup.scss';

export default function BasicPopup({popupContent }) {

  return (
    <div>
      <BasePopup>
        <div className='popup-body'>
           {popupContent}
        </div>
       </BasePopup>
    </div>
  );
}

