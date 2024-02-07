import React, { useEffect, useState } from "react";
import styles from "./ToDoList.module.css";
import { Task } from "../types/task";
import useLocalStorage from "../hooks/useLocalStorage";
interface ToDoListProps {
  friendId: number;
  friendName: string;
  color: string;
  registerUpdateFunction: (friendId: number, func: React.Dispatch<React.SetStateAction<Task[]>> ) => void;
  moveTask: (fromFriend:number, toFriend:number, task:Task, index:number) => void;
  previousFriendId: number;
  nextFriendId: number;
  friendTasks: Task[];
}

const ToDoList = ({friendId, friendTasks, friendName, color, registerUpdateFunction, moveTask, previousFriendId, nextFriendId}:ToDoListProps) => {
  const [tasks, setTasks] = useState<Task[]>(friendTasks);

  useEffect(()=>{
    registerUpdateFunction(friendId, setTasks);
  }, [])

  const addTask = () => {
    const desc = prompt('Describe the new task for ' + friendName + ':');
    if (desc) {
      let task:Task = {description: desc, friend_id: friendId}
      fetch("http://localhost:3000/tasks",
        {
          headers: {"Content-Type": "application/json"},
          method: "POST",
          body: JSON.stringify({ "task":task } )
        })
        .then(function(res){ return res.json(); })
        .then(function(data){
          setTasks((prev) => [...prev, data as Task])
        });
    }
  }

  return (
    <div className={styles.toDoListContainer}>
      <div className={styles.friendName} style={{backgroundColor: color}}>
        {friendName}
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task:Task, index:number)=>{
          return(
            <li className={styles.task} key={task.id}>
              <div className={`${styles.leftArrow} ${ previousFriendId === -1 ? styles.disabled : ''}`} onClick={()=> previousFriendId > 0 ? moveTask(friendId, previousFriendId, task, index) : undefined}>&larr;</div>
              <div className={styles.description}>{task.description}</div>
              <div className={`${styles.rightArrow} ${ nextFriendId === -1 ? styles.disabled : ''}`} onClick={()=> nextFriendId > 0 ? moveTask(friendId, nextFriendId, task, index) : undefined}>&rarr;</div>
            </li>
          )
        })}
      </ul>
      <button className={styles.addTask} onClick={addTask}>
        Add Task!
      </button>
    </div>
  );
}

export default ToDoList;