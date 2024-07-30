import React from 'react'
import PropTypes from 'prop-types';
import { Button } from '@mui/material'
import GenericButton from '../Button/GenericButton';
import './verticalTabs.scss'
const  VerticalTabss=({className, labels=['tab1','tab2'], onClick, size = "medium", disabled = false ,indexTab,components})=> {
  return ( 

    <div className='tab-warper'>
      <div  className='but-warper'>
      {labels.map((label,index)=>{
      return ( 
        <Button  className={`genericButton ${className ? `genericButton ${className}` : ''}`}onClick={onClick[index]} size={size}  disabled={disabled}  key={index}  variant="outlined">
          {label}
         </Button>
      )
     }
     )}
      </div>
  
       <GenericButton label='button' className='fdfd' size='large'/>
    </div>
  )
}

VerticalTabss.propTypes={
  className :PropTypes.string.isRequired,
  label:PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick :PropTypes.func.isRequired,
  size:PropTypes.string,
  disabled:PropTypes.string,
  indexTab:PropTypes.number,
  components:PropTypes.arrayOf(PropTypes.element).isRequired
}
export default VerticalTabss
