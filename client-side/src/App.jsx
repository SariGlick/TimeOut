import Header from './stories/header/header.jsx';
import Report from './components/Report/report.jsx';
// import DownloadPage from './components/Report/htmlPDF.jsx';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <Report/>
      {/*לדוגמא הגרפים  <DownloadPage divID="pdf-content"/> כקוובץ פדפ נשתמש בקומפוננטה הזו ונשלח כפרופס את ה ת"ז של הדיב שאותו נרצה להדפיס html כאשר נרצה להוריד */}
    </div>
  );
}

export default App;
