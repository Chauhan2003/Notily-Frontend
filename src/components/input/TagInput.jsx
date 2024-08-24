import React, { useState, useCallback } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  // Handle input change
  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  // Add new tag
  const addNewTag = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      setTags([...tags, trimmedValue]);
      setInputValue("");
    }
  }, [inputValue, tags, setTags]);

  // Handle Enter key press
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addNewTag();
      }
    },
    [addNewTag]
  );

  // Remove tag
  const handleRemoveTag = useCallback(
    (tagToRemove) => {
      setTags(tags.filter((tag) => tag !== tagToRemove));
    },
    [tags, setTags]
  );

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              # {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-red-500 hover:text-red-700"
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
