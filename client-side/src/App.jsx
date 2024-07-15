import './App.scss';
import Header from './stories/header/header.jsx';
import Report from './components/Report/report.jsx';
import DownloadPage from './components/Report/htmlPDF.jsx';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <Report/>
      <DownloadPage/>
      <img src="/public/month.png" alt="" />
    </div>
  );
}

export default App;
