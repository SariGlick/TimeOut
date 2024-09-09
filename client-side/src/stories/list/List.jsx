import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@mui/material';
import './list.scss'

const GenericList = ({ messages, onHover, onMouseOut, iconsArr=null, hoveredIndex }) => {
    return (
        <div className='wrapper'>
            <List>
                {messages && messages.length > 0 ? (
                    messages.map((MessageComponent, index) => (
                        <div 
                            key={index} 
                            onMouseOver={() => onHover(index)}
                            onMouseOut={onMouseOut}
                            style={{ position: 'relative' }}
                        >
                            {React.isValidElement(MessageComponent) ? (
                                <div>
                                    {MessageComponent}
                                    {hoveredIndex === index && (
                                        <div className="icons-container">
                                            {iconsArr[index]}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>Invalid component</div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </List>
        </div>
    );
};



GenericList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.element).isRequired,
    onHover: PropTypes.func.isRequired,
    onMouseOut: PropTypes.func.isRequired,
    iconsArr: PropTypes.arrayOf(PropTypes.element).isRequired,
    hoveredIndex: PropTypes.number.isRequired,
};


export default GenericList;
