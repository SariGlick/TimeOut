import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './verticalTabs.scss'
const  VerticalTabs=({ labels=['tab1','tab2'],elements})=> {
  const [activeIndex,setActiveIndex]= useState(0);
  const handleClick =(i)=>{
     setActiveIndex(i)
  }
  const {t,i18n} =useTranslation();
  return ( 

    <div className={i18n.resolvedLanguage==='he'? 'tab-warper dir' :'tab-warper'} >
      <div  className='but-warper'>
      {labels.map((label,index)=>{
      return ( 
        <div 
        className= 'genericButton'
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
        <div className='elments'>{elements[activeIndex]}</div>
        
       </div>
       
     </div>
  )
}

VerticalTabs.propTypes={
  labels:PropTypes.arrayOf(PropTypes.string).isRequired,
  components:PropTypes.arrayOf(PropTypes.element).isRequired
}
export default VerticalTabs
