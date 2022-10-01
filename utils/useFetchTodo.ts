import { useQuery } from "@tanstack/react-query";

export function useFetchTodo(skip?: number, take?: number) {
  return useQuery(["todo", { skip, take }], async () => {
    const res = await fetch(`/api/get?skip=${skip}&take=${take}`);
    const data = await res.json();
    return data;
  });
}
