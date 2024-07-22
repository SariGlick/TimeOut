import { Route, Routes } from 'react-router';
// import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
// import Report from './component/Report';
import Footer from './stories/footer/FooterComponent'
import ListComponenet from './stories/list/List';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/> 
      <ListComponenet/>
      <Footer/>
     

    </div>
  );
}

export default App;
