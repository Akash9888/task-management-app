// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { IMutateTask, ITask, ITaskResponse } from "../types";
// //  import NProgress from "nprogress";

// const BASEURL = "http://127.0.0.1:8000/api/tasks/";

// export const noteAPI = createApi({
//   reducerPath: "noteAPI",
//   baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
//   tagTypes: ["Tasks"],
//   endpoints: (builder) => ({
//     createNote: builder.mutation<ITaskResponse, IMutateTask>({
//       query(task) {
//         return {
//           url: "add",
//           method: "POST",
//           credentials: "include",
//           body: task,
//         };
//       },
//       invalidatesTags: [{ type: "Tasks", id: "LIST" }],
//       transformResponse: (result: { note: ITaskResponse }) => result.note,
//       onQueryStarted(arg, api) {
//         // NProgress.start();
//       },
//     }),
//     updateNote: builder.mutation<
//       ITaskResponse,
//       { id: string; note: IMutateTask }
//     >({
//       query({ id, note }) {
//         return {
//           url: `/${id}`,
//           method: "PATCH",
//           credentials: "include",
//           body: note,
//         };
//       },
//       invalidatesTags: (result, error, { id }) =>
//         result
//           ? [
//               { type: "Tasks", id },
//               { type: "Tasks", id: "LIST" },
//             ]
//           : [{ type: "Tasks", id: "LIST" }],
//       transformResponse: (response: { note: ITaskResponse }) => response.note,
//       onQueryStarted(arg, api) {
//         // NProgress.start();
//       },
//     }),
//     getNote: builder.query<ITaskResponse, string>({
//       query(id) {
//         return {
//           url: `/${id}`,
//           credentials: "include",
//         };
//       },
//       providesTags: (result, error, id) => [{ type: "Tasks", id }],
//     }),
//     getAlltasks: builder.query<ITask[], { page: number; limit: number }>({
//       query({ page, limit }) {
//         return {
//           url: "",
//           method: "GET",
//           //   url: `/?page=${page}&limit=${limit}`,
//           credentials: "include",
//         };
//       },
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map(({ id }) => ({
//                 type: "Tasks" as const,
//                 id,
//               })),
//               { type: "Tasks", id: "LIST" },
//             ]
//           : [{ type: "Tasks", id: "LIST" }],
//       transformResponse: (results: { tasks: ITask[] }) => results.tasks,
//       onQueryStarted(arg, api) {
//         // NProgress.start();
//       },
//       keepUnusedDataFor: 5,
//     }),
//     deleteNote: builder.mutation<ITaskResponse, string>({
//       query(id) {
//         return {
//           url: `/${id}`,
//           method: "DELETE",
//           credentials: "include",
//         };
//       },
//       invalidatesTags: [{ type: "Tasks", id: "LIST" }],
//       onQueryStarted(arg, api) {
//         // NProgress.start();
//       },
//     }),
//   }),
// });

// export const {
//   useCreateNoteMutation,
//   useDeleteNoteMutation,
//   useUpdateNoteMutation,
//   useGetAlltasksQuery,
// } = noteAPI;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Task = {
  id: number;
  title: string;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  CompletedDate: Date;
};

export const noteAPI = createApi({
  reducerPath: " noteAPI",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/tasks",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], null>({
      query: () => "/",
    }),
    getTaskById: builder.mutation<Task[], { id: number }>({
      query: ({ id }) => `/task/${id}`,
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (data) => ({
        url: "/add/",
        method: "POST",
        body: data,
      }),
    }),
    deleteTaskById: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
    updateTaskById: builder.mutation<Task, { id: number; data: Partial<Task> }>(
      {
        query: ({ id, data }) => ({
          url: `/update/${id}/`,
          method: "PUT",
          body: data,
        }),
      }
    ),
    completeTaskById: builder.mutation<
      Task,
      { id: number; data: Partial<Task> }
    >({
      query: ({ id, data }) => ({
        url: `/complete/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdMutation,
  useDeleteTaskByIdMutation,
  useUpdateTaskByIdMutation,
  useCompleteTaskByIdMutation,
  useCreateTaskMutation,
} = noteAPI;
