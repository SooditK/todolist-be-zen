import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: { title: string; content: string; tags: string[] }) => {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resdata = await res.json();
      return resdata;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );
}
