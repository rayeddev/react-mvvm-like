import { Published, ObservableObject } from "react-mvvm-like";
import { v4 as uuidv4 } from "uuid";
const tasksAutoDoneDefaultSpan: number = 10;
export type Task = {
  id: string;
  title: string;
  done: boolean;
  autoDoneAfter: number; // seconds
  interval: number;
};

export class TodoViewModel extends ObservableObject {
  @Published tasks: Task[] = [];
  interfvalRef?: NodeJS.Timer;

  async fetch() {
    this.tasks = [
      {
        id: uuidv4(),
        title: "push recent updates",
        done: true,
        autoDoneAfter: tasksAutoDoneDefaultSpan,
        interval: 0
      },
      {
        id: uuidv4(),
        title: "code review 1",
        done: false,
        autoDoneAfter: tasksAutoDoneDefaultSpan,
        interval: 0
      }
    ];

    this.intervalToggle();
  }

  intervalToggle() {
    if (this.interfvalRef) {
      clearInterval(this.interfvalRef);
      this.interfvalRef = undefined;
      this.intervalToggle();
    } else {
      this.interfvalRef = setInterval(() => {
        this.tasks = this.tasks.map((t) => {
          if (t.interval < t.autoDoneAfter) {
            t.interval++;
          } else {
            t.done = true;
          }
          return t;
        });
      }, 1000);
    }
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }

  addTask(title: string, done: boolean = false) {
    this.tasks.push({
      id: uuidv4(),
      title: title,
      done: done,
      autoDoneAfter: tasksAutoDoneDefaultSpan,
      interval: 0
    });
    this.tasks = [...this.tasks];
  }

  toogle(task: Task, compelete?: boolean) {
    this.tasks = this.tasks.map((t) => {
      if (t.id === task.id) {
        t.done = compelete ? compelete : !t.done;
        if (!t.done) {
          t.interval = 0;
        }
      }
      return t;
    });
  }

  doneAll() {
    this.tasks = this.tasks.map((t) => {
      t.done = true;
      return t;
    });
  }
  pushToServer() {}
}
