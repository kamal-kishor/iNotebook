import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  // const s1 = {
  //   name: "kamal",
  //   class: "5c",
  // };

  // const [state, setState] = useState(s1);
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

  // Add Notes
  const addNotes = (title, description, tag) => {
    // API Call
    console.log("Adding New Note");
    const note = {
      _id: "61322f19553781a8ca8d0e908",
      user: "6131dc5e3e4037cd4734a066",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
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
  const updateNotes = (id, title, description, tag) => {};

  // const update = () => {
  //   setTimeout(() => {
  //     setState({
  //       name: "Goppi",
  //       class: "4c",
  //     });
  //   }, 2000);
  // };
  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes, updateNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
