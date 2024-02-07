import { Task } from "./task";

export interface Friend {
  id: number;
  name: string;
  color: string;
  tasks: Task[];
}