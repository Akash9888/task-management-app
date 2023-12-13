"use client";
import Image from "next/image";
import TaskCard from "./Components/Task/Tasks";
import { Box, Toolbar } from "@mui/material";
import Tasks from "./Components/Task/Tasks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUsersQuery } from "@/redux/services/userApi";

export default function Home() {
  // const count = useAppSelector((state) => state.counterReducer.value);
  // const dispatch = useAppDispatch();

  // const { isLoading, isFetching, data, error } = useGetUsersQuery(null);

  return <Tasks />;
  //   <>
  //     {error ? (
  //       <p>Oh no, there was an error</p>
  //     ) : isLoading || isFetching ? (
  //       <p>Loading...</p>
  //     ) : data ? (
  //       <h1>{data.length}</h1>
  //     ) : null}
  //   </>
  // );
  // return <Tasks />;
}
