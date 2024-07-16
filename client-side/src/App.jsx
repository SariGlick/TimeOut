import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';
import Login from './Login/login';
import { useState } from 'storybook/internal/preview-api';
import ResponsiveAppBar from './stories/header/header';
import SignUp from './signUp/signUp';

function App() {
  // const [userName, setUserName] = useState(localStorage.getItem('nameUser') || '');

  // const handleLogin = (name) => {
  //   setUserName(name);
  // };
  return (
    
    <div className="App">
      <Header/> 
      {/* <ResponsiveAppBar userName={userName} />
      <Login onLogin={handleLogin} /> */}
      <Login/>
      {/* <SignUp/> */}
      <Footer/>
   

    </div>
  );
}

export default App;
