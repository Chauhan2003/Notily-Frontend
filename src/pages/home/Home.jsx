import React, { useContext, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { noteRoute } from "../../Routes";
import NoteCard from "../../components/Cards/NoteCard";
import EmptyCard from "../../components/emptyCard/EmptyCard";
import AddEditNotes from "./AddEditNote";
import Navbar from "../../components/Navbar";

const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = async () => {
    try {
      const res = await axios.get(`${noteRoute}/all`);
      console.log(res.data.notes);
      setAllNotes(res.data.notes);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const res = await axios.delete(`${noteRoute}/delete/${noteId}`);
      toast.success(res.data.message);
      getAllNotes();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get(`${noteRoute}/search`, {
        params: { query },
      });
      console.log(res.data.message);
      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const res = await axios.put(`${noteRoute}/pin/${noteId}`, {
        isPinned: !noteData.isPinned,
      });

      console.log(res.data.note);

      console.log(res.data.message);
      getAllNotes();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(allNotes);

  return (
    <div className="h-screen flex flex-col">
      <Navbar
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="flex-1 container px-10 overflow-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-8 max-md:m-5">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdAt}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                onPinNote={() => updateIsPinned(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={
              isSearch
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtakcQoMFXwFwnlochk9fQSBkNYkO5rSyY9A&s"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCtZLuixBFGTqGKdWGLaSKiO3qyhW782aZA&s"
            }
            message={
              isSearch
                ? "Oops! No Notes found matching your search"
                : `Ready to capture your ideas? Click the 'Add' button to start noting down your thoughts, inspiration and reminders. Let's get started!`
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#2B85FF] hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </div>
  );
};

export default Home;
