import './App.scss';
import Header from './stories/header/header.jsx';
import Report from './components/Report/report.jsx';
import downloadPDF from './components/Report/diagram.jsx';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Report/> */}
      <downloadPDF/>
      <img src="/public/month.png" alt="" />
    </div>
  );
}

export default App;
