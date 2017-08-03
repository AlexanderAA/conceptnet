import React from 'react';
import SearchBar from '../containers/searchbar';
import ResultsList from '../containers/resultslist';


const App = () => (
  <div className="container">
    <SearchBar />
    <ResultsList />
  </div>
);

export default App;
