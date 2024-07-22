
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getIconUtilityClass } from '@mui/material';
import Select from '../Select/Select';


const DateFormatter = ({ initialDate }) => {
  const [currentDate, setCurrentDate] = useState(format(initialDate, 'yyyy-MM-dd'));
  const [dateFormat, setDateFormat] = useState('yyyy-MM-dd');

  const dateFormats = [
    { value: 'yyyy-MM-dd', label: 'yyyy-MM-dd' },
    { value: 'MM/dd/yyyy', label: 'MM/dd/yyyy' },
    { value: 'dd/MM/yyyy', label: 'dd/MM/yyyy' },
    { value: 'do MMMM yyyy', label: 'do MMMM yyyy' },
    { value: 'EEEE, MMMM do, yyyy', label: 'EEEE, MMMM do, yyyy' },
    { value: 'yyyy-MM-dd HH:mm:ss', label: 'yyyy-MM-dd HH:mm:ss' },
    { value: 'MMM dd, yyyy', label: 'MMM dd, yyyy' },
    { value: 'hh:mm a', label: 'hh:mm a' }
  ];

  useEffect(() => {
    setCurrentDate(format(initialDate, dateFormat));
  }, [initialDate, dateFormat]);

  const handleDateFormatChange = (event) => {
    console.log('at handleDateFormatChange');
    const newFormat = event.target.value;
    console.log('newFormat',newFormat);
    setDateFormat(newFormat);
    const formatDate=format(initialDate, newFormat);
    console.log(formatDate);
    setCurrentDate(formatDate);
  };
 
  return (
    <div className="dateWrapper">
     <Select
        className='select-data-frequency'
        // value={dateFormat}
        options={dateFormats.map(formatOption => ({
          text: formatOption.label,
          value: formatOption.value,
        //   icon: getIconUtilityClass(formatOption.value)
        }))}
        onChange={handleDateFormatChange}
        title='Select date format'
        size='large'
        widthOfSelect='210px'
      />

      {/* <select
        className="dateFormatSelector"
        onChange={handleDateFormatChange}
        value={dateFormat}
      >
        {dateFormats.map((formatOption) => (
          <option key={formatOption.value} value={formatOption.value}>
            {formatOption.label}
          </option>
        ))}
      </select> */}
      <p className="formattedDate">Formatted Date:  {currentDate}</p>
    </div>
  );
  
};

export default DateFormatter;


// import React, { useState } from 'react';
// import { format } from 'date-fns';
// import './GenericDate.scss';

// const DateFormatter = ({ initialDate }) => {
//   const [currentDate, setCurrentDate] = useState(initialDate);

//   const dateFormats = [
//     { label: 'yyyy-MM-dd', value: 'yyyy-MM-dd' },
//     { label: 'MM/dd/yyyy', value: 'MM/dd/yyyy' },
//     { label: 'dd-MM-yyyy', value: 'dd-MM-yyyy' },
//     { label: 'dd/MM/yyyy', value: 'dd/MM/yyyy' },
//   ];


//   const handleDateFormatChange = (event) => {
//     setCurrentDate(format(initialDate, event.target.value));
//   };

//   return (
//     <div className="dateWrapper">
//       <select className="dateFormatSelector" onChange={handleDateFormatChange}>
//         {dateFormats.map((formatOption) => (
//           <option key={formatOption.value} value={formatOption.value}>
//             {formatOption.label}
//           </option>
//         ))}
//       </select>
//       <p className="formattedDate">Formatted Date: {currentDate}</p>
//     </div>
//   );
// };

// export default DateFormatter;

// // import PropTypes from 'prop-types';
// // import { format } from 'date-fns';
// // import './DateFormatter.scss';

// // const DateFormatter = ({ className, dateFormat, onChangeFormat, onUpdateDate, dateFormats, currentDate }) => {
// //   return (
// //     <div className={`dateFormatterWrapper ${className}`}>
// //       <select value={dateFormat} onChange={(e) => onChangeFormat(e.target.value)}>
// //         {dateFormats.map((formatOption) => (
// //           <option key={formatOption.value} value={formatOption.value}>
// //             {formatOption.label}
// //           </option>
// //         ))}
// //       </select>
// //       <Button onClick={onUpdateDate}>Update Date</Button>
// //       <p>Formatted Date: {format(currentDate, dateFormat)}</p>
// //     </div>
// //   );
// // };

// // DateFormatter.propTypes = {
// //   className: PropTypes.string,
// //   dateFormat: PropTypes.string.isRequired,
// //   onChangeFormat: PropTypes.func.isRequired,
// //   onUpdateDate: PropTypes.func.isRequired,
// //   dateFormats: PropTypes.arrayOf(
// //     PropTypes.shape({
// //       label: PropTypes.string.isRequired,
// //       value: PropTypes.string.isRequired
// //     })
// //   ).isRequired,
// //   currentDate: PropTypes.instanceOf(Date).isRequired
// // };

// // export default DateFormatter;