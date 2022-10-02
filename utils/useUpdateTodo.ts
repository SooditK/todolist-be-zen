import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: {
      id: number;
      content: string;
      tags: string[];
      title: string;
      pinned: boolean;
      completed: boolean;
    }) => {
      console.log(data);
      const res = await fetch("/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.id,
          content: data.content,
          tags: data.tags,
          title: data.title,
          pinned: data.pinned,
          completed: data.completed,
        }),
      });
      const resdata = await res.json();
      return resdata;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["todos"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
}
