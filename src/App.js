import './App.css';
import SearchComponent from './SearchComponent';
function App() {
  return (
    <div className="App">
      <header className="App-header">
	  <h1>Stock Search</h1>
	  <div className="searchBar">
	  	<SearchComponent/>
	  </div>
      </header>
    </div>
  );
}

export default App;
