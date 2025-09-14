import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tenant-backend.vercel.app/api/v1";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

// Fetch notes
export const fetchNotes = createAsyncThunk(
  "note/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/note/get");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notes"
      );
    }
  }
);

// Create note
export const createNote = createAsyncThunk(
  "note/createNote",
  async (noteData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/note/create", noteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create note"
      );
    }
  }
);

// Update note
export const updateNote = createAsyncThunk(
  "note/updateNote",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/note/update/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update note"
      );
    }
  }
);

// Delete note
export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/note/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete note"
      );
    }
  }
);

// Get single note
export const getNoteById = createAsyncThunk(
  "note/getNoteById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/note/get/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch note"
      );
    }
  }
);

const initialState = {
  notes: [],
  currentNote: null,
  isLoading: false,
  error: null,
  successMessage: null,
  totalNotes: 0,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    },
    clearCurrentNote: (state) => {
      state.currentNote = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload.notes;
        state.totalNotes = action.payload.count;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create Note
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes.unshift(action.payload.note);
        state.totalNotes += 1;
        state.successMessage = "Note created successfully";
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Note
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.notes.findIndex(
          (note) => note._id === action.payload.note._id
        );
        if (index !== -1) {
          state.notes[index] = action.payload.note;
        }
        state.currentNote = action.payload.note;
        state.successMessage = "Note updated successfully";
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Note
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = state.notes.filter((note) => note._id !== action.payload);
        state.totalNotes -= 1;
        state.successMessage = "Note deleted successfully";
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get Single Note
      .addCase(getNoteById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNoteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentNote = action.payload.note;
      })
      .addCase(getNoteById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, clearCurrentNote } = notesSlice.actions;
export default notesSlice.reducer;
