import React from 'react';
import './App.scss';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/Settings.jsx';
import VerticalTabss from './stories/verticalTabs/verticalTabss.jsx';
import './App.scss';

function App() {
 
   
  
  return (
    <div className="App">
      <Header/>
      <VerticalTabss className='fdfd' labels={['acount','mesage','notification']} onClick={()=>{console.log('click function');}} />
      <Footer/>
    </div>
  );
}

export default App;
