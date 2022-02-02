const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const fetchuser = require('../middlewares/fetchuser')
const Notes = require('../models/Notes')

router.get('/fetchallusers', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// mongo
router.post('/addnotes', fetchuser, [
  body('title', 'Enter a valid Title').isLength({ min: 3 }),
  body('description', 'Enter a valid Description').isLength({ min: 6 }),
], async (req, res) => {
  try {

    
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
      title, description, tag, user: req.user.id
    })
    const savenote = await note.save();
    res.json(savenote);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }


})



router.put('/updatenotes/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {


    const newnote = {};
    if (title) { newnote.title = title }
    if (description) { newnote.description = description }
    if (tag) { newnote.tag = tag };

    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") };
    if (note.user.toString() !== req.user.id) { return res.status(404).send("Not Found") };
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
    res.json({ note })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }



})



router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
  

  try {


    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") };
    if (note.user.toString() !== req.user.id) { return res.status(404).send("Not Found") };
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note has been deleted", note: note })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }




})

module.exports = router