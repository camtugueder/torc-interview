import React from 'react';
import './App.css';
import SharedToDoList from "./components/SharedToDoList";

function App() {
  const friends = [{name:'Adam', color:'blue'},{name:'Brian', color:'red'},{name:'Charlie', color:'orange'},{name:'Dave', color:'black'}]

  return (
    <div className="App">
      <SharedToDoList friends={friends}></SharedToDoList>
    </div>
  );
}

export default App;
