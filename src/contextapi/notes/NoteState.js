import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:3030";
  // For Client Side
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get All Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetch`, {
      metod: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add Notes
  const addNotes = async (title, description, tag) => {
    // For Server Side
    const response = await fetch(`${host}/api/notes/addnote`, {
      metod: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stingify(title, description, tag),
    });
    const note = await response.json();
    // For UI/Client side
    setNotes(notes.concat(note));
  };

  // Delete Notes
  const deleteNotes = async (id) => {
    // For Server Side
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      metod: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    console.log(json);
    //For Client Side
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Update Notes
  const updateNotes = async (id, title, description, tag) => {
    // For Server Side
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stingify(title, description, tag),
    });
    const json = response.json();
    console.log(json);

    //For Client Side
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
      setNotes(newNotes);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNotes, deleteNotes, updateNotes, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
