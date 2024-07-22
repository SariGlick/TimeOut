import React, { useState } from 'react';
import './App.scss';
import DateTimePicker from './components/report.jsx'
import VisitedWebsitesComponent from './graphs/graphs.jsx';
function App() {

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

  return (
    <div className="App">

      <br></br>
      <br></br>
      <br></br>
      <DateTimePicker onDateSubmit={handleDateSubmit} />
      <br></br>
      <br></br>
      <br></br>
      {showVisitedWebsites && <VisitedWebsitesComponent startDate={startDate} endDate={endDate} user={user} />}
    </div>
  );
}

export default App;
