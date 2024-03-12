import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="flex flex-col w-full gap-4 p-4 max-w-md mx-auto">
      <div className="mx-auto flex items-center space-x-4">
        <Input
          className="flex-1 text-gray-500 dark:text-gray-400 truncate pl-2"
          placeholder="Enter a new todo item..."
          type="text"
        />
        <Button
          className="hover:opacity-80 active:opacity-100"
          size="icon"
          variant="subdued"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Add</span>
        </Button>
      </div>
      <div className="grid">
        <div className="flex items-center">
          <label
            className="flex items-center cursor-pointer p-2 rounded-lg"
            htmlFor="groceries"
          >
            <input
              checked
              className="form-checkbox h-4 w-4 text-gray-600 dark:text-gray-400"
              id="groceries"
              type="checkbox"
            />
            <span className="line-through font-medium pl-2">
              Buy groceries for the week
            </span>
          </label>
        </div>
        <div className="flex items-center gap-4">
          <label
            className="flex items-center cursor-pointer p-2 rounded-lg"
            htmlFor="callMom"
          >
            <input
              className="form-checkbox h-4 w-4 text-gray-600 dark:text-gray-400"
              id="callMom"
              type="checkbox"
            />
            <span className="font-medium pl-2">Call mom</span>
          </label>
        </div>
        <div className="flex items-center gap-4">
          <label
            className="flex items-center cursor-pointer p-2 rounded-lg"
            htmlFor="report"
          >
            <input
              checked
              className="form-checkbox h-4 w-4 text-gray-600 dark:text-gray-400"
              id="report"
              type="checkbox"
            />
            <span className="line-through font-medium pl-2">
              Finish the report by EOD
            </span>
          </label>
        </div>
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
