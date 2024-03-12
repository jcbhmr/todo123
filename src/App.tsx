import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Buy groceries for the week", completed: true },
    { id: 2, text: "Call mom", completed: false },
    { id: 3, text: "Finish the report by EOD", completed: true }
  ]);
  const [newTodoText, setNewTodoText] = useState('');

  const handleCheckboxChange = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        text: newTodoText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4 max-w-md mx-auto">
      <div className="mx-auto flex items-center space-x-4">
        <Input
          className="flex-1 text-gray-500 dark:text-gray-400 truncate pl-2"
          placeholder="Enter a new todo item..."
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <Button
          className="hover:opacity-80 active:opacity-100"
          size="icon"
          variant="subdued"
          onClick={handleAddTodo}
        >
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Add</span>
        </Button>
      </div>
      <div className="grid">
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center gap-4">
            <label
              className="flex items-center cursor-pointer p-2 rounded-lg"
              htmlFor={todo.id}
            >
              <input
                checked={todo.completed}
                className="form-checkbox h-4 w-4 text-gray-600 dark:text-gray-400"
                id={todo.id}
                type="checkbox"
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <span className={todo.completed ? "line-through font-medium pl-2" : "font-medium pl-2"}>
                {todo.text}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
