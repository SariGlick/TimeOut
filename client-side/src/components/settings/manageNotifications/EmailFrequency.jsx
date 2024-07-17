// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import Select from '../../../stories/Select/Select.jsx';

// const emailFrequencyEnum = {
//   'never':'🚫',
//   'daily':'📅',
//   'weekly':'🗓️',
//   'monthly':'📆',
//   'yearly':'📅'
// };


// const EmailFrequency = () => {
//   // const preferenceId = useSelector(state => state.user.preferenceId);
//   const currentUserId = '66965136fb5f9b2164b28383';
//   const [emailFrequency, setEmailFrequency] = useState('');
//   const [message, setMessage] = useState('');
//   const preferenceId = '66930c2e2aad987e24078e12';
//   const baseUrl = process.env.REACT_APP_BASE_URL;
//   const handleChange = async (e) => {
//     const selectedFrequency = e.target.value;
//     if (!Object.keys(emailFrequencyEnum).includes(selectedFrequency)) {
//       console.error('Invalid email frequency selected:', selectedFrequency);
//       return;
//     }
//     setEmailFrequency(selectedFrequency);
//     const formData = new FormData();
//     formData.append('emailFrequency', selectedFrequency);

//     try {
//       const response = await axios.put(`${baseUrl}/preferences/${preferenceId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setMessage('Email frequency preference updated successfully!');
//     } catch (error) {
//       console.error('Error updating email frequency preference:', error);
//       setMessage('Error updating email frequency preference. Please try again later.');
//     }
//   };
//   const getIconForFrequency = (frequency) => {
//     return emailFrequencyEnum[frequency] || '⏰';
//   };
//   return (
//     <div>
//       <Select
//         className='select-email-frequency'
//         options={Object.keys(emailFrequencyEnum).map(key => ({
//           text: key.toLowerCase(),
//           value: key,
//           icon: getIconForFrequency(key)
//         }))}
//         title='Select Email Frequency'
//         onChange={handleChange}
//         value={emailFrequency}
//         size='large'
//         widthOfSelect='210px'
//       />
//       /* TO DO: replace message */
//       <p>{message}</p>
//     </div>
//   );
// };

// export default EmailFrequency;
