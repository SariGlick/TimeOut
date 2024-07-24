import React, { useState } from 'react';
import DateTimePicker from './report.jsx'
import VisitedWebsitesComponent from '../graphs/graphs.jsx';


const Statistics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showVisitedWebsites, setShowVisitedWebsites] = useState(false);

    const handleDateSubmit = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        setShowVisitedWebsites(true);

    };

    const user = {
        name: "jack",
        email: "jack@gmail.com",
        password: "fdfdfd",
        googleId: "fdfdffdfd",
        profileImage: "rimon.jpg",
    }
    return (<>

        <DateTimePicker onDateSubmit={handleDateSubmit} />
        {showVisitedWebsites && <VisitedWebsitesComponent startDate={startDate} endDate={endDate} user={user} />}


    </>)
}
export default Statistics

