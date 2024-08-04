import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material'
import GenericButton from '../Button/GenericButton';
import { useTranslation } from 'react-i18next';
import './verticalTabs.scss'
const  VerticalTabs=({ labels=['tab1','tab2'],elements})=> {
  const [activeIndex,setActiveIndex]= useState(0);
  const handleClick =(i)=>{
     setActiveIndex(i)
  }
  const {t} =useTranslation();
  return ( 

    <div className='tab-warper'>
      <div  className='but-warper'>
      {labels.map((label,index)=>{
      return ( 
        <div 
        className={ activeIndex ===index ? 'genericButton clickButton' : 'genericButton' }
        onClick={()=>handleClick(index)}
          key={index}  
          >
          <p> {t(label)}</p>
            
         </div>
      )
     }
     )}
      </div>
       <div className='tab'>
        {elements[activeIndex]}
       </div>
       
     </div>
  )
}

VerticalTabs.propTypes={
  labels:PropTypes.arrayOf(PropTypes.string).isRequired,
  components:PropTypes.arrayOf(PropTypes.element).isRequired
}
export default VerticalTabs
