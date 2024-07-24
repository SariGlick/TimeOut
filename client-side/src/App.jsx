import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';
import DateFormatter from '../src/stories/date/GenericDate.jsx';
import format from 'pretty-format';

function App() {
  return (
    <div className="App">
      <Header/> 
      <Footer/>
    </div>
  );
}
export default App;
