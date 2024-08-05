// // import React from 'react';
// // import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// // import '../../style/profileActivationTimer.scss'
// // const ProfileActivationTimer = ({ profileActivationTime }) => {
// //   const durationSeconds = profileActivationTime * 60;

// //   const renderTime = ({ remainingTime }) => {
// //     const hours = Math.floor(remainingTime / 3600);
// //     const minutes = Math.floor((remainingTime % 3600) / 60);
// //     const seconds = remainingTime % 60;
// //     const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
// //     const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

// //     return (
// //       <div className="timer-container">
// //         <div className="timer-time">{`${hours}:${formattedMinutes}:${formattedSeconds}`}</div>
// //         <div className="timer-label">Time Left</div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="timer-wrapper">
// //       <CountdownCircleTimer
// //         isPlaying
// //         duration={durationSeconds}
// //         colors={[['rgb(45, 158, 126)']]}
// //         strokeWidth={4}
// //         size={100}
// //         trailColor="#d6d6d6"
// //       >
// //         {renderTime}
// //       </CountdownCircleTimer>
// //     </div>
// //   );
// // };

// // export default ProfileActivationTimer;
// import React from 'react';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// import '../../styles/profileActivationTimer.scss';
// const ProfileActivationTimer = ({ profileActivationTime, profileName }) => {
//   const durationSeconds = profileActivationTime * 60;
//   const renderTime = ({ remainingTime }) => {
//     const hours = Math.floor(remainingTime / 3600);
//     const minutes = Math.floor((remainingTime % 3600) / 60);
//     const seconds = remainingTime % 60;
//     const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
//     const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
//     return (
//       <div className="timer-container">
//         <div className='timer-title'>Profile {profileName}!</div>
//         <div className="timer-time">{`${hours}:${formattedMinutes}:${formattedSeconds}`}</div>
//         <div className="timer-label">Time Left</div>
//       </div>
//     );
//   };
//   return (
//     <div className="timer-wrapper">
//       <CountdownCircleTimer
//         key={profileActivationTime} // Make sure the timer resets when profileActivationTime changes
//         isPlaying
//         duration={durationSeconds}
//         colors={[['rgb(45, 158, 126)']]}
//         strokeWidth={4}
//         size={100}
//         trailColor="#D6D6D6"
//       >
//         {renderTime}
//       </CountdownCircleTimer>
//     </div>
//   );
// };
// export default ProfileActivationTime

import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import '../../style/profileActivationTimer.scss'
const ProfileActivationTimer = ({ profileActivationTime, profileName }) => {
  const durationSeconds = profileActivationTime * 60;
  const renderTime = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return (
      <div className="timer-container">
        <div className='timer-title'>Profile {profileName}!</div>
        <div className="timer-time">{`${hours}:${formattedMinutes}:${formattedSeconds}`}</div>
        <div className="timer-label">Time Left</div>
      </div>
    );
  };
  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        key={profileActivationTime} // Make sure the timer resets when profileActivationTime changes
        isPlaying
        duration={durationSeconds}
        colors={[['rgb(45, 158, 126)']]}
        strokeWidth={4}
        size={100}
        trailColor="#D6D6D6"
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};
export default ProfileActivationTimer;









