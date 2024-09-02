import React, { useState, useCallback } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import DateTimePicker from '../stories/DateTime/DateTimePicker.jsx';
import VisitedWebsitesComponent from './statistics/graphs.jsx';
import GraphBar from './statistics/graphBar.jsx';
import RadioButtonComponent from '../stories/RadioButton/radio-Button.jsx';
const Statistics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [show, setShow] = useState(false);
    const [whatShow, setWhatShow] = useState('BarChart');

    const onSubmit = useCallback((arrDate) => {
        setStartDate(arrDate[0]);
        setEndDate(arrDate[1]);
        setShow(true);
    }, []);

    const onChange = (event) => {
        setWhatShow(event.target.value);
    };
    const appolo_server_url = process.env.REACT_APP_APOLLO_SERVER_URL;

    const client = new ApolloClient({
        uri: appolo_server_url,
        cache: new InMemoryCache()
    });
    const arr = [{ label: "PieChart", value: "PieChart" }, { label: "BarChart", value: "BarChart" }];
    return (
        <ApolloProvider client={client}>
            <DateTimePicker onSubmit={onSubmit} />
            <RadioButtonComponent options={arr} selectedOption={""} onChange={onChange} />
            {show && whatShow === "BarChart" && <GraphBar startDate={startDate} endDate={endDate} />}
            {show && whatShow === "PieChart" && <VisitedWebsitesComponent startDate={startDate} endDate={endDate} />}
        </ApolloProvider>
    );
};

export default Statistics;