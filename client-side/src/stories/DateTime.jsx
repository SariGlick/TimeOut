import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import './DateTime.scss';

const DateTime = ({ date, format }) => {
  if (!(date instanceof Date && !isNaN(date))) {
    return <Box className="dateTime">Date is not valid</Box>;
  }

  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);

  switch (format) {
    case 'full':
      return <Box>{date.toString()}</Box>;
    case 'date':
      return <Box>{`${year}-${month}-${day}`}</Box>;
    case 'time':
      return <Box>{`${hours}:${minutes}`}</Box>;
    case 'day':
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return <Box>{daysOfWeek[date.getDay()]}</Box>;
    case 'dayPart':
      return <Box>{date.getHours() >= 12 ? 'PM' : 'AM'}</Box>;
    case 'time4Digits':
      return <Box>{`${hours}${minutes}`}</Box>;
    case 'year':
      return <Box>{year}</Box>;
    case 'month':
      return <Box>{month}</Box>;
    case 'dayOfMonth':
      return <Box>{day}</Box>;
    case 'time24':
      return <Box>{`${hours}:${minutes}`}</Box>;
    default:
      return <Box>Invalid format</Box>;
  }
};

DateTime.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  format: PropTypes.oneOf(['full', 'date', 'time', 'day', 'dayPart', 'time4Digits', 'year', 'month', 'dayOfMonth', 'time24']).isRequired,
};

DateTime.defaultProps = {
  format: 'full',
};

export default DateTime;