"use client";
import React, { useEffect } from "react";
import CreateTask from "../Modal/CreateTask";
import { Typography } from "@mui/material";
import { useGetTasksQuery } from "@/redux/services/noteApi";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const {
    isLoading,
    isFetching,
    data: tasks,
    error,
    refetch,
  } = useGetTasksQuery(null);
  const refetchTasks = () => {
    refetch(); // Function to refetch tasks
  };

  useEffect(() => {
    if (tasks) {
      console.log("Success blok");
      console.log(tasks);
    }

    // if (isError) {

    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <main className="h-full p-5 rounded-md">
      <Typography>All Tasks</Typography>

      <div className="grid gap-5 grid-cols-3">
        {tasks?.map((task, index) => (
          <TaskItem key={index} task={task} refetchTasks={refetchTasks} />
        ))}
      </div>

      {/* <CreateTask /> */}
    </main>
  );
};

export default Tasks;
