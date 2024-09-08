import React from 'react';
import PropTypes from 'prop-types'; 
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {TIMER_COLORS} from '../../constants/profileConstants.js';
import '../../styles/profileActivationTimer.scss';

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
        {profileName && <div className='timer-title'>Profile {profileName}!</div>} 
        <div className="timer-time">{`${hours}:${formattedMinutes}:${formattedSeconds}`}</div>
        <div className="timer-label">Time Left</div>
      </div>
    );
  };

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        key={profileActivationTime} 
        isPlaying
        duration={durationSeconds}
        colors={[TIMER_COLORS.primary]}
        strokeWidth={4}
        size={100}
        trailColor="#d6d6d6"
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

ProfileActivationTimer.propTypes = {
  profileActivationTime: PropTypes.number.isRequired,
  profileName: PropTypes.string, 
};

ProfileActivationTimer.defaultProps = {
  profileName: null,
};

export default ProfileActivationTimer;
