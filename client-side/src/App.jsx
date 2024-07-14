import './App.scss';
import Header from './stories/header/header.jsx';
import Report from './components/Report/report.jsx';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <Report/>
      <img src="/public/month.png" alt="" />
    </div>
  );
}

export default App;
