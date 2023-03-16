import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:3030";
  const notesInitial = [
    {
      _id: "61322f19553781a8ca8d0e086",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.509Z",
      __v: 0,
    },
    {
      _id: "61322f19553781a78ca8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
    {
      _id: "61322f195537681a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
    {
      _id: "61322f195531781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
    {
      _id: "61322f195523781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
    {
      _id: "61322f195653781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
    {
      _id: "61322f194553781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  //Get All Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`$(host)/api/notes/fetch`, {
      metod: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYWJmMzBmMjE3MTE4ZTBiN2U5OWE3In0sImlhdCI6MTY3ODU0NjU0M30.ZMmr8z8xDz0RLiHqcw427FfpHOW4iRi6J9f2qPXuQ98",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add Notes
  const addNotes = (title, description, tag) => {
    // API Call
    console.log("Adding New Note");
    const note = {
      _id: "61322f19553781a8ca8d0e908",
      user: "6131dc5e3e4037cd4734a066",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete Notes
  const deleteNotes = (id) => {
    // API Call
    console.log("Delete Note with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Update Notes
  const updateNotes = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(
      `${host}/api/notes/updatenotes/640ebf41434f740fc4ce1909`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYWJmMzBmMjE3MTE4ZTBiN2U5OWE3In0sImlhdCI6MTY3ODU0NjU0M30.ZMmr8z8xDz0RLiHqcw427FfpHOW4iRi6J9f2qPXuQ98",
        },
        // body: JSON.stringify(title, description, tag);
      }
    );
    const json = response.json();

    // .then(response => response.json())
    // .then(json => console.log(json));
    // .catch(err => console.log(err));

    //Login to Edit in client
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
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
