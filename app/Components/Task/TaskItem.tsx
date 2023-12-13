import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Button, Chip, Modal, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DoneIcon from "@mui/icons-material/Done";
import {
  useDeleteTaskByIdMutation,
  useCompleteTaskByIdMutation,
} from "@/redux/services/noteApi";
import UpdateTask from "../Modal/UpdateTask";

interface Props {
  task: {
    id: number;
    title: string;
    category: string;
    description: string;
    createdAt: Date;
    isCompleted: boolean;
    completedDate: Date;
  };
  refetchTasks: () => void; // Function to refetch tasks after deletion
}

export default function TaskItem({ task, refetchTasks }: Props) {
  const [deleteTaskById] = useDeleteTaskByIdMutation();
  const [completeTaskById] = useCompleteTaskByIdMutation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTaskById({ id });
      refetchTasks(); // After successful deletion, refetch tasks
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleCompleteTask = async (id: number) => {
    console.log("Complete task:", id);
    try {
      await completeTaskById({
        id,
        data: {
          isCompleted: true, // Update isCompleted to true
        },
      });
      refetchTasks();

      // Perform other actions upon successful update
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle the error
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          Created At: {new Date(task.createdAt).toLocaleString()}
        </Typography>
        {task.isCompleted && (
          <Typography variant="body2" color="text.secondary" className="mb-3">
            Completed At: {new Date(task.completedDate).toLocaleString()}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {task?.description?.length > 300
            ? task.description.slice(0, 300) + "...."
            : task.description}
        </Typography>
      </CardContent>

      <CardActions className="flex justify-between ">
        {task.isCompleted ? (
          <Chip color="success" size="small" label="Completed" />
        ) : (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              handleCompleteTask(task.id);
            }}
          >
            Complete
          </Button>
        )}

        <Box className="flex justify-between items-center">
          <IconButton
            aria-label="share"
            className="text-orange-400"
            onClick={() => {
              handleDeleteTask(task.id);
            }}
          >
            <Tooltip title="Delete" placement="top-start">
              <DeleteForeverOutlinedIcon />
            </Tooltip>
          </IconButton>
          {!task.isCompleted && (
            <IconButton
              aria-label="share"
              className="text-red-400"
              onClick={handleOpen}
            >
              <Tooltip title="Edit" placement="top-start">
                <ModeEditOutlinedIcon />
              </Tooltip>
            </IconButton>
          )}
          <IconButton aria-label="share" className="text-blue-400">
            <Tooltip title="View" placement="top-start">
              <RemoveRedEyeOutlinedIcon />
            </Tooltip>
          </IconButton>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <UpdateTask
            task={task}
            refetchTasks={refetchTasks}
            onClose={handleClose}
          />
        </Modal>
      </CardActions>
    </Card>
  );
}
