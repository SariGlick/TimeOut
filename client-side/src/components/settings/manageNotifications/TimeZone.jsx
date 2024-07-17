// import React, { useState } from 'react';
// import moment from 'moment-timezone';
// import axios from 'axios';
// import Select from '../../../stories/Select/Select.jsx';

// const validTimeZones = {
//     'America/New_York': '🗽', 
//     'Europe/London': '🎡',   
//     'Asia/Tokyo': '🗼',    
//     'Asia/Jerusalem': '🕍',
//     'Europe/Paris':'🗼',
//     'Europe/Madrid':'🏰'

// };

// const TimeZone = () => {
//     const [timeZone, setTimeZone] = useState('');
//     const baseUrl = process.env.REACT_APP_BASE_URL;
//     const userId = '66940b051ccb2852370d5a17';

//     const handleTimeZoneChange = async (event) => {
//         const selectedTimeZone = event.target.value;
//         if (!Object.keys(validTimeZones).includes(selectedTimeZone)) {
//             console.error('Invalid time zone selected:', selectedTimeZone);
//             return;
//         }

//         setTimeZone(selectedTimeZone);

//         const formData = new FormData();
//         formData.append('timeZone', selectedTimeZone);

//         try {
//             const response = await axios.put(`${baseUrl}/users/${userId}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log('Time zone preference updated successfully!', response.data);
//         } catch (error) {
//             console.error('Error updating time zone preference:', error);
//         }
//     };

//     const formatTime = (time) => {
//         if (timeZone) {
//             return moment(time).tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
//         } else {
//             return moment(time).format('YYYY-MM-DD HH:mm:ss');
//         }
//     };

//     const getIconForTimeZone = (timeZone) => {
//         return validTimeZones[timeZone] || '⏰'; // Default clock icon if no specific icon is defined
//     };

//     return (
//         <div>
//             <Select
//                 title="Select Time Zone:"
//                 options={Object.keys(validTimeZones).map(key => ({
//                     text: key.replace('_', ' '), // Adjust label if needed
//                     value: key,
//                     icon: getIconForTimeZone(key)
//                 }))}
//                 value={timeZone}
//                 onChange={handleTimeZoneChange}
//                 size='large'
//                 widthOfSelect='200px'
//             />
//             <p>Current time in {timeZone}: {formatTime(new Date())}</p>
//         </div>
//     );
// };

// export default TimeZone;
