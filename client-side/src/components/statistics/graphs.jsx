import * as React from 'react';
import PropTypes from 'prop-types'
import { PieChart, ChartsLegend } from '@mui/x-charts';
import Stack from '@mui/material/Stack';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_WEBSITE } from './constants.js';
import { useAppSelector } from '../../redux/store.jsx';
import { getWebsites, formatDate, getRandomColor } from './graphsUtils.js';
import Loader from '../../stories/loader/loader.jsx'
import './graphs.scss'

const VisitedWebsitesComponent = ({ startDate, endDate }) => {
    const websites = useQuery(GET_WEBSITE);
    const users = useQuery(GET_USERS);
    const user = useAppSelector((state) => state.user.currentUser);
    let website = [];
    let dateStart = new Date(startDate.$d);
    dateStart = formatDate(dateStart)
    let dateEnd = new Date(endDate.$d);
    dateEnd = formatDate(dateEnd);

    if (!websites.error && !users.error && !websites.loading && !users.loading) {
        website = getWebsites(websites, users, user, dateStart, dateEnd);
    }

    const otherProps = {
        width: 400,
        height: 200,
        sx: {
            [`.${ChartsLegend.root}`]: {
                transform: 'translate(20px, 0)',
            },
        },
    };

    return (
        <>
            {(websites.loading || users.loading) && <Loader className="secondary" />}
            <Stack className="custom-stack">
                <PieChart
                    data-testid="pie-chart"
                    series={[
                        {
                            data: website.map((data) => ({ label: data.name, value: data.time, color: getRandomColor() })),
                        },
                    ]}
                    {...otherProps}
                />
            </Stack>
        </>
    );
}

VisitedWebsitesComponent.propTypes = {
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired
};


export default VisitedWebsitesComponent;
