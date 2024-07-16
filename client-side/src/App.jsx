import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
import Report from './stories/Report';
import Footer from './stories/footer/FooterComponent'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/> 
      <Report/>
      <Footer/>
     

    </div>
  );
}

export default App;
