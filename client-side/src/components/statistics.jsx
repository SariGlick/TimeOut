import React, { useState, useCallback } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import VisitedWebsitesComponent from './statistics/graphs.jsx';
import DateTimePicker from '../../src/stories/datePicker/DatePicker.jsx'
import GraphBar from './statistics/graphBar.jsx';
import RadioButtonComponent from '../stories/RadioButton/radio-Button.jsx';
import { options } from './statistics/constants.js';
const Statistics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectBar, setSelectBar] = useState(undefined);

    const onSubmit = useCallback((arrDate) => {
        setStartDate(arrDate[0]);
        setEndDate(arrDate[1]);
    }, []);

    const onChange = (event) => {
        if (startDate !== '' && endDate !== '') {
            setSelectBar(event.target.value);
        }
    };
    const appolo_server_url = process.env.REACT_APP_APOLLO_SERVER_URL;

    const client = new ApolloClient({
        uri: appolo_server_url,
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <DateTimePicker onSubmit={onSubmit} />
            <RadioButtonComponent options={options} selectedOption={""} onChange={onChange} />
            {selectBar === "BarChart" && <GraphBar startDate={startDate} endDate={endDate} />}
            {selectBar === "PieChart" && <VisitedWebsitesComponent startDate={startDate} endDate={endDate} />}
        </ApolloProvider>
    );
};

export default Statistics;