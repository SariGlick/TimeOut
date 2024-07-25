import { BrowserRouter as Router } from 'react-router-dom';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/> 
        <Footer/>
      </Router>
    </div>
  );
}
export default App;
