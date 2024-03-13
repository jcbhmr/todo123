import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

interface TodoItem {
  timeStamp: number;
  id: string;
  title: string;
  completed: boolean;
}

function useTodos() {
  const [localTodos, setLocalTodos] = useLocalStorage<TodoItem[]>(
    "reactodo:localtodos",
    [],
  );
  const [sessionTodos, setSessionTodos] = useSessionStorage<TodoItem[]>(
    "reactodo:sessiontodos",
    localTodos,
  );

  const todos = localTodos
    .concat(sessionTodos.filter((a) => !localTodos.some((b) => a.id === b.id)))
    .sort((a, b) => b.timeStamp - a.timeStamp);
  function setTodos(newTodos: TodoItem[]) {
    const uncompletedTodos = newTodos.filter((t) => !t.completed);
    setLocalTodos(uncompletedTodos);
    setSessionTodos(newTodos);
  }

  return [todos, setTodos] as const;
}

function createTodo(title: string): TodoItem {
  const id = Math.random().toString().slice(2, 6).padStart(4, "0");
  const timeStamp = new Date().valueOf();
  return { timeStamp, id, title, completed: false };
}

function AppTodoItem(props: {
  todo: TodoItem;
  setTodo: (id: string, todo: TodoItem) => void;
}) {
  const { todo, setTodo } = props;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTodo(todo.id, {
      ...todo,
      completed: event.target.checked,
    });
  }

  return (
    <div className="flex items-center gap-4">
      <label
        className="flex items-center cursor-pointer p-2 rounded-lg"
        htmlFor={todo.id}
      >
        <input
          checked={todo.completed}
          className="form-checkbox h-4 w-4 text-gray-600 dark:text-gray-400"
          id={todo.id}
          type="checkbox"
          onChange={handleChange}
        />
        <span
          className={
            todo.completed
              ? "line-through font-medium pl-2"
              : "font-medium pl-2"
          }
        >
          {todo.title}
        </span>
      </label>
    </div>
  );
}

function AppAddTodoItem(props: { addTodo: (todo: TodoItem) => void }) {
  const { addTodo } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const newTodo = createTodo(title);
    addTodo(newTodo);
    (event.target as HTMLFormElement).reset();
    inputRef.current?.focus();
  }

  return (
    <div className="flex items-center space-x-4">
      <form className="contents" action="#" onSubmit={handleSubmit}>
        <Button
          className="hover:opacity-80 active:opacity-100"
          size="icon"
          variant="secondary"
        >
          <div className="flex justify-center items-center h-4 w-4">➕</div>
          <span className="sr-only">Add</span>
        </Button>
        <Input
          ref={inputRef}
          className="flex-1 text-gray-500 dark:text-gray-400 truncate pl-2"
          placeholder="Enter a new todo item..."
          type="text"
          name="title"
          required
        />
      </form>
    </div>
  );
}

function AppTodoList(props: {
  todos: TodoItem[];
  setTodos: (todos: TodoItem[]) => void;
}) {
  const { todos, setTodos } = props;

  function setTodo(id: string, newTodo: TodoItem) {
    const newTodos = todos.map((t) => (t.id === id ? newTodo : t));
    setTodos(newTodos);
  }
  function addTodo(newTodo: TodoItem) {
    const newTodos = todos.concat(newTodo);
    setTodos(newTodos);
  }

  return (
    <div className="grid">
      <AppAddTodoItem addTodo={addTodo} />
      {todos.map((todo) => (
        <AppTodoItem key={todo.id} todo={todo} setTodo={setTodo} />
      ))}
    </div>
  );
}

function AppCleanTodos(props: {
  todos: TodoItem[];
  setTodos: (todos: TodoItem[]) => void;
}) {
  const { todos, setTodos } = props;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const newTodos = todos.filter((t) => !t.completed);
    setTodos(newTodos);
  }

  return (
    <form className="contents" action="#" onSubmit={handleSubmit}>
      <Button
        className="hover:opacity-80 active:opacity-100"
        size="icon"
        variant="secondary"
      >
        <div className="flex justify-center items-center h-4 w-4">🧹</div>
        <span className="sr-only">Clean</span>
      </Button>
    </form>
  );
}

export default function App() {
  const [todos, setTodos] = useTodos();
  return (
    <div className="flex flex-col w-full gap-4 p-4 max-w-md mx-auto">
      <AppTodoList todos={todos} setTodos={setTodos} />
      <AppCleanTodos todos={todos} setTodos={setTodos} />
    </div>
  );
}
