import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import Note from "../models/Note.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create a new note
export const createNote = catchAsyncError(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return next(new ErrorHandler("Please provide title and content", 400));
  }

  // Check subscription limits for free plan
  if (req.user.tenant.subscription === "free") {
    const noteCount = await Note.countDocuments({
      tenant: req.user.tenant._id,
    });
    if (noteCount >= req.user.tenant.maxNotes) {
      return next(
        new ErrorHandler(
          `Free plan limited to ${req.user.tenant.maxNotes} notes. Upgrade to Pro for unlimited notes.`,
          403
        )
      );
    }
  }

  const note = await Note.create({
    title,
    content,
    author: req.user._id,
    tenant: req.user.tenant._id,
  });

  const populatedNote = await Note.findById(note._id)
    .populate("author", "name email")
    .populate("tenant", "name slug");

  res.status(201).json({
    success: true,
    note: populatedNote,
  });
});

// Get all notes for current tenant
export const getAllNotes = catchAsyncError(async (req, res, next) => {
  const notes = await Note.find({ tenant: req.user.tenant._id })
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: notes.length,
    notes,
  });
});

// Get single note by ID
export const getNoteById = catchAsyncError(async (req, res, next) => {
  const note = await Note.findOne({
    _id: req.params.id,
    tenant: req.user.tenant._id,
  }).populate("author", "name email");

  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }

  res.status(200).json({
    success: true,
    note,
  });
});

// Update note
export const updateNote = catchAsyncError(async (req, res, next) => {
  const { title, content } = req.body;

  let note = await Note.findOne({
    _id: req.params.id,
    tenant: req.user.tenant._id,
  });

  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }

  // Update only provided fields
  if (title !== undefined) note.title = title;
  if (content !== undefined) note.content = content;

  note = await note.save();
  note = await Note.findById(note._id).populate("author", "name email");

  res.status(200).json({
    success: true,
    note,
  });
});

// Delete note
export const deleteNote = catchAsyncError(async (req, res, next) => {
  const note = await Note.findOne({
    _id: req.params.id,
    tenant: req.user.tenant._id,
  });

  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }

  await Note.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});
