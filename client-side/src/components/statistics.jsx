import React, { useState } from 'react';
import DateTimePicker from './report.jsx'
import VisitedWebsitesComponent from '../graphs/graphs.jsx';
import {useAppSelector} from '../redux/store.jsx'

const Statistics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showVisitedWebsites, setShowVisitedWebsites] = useState(false);

    const handleDateSubmit = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        setShowVisitedWebsites(true);

    };

    const user = useAppSelector((state) => state.user.currentUser)

    return (<>

        <DateTimePicker onDateSubmit={handleDateSubmit} />
        {showVisitedWebsites && <VisitedWebsitesComponent startDate={startDate} endDate={endDate} user={user} />}


    </>)
}
export default Statistics

