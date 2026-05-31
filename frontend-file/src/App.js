import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import { useState } from "react";

const App = () => {
  // useState is used to initate the state. the the value inside the () is the default value 
  // it returna an array of 2 value first one is the current state value
  // second one is the function to update it 
  const [searchText,setSearchText] = useState('');

// this is how the event is handling click
   const handleSearchSubmitEvent = (e) => {
    e.preventDefault();
    alert(searchText);
  }



  return (
    <div className="App">
      <Header title="Photo Gallery" />
      <Search handleSubmit={handleSearchSubmitEvent}  text={searchText} setText={setSearchText}/>
    </div>
  );
};

export default App;
