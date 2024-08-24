import React from "react";
import { MdCreate, MdDelete, MdPushPin } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onPinNote,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-green-700">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        <MdPushPin
          className={`icon-btn ${
            isPinned ? "text-[#2B85FF]" : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">
        {content?.slice(0, 60)}
        {content.length > 60 ? "..." : ""}
      </p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.length > 0 ? (
            tags.map((item, index) => (
              <span key={index} className="mr-1">
                #{item}
              </span>
            ))
          ) : (
            <span>No tags</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600 cursor-pointer"
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn hover:text-red-500 cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
