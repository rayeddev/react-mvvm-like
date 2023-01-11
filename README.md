# react-mvvm-like
support applying MVVM using reactjs inspired by SwiftUI

## Install 
```bash
npm install react-mvvm-like
```

## .tsconfig
```
"compilerOptions": {
  ...
  "experimentalDecorators": true, // 👈️ must be enabled
  ...
}
```

____

## Example
### Model
```ts
// Model
interface Todo {
  id: string;
  title: string;
  done: boolean;
}
```



### ViewModel (extend from ObserableObject)
```ts
class TodoManager extends ObservableObject {
  // use publish decorator to publish changes to react component 
  @Published todos: Todo[] = [];

  addTodo(title: string) {
    this.todos = [
      ...this.todos,
      { id: new Date().toLocaleTimeString(), title: title, done: false }
    ];
  }

  setDone(id: string) {
    this.todos = this.todos.map((t: Todo) => {
      if (t.id == id) {
        t.done = true;
      }
      return t;
    });
  }
}
```

### View use hook (useObservedObject) to receive ViewModel changes and trigger render
```tsx
const viewModel = new TodoManager();

export default function App() {

  // useObservedObject hook for observe published changes and emit render
  const modelV = useObservedObject(viewModel);

  const addInput = useRef<HTMLInputElement>(null);
  return (
    <div className="App">
      <h1>Todo Manager</h1>
      <input type="text" ref={addInput} />
      <button
        onClick={() => {
          modelV.addTodo(addInput.current!.value);
          addInput.current!.value = "";
        }}
      >
        Add
      </button>
      <ul>
        {modelV.todos.map((t: Todo) => {
          return (
            <li
              style={{ textDecoration: t.done ? "line-through" : undefined }}
              onClick={() => {
                modelV.setDone(t.id);
              }}
            >
              {t.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```