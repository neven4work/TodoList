import React from "react";
import { useState, useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
// MUI
import {
  Card,
  Container,
  CardActions,
  CardContent,
  Modal,
  Box,
} from "@mui/material";
import { Button, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditTask from "../EditTask";
//palette  first #3a9a9b second #4ac1c5 third c0c0c0 forth ffffff

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

const Todo = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);

  // Event Handlers
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setShowDeleteAlert(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteAlert(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      if (t.id == todo.id) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  // دالة التحديث
  const handleUpdateConfirm = (updatedTodo) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, ...updatedTodo };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEditClick = () => setShowUpdateAlert(true);
  const handleUpdateClose = () => setShowUpdateAlert(false);
  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={showDeleteAlert}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Task"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirm} style={{ color: "red" }}>
            Delete
          </Button>
          <Button onClick={handleDeleteDialogClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Delete Dialog ===*/}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#FFFFFF",
          color: "white",
          borderRadius: "15px",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{ textAlign: "left", color: "#9395D3", fontWeight: 600 }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "left",
                  color: "GrayText",
                  fontWeight: "normal",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            {/* Action Buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className="iconButton"
                aria-label="delete"
                onClick={handleEditClick}
                style={{
                  color: "#B3B7EE",
                  background: "white",
                  //   border: "solid #B3B7EE 3px",
                }}
              >
                <EditIcon />
              </IconButton>
              {/* Delete Button */}
              <IconButton
                onClick={handleDeleteClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#B3B7EE",
                  background: "white",
                }}
              >
                <DeleteIcon />
              </IconButton>
              {/*=== Delete Button ===*/}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#B3B7EE",
                  background: todo.isCompleted ? "#B3B7EE" : "white",
                  //   border: "solid #B3B7EE 3px",
                }}
              >
                <CheckIcon />
                {/* <CheckCircleOutlineIcon /> */}
              </IconButton>
            </Grid>
            {/*=== Action Buttons ===*/}
          </Grid>
        </CardContent>
      </Card>
      {/* Modal for Edit Task */}
      <Modal
        open={showUpdateAlert}
        onClose={handleUpdateClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditTask
            onBack={handleUpdateClose}
            todo={todo}
            onUpdate={handleUpdateConfirm}
          />
        </Box>
      </Modal>
      {/*=== Modal for Edit Task ===*/}
    </>
  );
};

export default Todo;
