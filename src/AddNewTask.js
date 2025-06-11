import React from "react";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "./contexts/todosContext";
//  MUI
import Box from "@mui/material/Box";
import { Card, Container, CardActions, CardContent } from "@mui/material";
import { Button, Typography, Divider } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// ICONS
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// External Libraries
import { v4 as uuidv4 } from "uuid";

const AddNewTask = ({ onBack }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  function handleAddTaskClick() {
    if (titleInput.trim() === "") return; // لا تضف إذا كان العنوان فارغًا
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: detailsInput,
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    // onAddTask(newTodo); // استدعاء الدالة من المكون الأب
    setTitleInput(""); // مسح الحقل بعد الإضافة
    setDetailsInput(""); // مسح الحقل بعد الإضافة
    onBack();
  }
  
  return (
    <Container
      maxWidth="sm"
      style={{
        // width: "100%",
        // height: "100%",
        // marginTop: "20px",
        // marginBottom: "20px",
        border: "1px solid #9395D3", // إضافة حواف
        borderRadius: "15px", // تأكيد النحناءات
        padding: "0", // إزالة الحشو الداخلي إذا لزم الأمر
        overflow: "hidden", // لمنع تجاوز المحتوى للنحناءات
        width: "100%", // إضافة هذه السطر
        margin: 0, // إضافة هذه السطر
      }}
    >
      <Box
        sx={{
          background: "#9395D3",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          py: 2,
        }}
      >
        <IconButton
          onClick={onBack}
          style={{
            color: "white",
            background: "#9395D3",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" color="white" style={{ fontWeight: "normal" }}>
          Add Task
        </Typography>
      </Box>
      <Box
        sx={{
          background: "white",
          height: "100%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          style={{ width: "70%", marginBottom: "8px" }}
          value={titleInput}
          onChange={(e) => {
            setTitleInput(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="Details"
          variant="standard"
          style={{ width: "70%", marginBottom: "8px" }}
          value={detailsInput}
          onChange={(e) => {
            setDetailsInput(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            handleAddTaskClick();
          }}
          sx={{
            color: "white",
            background: "#9395D3",
            my: 3,
            "&:hover": {
              bgcolor: "#7a7cb3",
            },
          }}
        >
          Add
        </Button>
      </Box>
    </Container>
  );
};

export default AddNewTask;
