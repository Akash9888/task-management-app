export type ITask = {
  id: number;
  title: string;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  CompletedDate: Date;
};
export type IMutateTask = {
  title: string;
  description: string;
  category: string;
};

export type IGenericResponse = {
  status: string;
  message: string;
};

export type ITaskResponse = {
  status: string;
  tasks: ITask;
};

export type ITasksResponse = {
  status: string;
  results: number;
  tasks: ITask[];
};
