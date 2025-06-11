import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../contexts/todosContext";
//  MUI
import Box from "@mui/material/Box";
import {
  Card,
  Container,
  CardActions,
  CardContent,
  Modal,
} from "@mui/material";
import { Button, Typography, Divider } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
// Components
import Todo from "./Todo";
import AddNewTask from "../AddNewTask";
// ICONS
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  border: "1px solid #9395D3",
  borderRadius: "15px",
};
const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);
  //   const [showAddTask, setShowAddTask] = useState(false);
  const [open, setOpen] = useState(false);
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  const notcompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });
  let todosToBeRendered = todos;
  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "uncompleted") {
    todosToBeRendered = notcompletedTodos;
  } else {
    todosToBeRendered = todos;
  }
  const todosJsx = todosToBeRendered.map((todo) => (
    <Todo key={todo.id} todo={todo} />
  ));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFilterChange = (type) => {
    setDisplayedTodosType(type);
  };
  //   // Filter todos based on displayedTodosType
  //   const filteredTodos = todos.filter((todo) => {
  //     if (displayedTodosType === "all") return true;
  //     if (displayedTodosType === "completed") return todo.isCompleted;
  //     if (displayedTodosType === "uncompleted") return !todo.isCompleted;
  //     return true;
  //   });
  useEffect(() => {
    console.log("caling use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
  }, []);
  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          width: "100%",
          height: "100%",
          marginTop: "20px",
          marginBottom: "20px",
          border: "2px solid #9395D3", // إضافة حواف
          borderRadius: "15px", // تأكيد النحناءات
          padding: "0", // إزالة الحشو الداخلي إذا لزم الأمر
          overflow: "hidden", // لمنع تجاوز المحتوى للنحناءات
        }}
      >
        <Box
          sx={{
            background: "#9395D3",
            width: "100%",
            textAlign: "center",
            py: 2,
          }}
        >
          <Typography variant="h2" color="white" style={{ fontWeight: 600 }}>
            All Tasks
          </Typography>
        </Box>
        <Card
          sx={{
            width: "100%",
            background: "#D1D1D6",
            textAlign: "center",
            borderRadius: "0px",
            position: "relative",
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", // إضافة هذه السطر
          }}
        >
          <CardContent
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              pb: 10,
              maxHeight: "340px",
              minHeight: "340px",
              transition: 'opacity 0.3s ease',
              opacity: todosToBeRendered.length ? 1 : 0.7
            }}
          >
            {/* All Todos */}
            {todosJsx}
            {/* Filtered Todos */}
            {/* {filteredTodos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))} */}

            {/*=== All Todos ===*/}
          </CardContent>
          <CardActions dir="rtl"></CardActions>
          <Box
            sx={{
              position: "fixed", // تغيير من absolute إلى fixed
              bottom: "8%", // زيادة المسافة قليلاً
              right: "28%", // زيادة المسافة قليلاً
              zIndex: 1,
            }}
          >
            <Button
              sx={{
                color: "white",
                background: "#9395D3",
                borderRadius: "50%",
                minWidth: 56,
                height: 56,
                "&:hover": {
                  bgcolor: "#7a7cb3",
                },
                boxShadow: 3, // إضافة ظل لتحسين الرؤية
              }}
              onClick={handleOpen}
            >
              <AddIcon />
            </Button>
          </Box>
        </Card>
        <Box
          sx={{
            background: "#FFFFFF",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              size={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Button
                className="listButton"
                // value={displaedTodosType}
                onClick={() => handleFilterChange("all")}
                style={{
                  color: displayedTodosType === "all" ? "white" : "#9395D3",
                  backgroundColor:
                    displayedTodosType === "all" ? "#9395D3" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  transition: "all 0.3s ease",
                  //   border: "solid #B3B7EE 3px",
                }}
              >
                <FormatListBulletedIcon />
                <Typography variant="body2">All</Typography>
              </Button>
            </Grid>

            {/* Filter Buttons */}
            <Grid
              size={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Button
                className="listButton"
                aria-label="delete"
                onClick={() => handleFilterChange("completed")}
                style={{
                  color:
                    displayedTodosType === "completed" ? "white" : "#9395D3",
                  backgroundColor:
                    displayedTodosType === "completed" ? "#9395D3" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  transition: "all 0.3s ease",
                }}
              >
                <PlaylistAddCheckIcon />
                <Typography variant="body2">Completed</Typography>
              </Button>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                className="listButton"
                aria-label="delete"
                onClick={() => handleFilterChange("uncompleted")}
                style={{
                  color:
                    displayedTodosType === "uncompleted" ? "white" : "#9395D3",
                  backgroundColor:
                    displayedTodosType === "uncompleted" ? "#9395D3" : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  transition: "all 0.3s ease",
                  //   border: "solid #B3B7EE 3px",
                }}
              >
                <PlaylistRemoveIcon />
                <Typography variant="body2">UnCompleted</Typography>
              </Button>
            </Grid>
            {/*=== Action Buttons ===*/}
          </Grid>
        </Box>
      </Container>
      {/* Modal for AddNewTask */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddNewTask onBack={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default TodoList;
