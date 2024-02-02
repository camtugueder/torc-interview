import React, { useEffect, useState } from "react";
import styles from "./ToDoList.module.css";
import { Task } from "../types/task";
import useLocalStorage from "../hooks/useLocalStorage";
interface ToDoListProps {
  friendName: string;
  color: string;
  registerUpdateFunction: (friendName: string, func: React.Dispatch<React.SetStateAction<Task[]>> ) => void;
  moveTask: (fromFriend:string, toFriend:string, task:Task, index:number) => void;
  previousFriendName: string;
  nextFriendName: string;
}

const ToDoList = ({friendName, color, registerUpdateFunction, moveTask, previousFriendName, nextFriendName}:ToDoListProps) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(friendName + '_todo', [])

  useEffect(()=>{
    registerUpdateFunction(friendName, setTasks);
  }, [])

  const addTask = () => {
    const desc = prompt('Describe the new task for ' + friendName + ':');
    if (desc) setTasks((prevState:Task[])=> [...prevState, {id: Date.now(), description: desc}]);
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
              <div className={`${styles.leftArrow} ${!previousFriendName ? styles.disabled : ''}`} onClick={()=> previousFriendName ? moveTask(friendName, previousFriendName, task, index) : undefined}>&larr;</div>
              <div className={styles.description}>{task.description}</div>
              <div className={`${styles.rightArrow} ${!nextFriendName ? styles.disabled : ''}`} onClick={()=> nextFriendName ? moveTask(friendName, nextFriendName, task, index) : undefined}>&rarr;</div>
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