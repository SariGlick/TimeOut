import * as React from 'react';
import PropTypes from 'prop-types'
import { PieChart, ChartsLegend } from '@mui/x-charts';
import Stack from '@mui/material/Stack';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_WEBSITE } from './queries.js';

const VisitedWebsitesComponent = ({ startDate, endDate, user }) => {
    const websites = useQuery(GET_WEBSITE);
    const users = useQuery(GET_USERS);
    const colors = ["red", "yellow", "orange", "blue", "lightgreen"]

    function formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1
        let day = date.getDate()
        let d = `${year}-${month}-${day}`
        return d;
    }

    let dateStart = new Date(startDate.$d);
    dateStart = formatDate(dateStart)
    let dateEnd = new Date(endDate.$d);
    dateEnd = formatDate(dateEnd)
    if (websites.loading || users.loading) return <p>Loading...</p>;

    if (websites.error || users.error) return <p>Error</p>;

    function getWebsites(dateStart, dateEnd) {
        let website = websites?.data?.websites?.map((obj, index) => ({ ...obj, color: colors[index] }))
        const u = users?.data?.users?.find(u => u.email === user.email)

        const totalActivityTimeByWebsite = {};

        u.visitsWebsites.forEach(visitedWebsite => {
            const websiteName = visitedWebsite.websiteId.name;
            const activityTime = visitedWebsite.visitsTime.reduce((total, visit) => {
                let date = new Date(visit.visitDate)
                date = formatDate(date)
                if (date >= dateStart && date <= dateEnd) {
                    return total + Number(visit.activityTime);
                }
                return total;
            }, 0);

            if (totalActivityTimeByWebsite[websiteName]) {
                totalActivityTimeByWebsite[websiteName] += activityTime;
            } else {
                totalActivityTimeByWebsite[websiteName] = activityTime;
            }
        });

        website.forEach(site => {
            const websiteName = site.name;
            if (totalActivityTimeByWebsite[websiteName]) {
                site.time = totalActivityTimeByWebsite[websiteName];
            }
        });

        return website
    }
    let website = getWebsites(dateStart, dateEnd)


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
            <h4>this is your data </h4>
            <h4>between the dates {dateStart} and {dateEnd}</h4>
            <Stack direction="row" width="100%" textAlign="center" spacing={2}>
                <PieChart
                    series={[
                        {
                            data: website.map((data) => ({ label: data.name, value: data.time, color: data.color })),
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
    endDate: PropTypes.instanceOf(Date).isRequired,
    user: PropTypes.object.isRequired,
};


export default VisitedWebsitesComponent;
