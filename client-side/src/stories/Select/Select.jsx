
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SelectMui from '@mui/material/Select';
import PropTypes from 'prop-types';
import './select.scss';

// <<<<<<< Updated upstream
// const Select = ({className, options= [{ text: "option1", icon: '🖋️' }, { text: "option2", icon: '🖋️' }], onChange = undefined, title,size= 'large',widthOfSelect, value}) => {
//   return ( 
//      <div className='selectWrapper' >
//       <Box>
//        <FormControl  size={size} variant="outlined">
//         <InputLabel  className='input' >{title}</InputLabel>
//         <SelectMui  style={{width:widthOfSelect}} label={title}
//           className={`genericSelect ${className ? `genericSelect ${className}` : ''}`}
//           onChange={onChange}
//           value={value}
//         >
//           {options.map((option, index) => (
//             <MenuItem key={index} value={option.value} >
//               {option.text}
//               {option.icon}
//             </MenuItem>
//           ))}
//         </SelectMui>
//       </FormControl>
//     </Box></div>
// =======
const Select = ({ className, options, onChange, title, size, widthOfSelect }) => {
  const [selectedValue, setSelectedValue] = React.useState(options[0]?.text || '');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className='selectWrapper'>
      <Box>
        <FormControl size={size} variant="outlined">
          <InputLabel className='input'>{title}</InputLabel>
          <SelectMui
            style={{ width: widthOfSelect }}
            label={title}
            className={`genericSelect ${className ? `genericSelect ${className}` : ''}`}
            value={selectedValue}
            onChange={handleChange}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.text}>
                {option.text}
                {option.icon}
              </MenuItem>
            ))}
          </SelectMui>
        </FormControl>
      </Box>
    </div>
// >>>>>>> Stashed changes
  );
};

Select.propTypes = {
// <<<<<<< Updated upstream
//   options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
//   value: PropTypes.string.isRequired,
// =======
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.node
  })).isRequired,
// >>>>>>> Stashed changes
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string,
  widthOfSelect: PropTypes.string
};

//<<<<<<< Updated upstream
//=======
Select.defaultProps = {
  size: 'large',
  onChange: undefined,
  className: '',
  widthOfSelect: '150px',
  options: [{ text: "option1", icon: '🖋️' }, { text: "option2", icon: '🖋️' }]
};
//>>>>>>> Stashed changes

export default Select;


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import SelectMui from '@mui/material/Select';
// import PropTypes, { shape } from 'prop-types';
// import './select.scss';

// const Select = ({className, options, onChange, title,size,widthOfSelect}) => {
//   return ( 
//      <div className='selectWrapper' >
//       <Box>
//        <FormControl  size={size} variant="outlined">
//         <InputLabel  className='input' >{title}</InputLabel>
//         <SelectMui  style={{width:widthOfSelect}} label={title}
//           className={`genericSelect ${className ? `genericSelect ${className}` : ''}`}
//           onChange={onChange}
//         >
//           {options.map((option, index) => (
//             <MenuItem key={index} value={option} >
//               {option.text}
//               {option.icon}
//             </MenuItem>
//           ))}
//         </SelectMui>
//       </FormControl>
//     </Box></div>
//   );
// };

// Select.propTypes = {
//   options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
//   title: PropTypes.string.isRequired,
//   onChange: PropTypes.func,
//   size: PropTypes.oneOf(['small', 'large']),
//   className: PropTypes.string.isRequired
// };

// Select.defaultProps = {
//   size: 'large',
//   onChange: undefined,
//   options:[{text:"option1",icon:'🖋️'},{text:"option2",icon:'🖋️'}]
// };

// export default Select;
