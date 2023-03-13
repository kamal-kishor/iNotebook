const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1: Get a new Note using: GET "/api/notes/getuser" Login require
router.get("/fetch", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnotes" Login require
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Password must be more than 3 Charater").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If ther are errors return Bad request and the errors
      const error = validationResult(req);
      if (!error.isEmpty) {
        return res.status(400).json({ error: error.array });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error occured");
    }
  }
);

// ROUTE 3: Update an existing Note using: POST "/api/notes/updatenotes/:id" Login require
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Find the note to be updated and update it by the ID
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // Allow deletion only if user owns this Notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
});

// ROUTE 4: Update an existing Note using: DELETE "/api/notes/deletenotes/:id" Login require
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it by the ID
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
