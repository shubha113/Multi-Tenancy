import express from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notesController.js';
import {isAuthenticated} from '../middlewares/auth.js'

const router = express.Router();

//Create note
router.post('/create', isAuthenticated, createNote);
//Get all notes
router.get('/get', isAuthenticated, getAllNotes);
//Get note by id
router.get('/get/:id', isAuthenticated, getNoteById);
//Update note
router.put('/update/:id', isAuthenticated, updateNote);
//Delete note
router.delete('/delete/:id', isAuthenticated, deleteNote);

export default router;