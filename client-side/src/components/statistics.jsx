import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { selectAuth } from '../redux/auth/auth.selector.js';
import VisitedWebsitesComponent from './statistics/graphs.jsx';
import DatePicker from '../stories/datePicker/DatePicker.jsx'
import GraphBar from './statistics/graphBar.jsx';
import RadioButtonComponent from '../stories/RadioButton/radio-Button.jsx';
import { options } from './statistics/constants.js';
import moment from 'moment-timezone'; 


const Statistics = () => {
    const { user } = useSelector(selectAuth);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectBar, setSelectBar] = useState(undefined);

    const { timeZone = 'UTC', dateFormat = 'DD-MM-YYYY' } = user.preference;

    const onSubmit = useCallback((arrDate) => {
        const formattedStartDate = moment(arrDate[0]).tz(timeZone).format(dateFormat);
        const formattedEndDate = moment(arrDate[1]).tz(timeZone).format(dateFormat);
        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
    }, [timeZone, dateFormat]);

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
            <DatePicker onSubmit={onSubmit} />
            <RadioButtonComponent options={options} selectedOption={""} onChange={onChange} />
            {selectBar === "BarChart" && <GraphBar startDate={startDate} endDate={endDate} />}
            {selectBar === "PieChart" && <VisitedWebsitesComponent startDate={startDate} endDate={endDate} />}
        </ApolloProvider>
    );
};

export default Statistics;