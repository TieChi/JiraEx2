import { Task } from "types/task";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
// import {
//   useAddConfig,
//   useDeleteConfig,
//   useEditConfig,
// } from "utils/use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

// export const useEditProject = (queryKey: QueryKey) => {
//   const client = useHttp();
//   return useMutation(
//     (params: Partial<Project>) =>
//       client(`projects/${params.id}`, {
//         method: "PATCH",
//         data: params,
//       }),
//     useEditConfig(queryKey)
//   );
// };

// export const useAddProject = (queryKey: QueryKey) => {
//   const client = useHttp();

//   return useMutation(
//     (params: Partial<Project>) =>
//       client(`projects`, {
//         data: params,
//         method: "POST",
//       }),
//     useAddConfig(queryKey)
//   );
// };

// export const useDeleteProject = (queryKey: QueryKey) => {
//   const client = useHttp();

//   return useMutation(
//     ({ id }: { id: number }) =>
//       client(`projects/${id}`, {
//         method: "DELETE",
//       }),
//     useDeleteConfig(queryKey)
//   );
// };

// export const useProject = (id?: number) => {
//   const client = useHttp();
//   return useQuery<Project>(
//     ["project", { id }],
//     () => client(`projects/${id}`),
//     {
//       enabled: Boolean(id),
//     }
//   );
// };
