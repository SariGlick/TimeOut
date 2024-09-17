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
    <div className='vertical-tabs'>
      <div className='vertical-tabs__buttons'>
        {labels.map((label, index) => {
          return (
            <div
              className={`vertical-tabs__button ${activeIndex === index ? 'vertical-tabs__button--active' : ''}`}
              onClick={() => handleClick(index)}
              key={index}
            >
              <p>{translate(label)}</p>
            </div>
          );
        })}
      </div>
      <div className='vertical-tabs__content'>
        <div className='vertical-tabs__element'>
          {elements[activeIndex]}
        </div>
      </div>
    </div>
  );
};

VerticalTabs.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  elements: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default VerticalTabs;
