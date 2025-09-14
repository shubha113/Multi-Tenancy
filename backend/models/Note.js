import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Note title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Note content is required'],
        trim: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"]
    },
    tenant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required:[true, "Tenant is required"]
    }
}, {timestamps: true});

// Ensure notes are scoped to tenant
noteSchema.index({ tenant: 1, author: 1 });

export default mongoose.model("Note", noteSchema);