"use client";
import * as React from "react";

import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import categories from "@/app/Utils/categories";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Paper } from "@mui/material";
import {
  useCreateTaskMutation,
  useGetTaskByIdMutation,
  useUpdateTaskByIdMutation,
} from "@/redux/services/noteApi";

import { usePathname, useRouter } from "next/navigation";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface FormValues {
  title: string;
  category: string;
  description: string;
}
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
  refetchTasks: () => void;
  onClose: () => void; // Function to refetch tasks after deletion
}

// yup schema
const schema = yup.object().shape({
  title: yup.string().required("*Title is a required field"),
  category: yup.string().required("*Category is a required field"),
  description: yup.string().required("*Description is a required field"),
});

export default function CreateTask({ task, refetchTasks, onClose }: Props) {
  console.log(task);
  // const {
  //   isLoading: sDataLoading,
  //   isFetching,
  //   data: tasks,
  //   error,
  //   refetch,
  // } = useGetTaskByIdMutation();
  // React.useEffect(() => {
  //   getTaskById()
  // },[])
  // console.log("update data", tasks);

  const [updateTaskById] = useUpdateTaskByIdMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  // const router = useRouter();
  // React.useEffect(() => {
  //   if (isSuccess) {
  //     console.log("Success blok");
  //     router.push("/");
  //   }

  //   // if (isError) {

  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading]);

  const onSubmit = async (data: FormValues) => {
    try {
      await updateTaskById({
        id: task.id,
        data,
      });
      refetchTasks();
      onClose(); // After successful deletion, refetch tasks
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={Paper} elevation={6} maxWidth="xs" className=" ">
        <CssBaseline />
        <h1>Update Your Note</h1>
        <Box className="flex flex-col items-center p-5 mt-4">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <TaskOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Your Task
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              id="title"
              margin="normal"
              label="Title"
              multiline
              required
              fullWidth
              maxRows={2}
              defaultValue={task.title}
              {...register("title")}
              className=""
            />
            {errors.title && (
              <p className="text-red-500 font-medium ">
                {errors.title.message}
              </p>
            )}
            <TextField
              id="category"
              select
              label="Category"
              defaultValue={task.category}
              fullWidth
              {...register("category")}
              className="my-3"
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {errors.category && (
              <p className="text-red-500  font-medium ">
                {errors.category.message}
              </p>
            )}
            <TextField
              id="description"
              label="Description"
              required
              multiline
              rows={4}
              fullWidth
              defaultValue={task.description}
              {...register("description")}
              className=""
            />
            {errors.description && (
              <p className="text-red-500 font-medium ">
                {errors.description.message}
              </p>
            )}

            <Button variant="outlined" type="submit" fullWidth className="my-4">
              Update Task
            </Button>
            {/* {isError && (
              <p className="text-red-500 font-medium ">Erroooo.........</p>
            )}
            {isLoading && (
              <p className="text-red-500 font-medium ">Loading.........</p>
            )} */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
