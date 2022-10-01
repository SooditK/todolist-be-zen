import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useCreateTodo } from "../utils/useCreateTodo";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refetch: () => void;
}

export default function MyModal({ isOpen, setIsOpen, refetch }: ModalProps) {
  function closeModal() {
    setIsOpen(false);
  }
  const [input, setInput] = useState({
    title: "",
    content: "",
  });
  const mutation = useCreateTodo();

  async function handleSubmit() {
    if (input.title === "" || input.content === "") {
      toast.error("Please fill all the fields");
    } else {
      toast.loading("Creating Todo...");
      mutation.mutate(input, {
        onError: (error) => {
          toast.dismiss();
          toast.error(String(error));
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Todo Created");
          setInput({
            title: "",
            content: "",
          });
          refetch();
          closeModal();
        },
      });
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-white"
                  >
                    Please Enter Todo Details
                  </Dialog.Title>
                  <div className="m-8 flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Add Todo Title"
                      value={input.title}
                      onChange={(e) =>
                        setInput({ ...input, title: e.target.value })
                      }
                      className="bg-gray-800 text-white p-2 rounded-md w-full border-b-2 border-gray-700 focus:outline-none focus:border-blue-600"
                    />
                    <textarea
                      placeholder="Add Todo Content"
                      value={input.content}
                      onChange={(e) =>
                        setInput({ ...input, content: e.target.value })
                      }
                      className="bg-gray-800 text-white p-2 rounded-md w-full border-b-[1px] border-gray-700 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Add Todo
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
