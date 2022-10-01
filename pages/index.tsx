import { Todo } from "@prisma/client";
import { useState } from "react";
import Modal from "../components/Modal";
import { useFetchTodo } from "../utils/useFetchTodo";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { useCompleteTodo } from "../utils/useCompleteTodo";
import toast from "react-hot-toast";

const Home = () => {
  const [skip, setSkip] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [take, setTake] = useState(6);
  const {
    data: querydata,
    error,
    isLoading,
    refetch: refetchTodos,
  } = useFetchTodo(skip, take);
  const completeTodoMutation = useCompleteTodo();
  console.log(querydata);
  function handleModalOpen() {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }

  function completeTodoHandler(id: number) {
    completeTodoMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Todo Updated");
        refetchTodos();
      },
      onError: (error) => {
        toast.error(JSON.stringify(error));
      },
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }
  return (
    <div className="py-0 px-8 bg-black text-white">
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          refetch={refetchTodos}
        />
        <div className="flex items-center justify-center flex-wrap max-w-[1200px]">
          {querydata?.posts.map((item: Todo) => (
            <div
              key={item.id}
              onClick={() => completeTodoHandler(item.id)}
              className={`${
                item.completed
                  ? "bg-black hover:border-green-500 border-2 border-green-500"
                  : "bg-black hover:border-gray-600 border-gray-900"
              } m-4 p-6 text-left text-inherit no-underline hover:cursor-pointer border border-solid rounded-lg min-h-[180px] transition duration-300 ease-in-out w-[300px]`}
            >
              <h2 className="m-0 mr-4 mb-4 text-2xl">{item.title}</h2>
              <p className="m-0 text-xl">{item.content}</p>
            </div>
          ))}
        </div>
        <div>
          {querydata?.hasMore && (
            <button
              onClick={() => {
                setSkip((prev) => prev + take);
              }}
              className="text-white flex items-center hover:underline font-bold py-2 px-4 rounded"
            >
              Load More
              <RiArrowRightSLine className="ml-2" />
            </button>
          )}
          {querydata.hasPrevious && (
            <button
              onClick={() => {
                setSkip((prev) => prev - take);
              }}
              className="text-white flex items-center font-bold hover:underline py-2 px-4 rounded"
            >
              <RiArrowLeftSLine className="mr-2" />
              Previous
            </button>
          )}
        </div>
        <button
          onClick={() => handleModalOpen()}
          className="text-white flex items-center font-bold hover:underline py-2 px-4 rounded"
        >
          Add Todo
        </button>
      </main>
    </div>
  );
};

export default Home;
