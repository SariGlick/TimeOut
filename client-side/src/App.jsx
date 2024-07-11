import './App.scss';

import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
import PdfGenerator from './components/pdf';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <PdfGenerator data={[{SiteName:'gmail',BrowsingTime:20,AvgForADay:1}]} /> {/*   כאן נשלח כל נתנונים מהשרת: תאריך של הנפקת הדוח והטבלה עם הנתונים, איזה תאריך מדובר והאם מדובר על תקופה או על יום\חודש\שנה... */}
    </div>
  );
}

export default App;
