import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import '../../styles/profileActivationTimer.scss';

const ProfileActivationTimer = ({ profileActivationTime }) => {
  const durationSeconds = profileActivationTime * 60;

  const renderTime = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return (
      <div className="timer-container">
        <div className="timer-time">{`${hours}:${formattedMinutes}:${formattedSeconds}`}</div>
        <div className="timer-label">Time Left</div>
      </div>
    );
  };

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        isPlaying
        duration={durationSeconds}
        colors={[['rgb(45, 158, 126)']]}
        strokeWidth={4}
        size={100}
        trailColor="#d6d6d6"
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default ProfileActivationTimer;
