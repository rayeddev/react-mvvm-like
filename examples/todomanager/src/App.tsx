import { Fragment, useEffect, useRef } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useObservedObject } from "react-mvvm-like";
// s
import { Task, TodoViewModel } from "./ViewModel";

const todoViewModel = new TodoViewModel();

const TaskComponent = (props: { task: Task }) => {
  const task = props.task;
  const model = todoViewModel;

  return (
    <li className="list-group-item" key={task.id}>
      <div className="row p-1">
        <div
          className={`col text-start ${
            task.done ? "text-muted text-decoration-line-through" : ""
          }`}
          onClick={() => {
            model.toogle(task);
          }}
        >
          {task.title}
        </div>

        <span
          className="col-auto fs-6 fst-italic text-sm text-muted opacity-75"
          style={{ cursor: "pointer" }}
          onClick={() => model.removeTask(task)}
        >
          remove
        </span>
        <button
          className={`btn btn-sm btn-outline-${
            task.done ? "success" : "danger"
          } col-auto`}
          onClick={() => {
            model.toogle(task);
          }}
        >
          {task.done ? "Reopen" : "Finish"}
        </button>
      </div>

      {!task.done && (
        <>
          <span className="text-muted" style={{ fontSize: "0.80rem" }}>
            at {task.interval} second
          </span>
          <div className="mt-2 d-flex">
            {Array.apply(0, Array(task.autoDoneAfter)).map((e, i) => {
              return (
                <div
                  key={i}
                  style={{
                    background: task.interval <= i ? "gray" : "blue",
                    height: "4px",
                    marginLeft: "3px",
                    width: `${100 / task.autoDoneAfter - 1}%`
                  }}
                ></div>
              );
            })}
          </div>
        </>
      )}
    </li>
  );
};

export default function App() {
  const todoManager = useObservedObject(todoViewModel);
  const addTaskInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    todoManager.fetch();
  }, []);

  return (
    <div className="App">
      <div className="container pt-5">
        <h1>Todo Manager ({todoManager.tasks.length})</h1>
        <div className="d-flex f justify-content-center ">
          <div className="card col col-md-6 shadow-sm">
            <div className="card-header">
              <div className="row p-2">
                <input
                  className="form-control col"
                  ref={addTaskInput}
                  type="text"
                />
                <button
                  className="btn btn-sm btn-outline-primary  ms-2 col-auto"
                  onClick={() => {
                    if (addTaskInput.current!.value === "") return;
                    todoManager.addTask(addTaskInput.current!.value, false);
                    addTaskInput.current!.value = "";
                  }}
                >
                  Add Task
                </button>
              </div>
            </div>
            <ul className="list-group list-group-flush">
              {todoManager.tasks.map((p) => {
                return <TaskComponent key={p.id} task={p} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
