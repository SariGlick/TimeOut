<<<<<<< HEAD
import './App.scss';
import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header';
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
function App() {
  return (
    <RouterProvider router={router} />
=======
import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/> 
      <Footer/>
     

    </div>
>>>>>>> 7a54ea14ecfeeace1da41b97384a0fb93c5557c2
  );
}
export default App;
