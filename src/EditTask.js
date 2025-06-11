import React, { useState } from "react";
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
const EditTask = ({ onBack, todo, onUpdate }) => {
  const [editedTodo, setEditedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  function handleUpdateClick() {
    onUpdate(editedTodo); // إرسال التعديلات إلى المكون الأب
    onBack();
  }
  // function handleUpdateConfirm() {
  //   const updatedTodos = todos.filter((t) => {
  //     if (t.id == todo.id) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   });
  //   setTodos(updatedTodos);
  // }
  return (
    <Container
      maxWidth="sm"
      style={{
        width: "100%",
        height: "100%",
        marginTop: "20px",
        marginBottom: "20px",
        border: "1px solid #9395D3", // إضافة حواف
        borderRadius: "15px", // تأكيد النحناءات
        padding: "0", // إزالة الحشو الداخلي إذا لزم الأمر
        overflow: "hidden", // لمنع تجاوز المحتوى للنحناءات
        margin: 0, // إضافة هذه السطر
      }}
    >
      <Box
        sx={{
          background: "#9395D3",
          width: "100%",
          textAlign: "center",
          // borderTopRightRadius: "15px",
          // borderTopLeftRadius: "15px",
          display: "flex",
          flexDirection: "row",
          py: 2,
        }}
      >
        <IconButton
          onClick={onBack}
          //   className="iconButton"
          style={{
            color: "white",
            background: "#9395D3",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" color="white" style={{ fontWeight: "normal" }}>
          Edit Task
        </Typography>
      </Box>
      <Box
        sx={{
          background: "white",
          height: "100%",

          display: "flex",
          flexDirection: "column",
          //   justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          value={editedTodo.title}
          style={{ width: "70%", marginBottom: "8px" }}
          onChange={(e) => {
            setEditedTodo({ ...editedTodo, title: e.target.value });
          }}
        />
        <TextField
          id="standard-basic"
          label="Details"
          variant="standard"
          style={{ width: "70%", marginBottom: "8px" }}
          value={editedTodo.details}
          onChange={(e) => {
            setEditedTodo({ ...editedTodo, details: e.target.value });
          }}
        />
        <Box
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "space-around",
            padding: "12px",
          }}
        >
          <Button
            onClick={handleUpdateClick}
            sx={{
              color: "white",
              background: "#9395D3",
              m: 2,
              "&:hover": {
                bgcolor: "#7a7cb3",
              },
            }}
          >
            Update
          </Button>
          <Button
            onClick={onBack}
            sx={{
              color: "white",
              background: "#9395D3",
              m: 2,
              "&:hover": {
                bgcolor: "#7a7cb3",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditTask;
