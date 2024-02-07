import React, { useCallback, useRef } from "react";
import { Friend } from "../types/friend";
import styles from "./SharedToDoList.module.css"
import ToDoList from "./ToDoList";
import { Task } from "../types/task";

interface SharedToDoListProps {
  friends: Friend[];
}

const SharedToDoList = ({friends}:SharedToDoListProps) => {

  const updateFunctions = useRef<{[friendId:number]:React.Dispatch<React.SetStateAction<Task[]>>}>({});

  const registerUpdateFunction = useCallback((friendId: number, func: React.Dispatch<React.SetStateAction<Task[]>> )=>{
    updateFunctions.current[friendId] = func;
  }, []);

  const moveTask = useCallback((fromFriend:number, toFriend:number, task:Task, index:number)=> {
    if (updateFunctions.current[fromFriend] && updateFunctions.current[toFriend]) {
      task.friend_id = toFriend;
      fetch(`http://localhost:3000/tasks/${task.id}`,
        {
          headers: {"Content-Type": "application/json"},
          method: "PUT",
          body: JSON.stringify({ "task":task } )
        })
        .then(function(res){ return res.json(); })
        .then(function(data){
          updateFunctions.current[fromFriend]((prevState:Task[])=>{
            return prevState.filter((t:Task)=> t.id !== task.id);
          });

          updateFunctions.current[toFriend]((prevState:Task[])=>{
            if ( index === 0 ) {
              return [task, ...prevState];
            }

            return [
              ...prevState.slice(0, index),
              task,
              ...prevState.slice(index)
            ]
          });
        });

    }
  }, []);

  return (
    <div className={styles.sharedContainer}>
      {friends.map((friend:Friend, index:number, arr:Friend[])=>
        <ToDoList friendId={friend.id} friendTasks={friend.tasks} registerUpdateFunction={registerUpdateFunction} moveTask={moveTask} friendName={friend.name} previousFriendId={arr[index-1]?.id || -1} nextFriendId={arr[index+1]?.id || -1} color={friend.color}></ToDoList>
      )}
    </div>
  )
}

export default SharedToDoList;