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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface FormValues {
  title: string;
  category: string;
  description: string;
}

// yup schema
const schema = yup.object().shape({
  title: yup.string().required("*Title is a required field"),
  category: yup.string().required("*Category is a required field"),
  description: yup.string().required("*Description is a required field"),
});

export default function CreateTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormValues) => {
    console.log(data);

    console.log("Form submission");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={Paper} elevation={6} maxWidth="xs" className=" ">
        <CssBaseline />
        <Box className="flex flex-col items-center p-5 mt-4">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <TaskOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a New Task
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
              defaultValue="Others"
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
              {...register("description")}
              className=""
            />
            {errors.description && (
              <p className="text-red-500 font-medium ">
                {errors.description.message}
              </p>
            )}

            <Button variant="outlined" type="submit" fullWidth className="my-4">
              Save Task
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
