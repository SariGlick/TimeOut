import React, { useState, useCallback } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import VisitedWebsitesComponent from './statistics/graphs.jsx';

const Statistics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showVisitedWebsites, setShowVisitedWebsites] = useState(false);

    const onSubmit = useCallback((arrDate) => {
        setStartDate(arrDate[0]);
        setEndDate(arrDate[1]);
        setShowVisitedWebsites(true);
    }, []);

    const appolo_server_url = process.env.REACT_APP_APOLLO_SERVER_URL;

    const client = new ApolloClient({
        uri: appolo_server_url,
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <DateTimePicker onSubmit={onSubmit} />
            {showVisitedWebsites && <VisitedWebsitesComponent startDate={startDate} endDate={endDate} />}
        </ApolloProvider>
    );
};

export default Statistics;