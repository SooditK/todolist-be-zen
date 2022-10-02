import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

interface TagsInputProps {
  tags: { id: number; tag: string }[];
  setTags: React.Dispatch<React.SetStateAction<{ id: number; tag: string }[]>>;
}

const TagsInput = ({ setTags, tags }: TagsInputProps) => {
  //@ts-ignore
  const addTags = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, { id: tags.length + 1, tag: event.target.value }]);
      event.target.value = "";
    }
  };

  const removeTags = (index: number) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  return (
    <div className="flex flex-wrap w-full bg-gray-800 rounded-md p-2 text-white border-b-2 border-gray-700 focus:outline-none focus:border-blue-600">
      <ul className="flex flex-wrap w-full">
        {tags.map((tag, index) => (
          <li
            className="flex items-center justify-center m-1 bg-gray-700 rounded-md p-1"
            key={index}
          >
            <span className="text-white flex bg-gray-700 rounded-md p-1 m-1">
              {JSON.stringify(tag.tag)}
            </span>
            <i onClick={() => removeTags(index)}>
              <RiCloseCircleLine className="text-white" />
            </i>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="w-full bg-gray-800 text-white p-2 rounded-md border-gray-700 focus:outline-none"
        onKeyUp={(event) => addTags(event)}
        placeholder="Press enter to add tags"
      />
    </div>
  );
};
export default TagsInput;
