import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';
import DateInputs from './stories/DateTime/DateInputs';

function App() {
  return (
    <div className="App">
      <Header/> 
      <Footer/>
      <DateInputs/>
     

    </div>
  );
}

export default App;
