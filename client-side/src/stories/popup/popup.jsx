import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import GenericButton from '../Button/GenericButton';
import './popup.scss';

export default function BasicPopup({text='',labelButtonOutThePopup='open popup',buttonArray}) {
  const [anchor, setAnchor] = React.useState(null);
  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <div>
      <GenericButton className="secondary" label={labelButtonOutThePopup} aria-describedby={id} type="button" onClick={handleClick} />
      <BasePopup id={id} open={open} anchor={anchor}>
        <div className='popup-body'>
            <div>{text}</div>
           {buttonArray}
        </div>
       </BasePopup>
    </div>
  );
}

