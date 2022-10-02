import { Todo } from "@prisma/client";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useFetchTodo } from "../utils/useFetchTodo";
import {
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiPushpinLine,
} from "react-icons/ri";
import toast from "react-hot-toast";
import UpdateModal from "../components/UpdateModal";

const Home = () => {
  const [skip, setSkip] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tags, setTags] = useState<{ id: number; tag: string }[]>([]);
  const [input, setInput] = useState({
    title: "",
    content: "",
    pinned: false,
    completed: false,
    id: 0,
  });
  const [take, setTake] = useState(6);
  const {
    data: querydata,
    error,
    isLoading,
    refetch: refetchTodos,
  } = useFetchTodo(skip, take);
  function handleModalOpen() {
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  }

  // set the pinned todos to the top
  useEffect(() => {
    if (querydata && querydata.posts) {
      const pinnedTodos = querydata?.posts.filter(
        (todo: Todo) => todo.pinned === true
      );
      const unpinnedTodos = querydata?.posts.filter(
        (todo: Todo) => todo.pinned === false
      );
      const sortedTodos = pinnedTodos.concat(unpinnedTodos);
      setTodos(sortedTodos);
    }
  }, [querydata]);

  function updateTodoHandler(todo: Todo) {
    setInput({
      title: todo.title,
      content: todo.content!,
      pinned: todo.pinned,
      completed: todo.completed,
      id: todo.id,
    });
    setTags(todo.tags.map((tag, index) => ({ id: index, tag: tag })));
    setIsUpdateModalOpen(true);
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
  console.log(todos);
  return (
    <div className="py-0 px-8 bg-black text-white">
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          refetch={refetchTodos}
        />
        <UpdateModal
          isOpen={isUpdateModalOpen}
          setIsOpen={setIsUpdateModalOpen}
          refetch={refetchTodos}
          input={input}
          setInput={setInput}
          tags={tags}
          setTags={setTags}
        />
        <div className="flex items-center justify-center flex-wrap max-w-[1200px]">
          {todos.map((item: Todo) => (
            <div
              key={item.id}
              onClick={() => updateTodoHandler(item)}
              className={`${
                item.completed
                  ? "bg-black hover:border-green-500 border-2 border-green-500"
                  : "bg-black hover:border-gray-600 border-gray-900"
              } m-4 p-6 text-left text-inherit no-underline hover:cursor-pointer border border-solid rounded-lg min-h-[200px] transition duration-300 ease-in-out w-[300px]`}
            >
              <h2 className="m-0 mr-4 flex mb-4 text-2xl">
                {item.title}
                {item.pinned && (
                  <span>
                    <RiPushpinLine className="ml-2 text-yellow-400" />
                  </span>
                )}
              </h2>
              <p className="m-0 text-xl">{item.content}</p>
              <ul className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="bg-gray-900 text-white px-2 py-1 rounded-lg"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
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
