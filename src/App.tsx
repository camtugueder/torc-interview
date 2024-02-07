import React, { useEffect, useState } from 'react';
import './App.css';
import SharedToDoList from "./components/SharedToDoList";
import { Group } from "./types/group";

function App() {
  const [groups, setGroups] = useState<Group[]>([]);


  useEffect(() => {
    fetch('http://localhost:3000/groups/all_details')
      .then(response => response.json())
      .then(data => {
        // Set the fetched data to your component's state or context
        setGroups(data)
      }).catch(()=>{

    });
  }, []);

  return (
    <div className="App">
      {groups.map((group:Group)=>(
        <SharedToDoList friends={group.friends}></SharedToDoList>
      ))}

    </div>
  );
}

export default App;
