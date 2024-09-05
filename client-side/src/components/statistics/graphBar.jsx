
import * as React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAppSelector } from '../../redux/store.jsx';
import { getVisitedWebsitesByDate } from './graphsUtils.js';
import { GET_USER_BY_EMAIL } from './constants.js';
import Loader from '../../stories/loader/loader.jsx'

const GraphBar = ({ startDate, endDate }) => {
  let user = useAppSelector((state) => state.user.currentUser);

  const currentUser = useQuery(GET_USER_BY_EMAIL, {
    variables: { email: user.email },
  });

  if (currentUser.loading) return <p>Loading...</p>;
  if (currentUser.error) return <p>Error: {currentUser.error.message}</p>;
  if (!currentUser.loading && !currentUser.error) {
    user = currentUser.data.userByEmail;
  }
  const formattedStartDate = new Date(startDate.$d);
  const formattedEndDate = new Date(endDate.$d);
  const dataOfStartDate = getVisitedWebsitesByDate(user, formattedStartDate);
  const dataOfEndDate = getVisitedWebsitesByDate(user, formattedEndDate);

  const xAxisData = dataOfStartDate.map((item) => item.websiteName);
  const seriesData = [
    { data: dataOfStartDate.map((item) => item.activityTime) },
    { data: dataOfEndDate.map((item) => item.activityTime) }
  ];
  return (
    <>
      {currentUser.loading && <Loader className="secondary" />}
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
  startDate: PropTypes.instanceOf(Object).isRequired,
  endDate: PropTypes.instanceOf(Object).isRequired
};

export default GraphBar;