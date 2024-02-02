import React, { useCallback, useRef } from "react";
import { Friend } from "../types/friend";
import styles from "./SharedToDoList.module.css"
import ToDoList from "./ToDoList";
import { Task } from "../types/task";

interface SharedToDoListProps {
  friends: Friend[];
}

const SharedToDoList = ({friends}:SharedToDoListProps) => {

  const updateFunctions = useRef<{[friendName:string]:React.Dispatch<React.SetStateAction<Task[]>>}>({});

  const registerUpdateFunction = useCallback((friendName: string, func: React.Dispatch<React.SetStateAction<Task[]>> )=>{
    updateFunctions.current[friendName] = func;
  }, []);

  const moveTask = useCallback((fromFriend:string, toFriend:string, task:Task, index:number)=> {
    if (updateFunctions.current[fromFriend] && updateFunctions.current[toFriend]) {
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
    }
  }, []);

  return (
    <div className={styles.sharedContainer}>
      {friends.map((friend:Friend, index:number, arr:Friend[])=>
        <ToDoList registerUpdateFunction={registerUpdateFunction} moveTask={moveTask} friendName={friend.name} previousFriendName={arr[index-1]?.name || ''} nextFriendName={arr[index+1]?.name || ''} color={friend.color}></ToDoList>
      )}
    </div>
  )
}

export default SharedToDoList;