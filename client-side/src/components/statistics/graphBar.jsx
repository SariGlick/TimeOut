import * as React from 'react';
import { useQuery } from '@apollo/client';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAppSelector } from '../../redux/store.jsx';
import Loader from '../../stories/loader/loader.jsx'
import { getVisitedWebsitesByDate, formatDate } from './graphsUtils.js';
import { GET_USERS } from './queries.js';

export default function GraphBar({ startDate, endDate }) {
  const users = useQuery(GET_USERS);
  const user = useAppSelector((state) => state.user.currentUser);
  startDate = formatDate(new Date(startDate.$d));
  endDate = formatDate(new Date(endDate.$d));
  const result1 = getVisitedWebsitesByDate(users, user, startDate);
  const result2 = getVisitedWebsitesByDate(users, user, endDate);

  const xAxisData = result1.map((item) => item.websiteName);
  const seriesData = [
    { data: result1.map((item) => item.activityTime) },
    { data: result2.map((item) => item.activityTime) }
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