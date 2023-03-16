import React, { useContext, useState } from "react";
import NoteContext from "../contextapi/notes/NoteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNotes } = context;

  const [note, setNotes] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag);
  };
  return (
    <div>
      <div className="row pt-3">
        <div className="col-md-5"></div>

        <div className="col-md-7">
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Add
            </button>
            {/* <i className="fa-solid fa-paper-plane-top"></i> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
