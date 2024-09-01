import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './verticalTabs.scss';
const VerticalTabs = ({ labels, elements }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (i) => {
    setActiveIndex(i);
  };
  const { t: translate } = useTranslation();
  return (

    <div className='tab-warper' >
      <div className='but-warper'>
        {labels.map((label, index) => {
          return (
            <div
              className={`genericButton ${activeIndex === index ? 'clickButton' : ''}`}
              onClick={() => handleClick(index)}
              key={index}
            >
              <p> {translate(label)}</p>

            </div>
          );
        }
        )}
      </div>
      <div className='tab'>
        <div className='elments'>{elements[activeIndex]}</div>

      </div>

    </div>
  );
};

VerticalTabs.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  elements: PropTypes.arrayOf(PropTypes.element).isRequired
};
export default VerticalTabs;
