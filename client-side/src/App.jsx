import './App.scss';
import Report from './components/Report/report.jsx';
import downloadPDF from './components/Report/diagram.jsx';
import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Report/> */}
      <downloadPDF/>
      <Header/> 
      <Footer/>
    </div>
  );
}

export default App;
