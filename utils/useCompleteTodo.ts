import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCompleteTodo() {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      const res = await fetch("/api/complete", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
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
