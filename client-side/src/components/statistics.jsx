import React, { useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import DateTimePicker from './report.jsx';
import VisitedWebsitesComponent from './statistics/graphs.jsx';

const Statistics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showVisitedWebsites, setShowVisitedWebsites] = useState(false);

    const handleDateSubmit = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        setShowVisitedWebsites(true);
    };

    const appolo_server_url = process.env.REACT_APP_APOLLO_SERVER_URL;

    const client = new ApolloClient({
        uri: appolo_server_url,
        cache: new InMemoryCache()
    });

    return (
        <>
            <ApolloProvider client={client}>
                <DateTimePicker onDateSubmit={handleDateSubmit} />
                {showVisitedWebsites && <VisitedWebsitesComponent startDate={startDate} endDate={endDate} />}
            </ApolloProvider>
        </>
    );
};
export default Statistics;

