import * as React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAppSelector } from '../../redux/store.jsx';
import Loader from '../../stories/loader/loader.jsx'
import { getVisitedWebsitesByDate, formatDate } from './graphsUtils.js';
import { GET_USERS } from './constants.js';

const GraphBar = ({ startDate, endDate }) => {
  const users = useQuery(GET_USERS);
  const user = useAppSelector((state) => state.user.currentUser);
  const formattedStartDate = new Date(startDate.$d);
  const formattedEndDate = new Date(endDate.$d);
  const dataOfStartDate = getVisitedWebsitesByDate(users, user, formattedStartDate);
  const dataOfEndDate = getVisitedWebsitesByDate(users, user, formattedEndDate);

  const xAxisData = dataOfStartDate.map((item) => item.websiteName);
  const seriesData = [
    { data: dataOfStartDate.map((item) => item.activityTime) },
    { data: dataOfEndDate.map((item) => item.activityTime) }
  ];

  return (
    <>
      {(users.loading) && <Loader className="secondary" />}
      <BarChart
        xAxis={[{ scaleType: 'band', data: xAxisData }]}
        series={seriesData}
        width={500}
        height={300}
      />
    </>
  );
}

GraphBar.propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired
};

export default GraphBar;