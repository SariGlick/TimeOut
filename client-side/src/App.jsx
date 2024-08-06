import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';
import DatePicker from './components/report';
import DateInput from './stories/DateTime/DateInput';

function App() {
  return (
    <div className="App">
      <Header/> 
      <Footer/>
      <DateInput/>
     

    </div>
  );
}

export default App;
