import "./App.css";
import { useState } from "react";
import TodoList from "./components/TodoList";
import AddNewTask from "./AddNewTask";
import EditTask from "./EditTask";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import Todo from "./components/Todo";
// External Libraries
import { v4 as uuidv4 } from "uuid";
const initialTodos = [
  {
    id: uuidv4(),
    title: "reading book 1",
    details: "read 10 pages",
    isCompleted: false,
  },

  {
    id: uuidv4(),
    title: "reading book 2",
    details: "read 10 pages",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "reading book 3",
    details: "read 10 pages",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "reading book 4",
    details: "read 10 pages",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "reading book 5",
    details: "read 10 pages",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "reading book 6",
    details: "read 10 pages",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialTodos);
  const theme = createTheme({
    typography: { fontFamily: ["Jost"] },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#191b1f",
        }}
      >
        <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
          <TodoList />
        </TodosContext.Provider>
        {/* <EditTask />
        <AddNewTask /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
