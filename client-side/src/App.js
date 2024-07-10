
import './App.css';
function App() {
  return (
    <div className="App">
        
        <DateTime date={currentDate} format="full" />
     <DateTime date={currentDate} format="date" />
     <DateTime date={currentDate} format="time" />
    </div>
  );
}

export default App;
