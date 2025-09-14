import mongoose, { Schema } from "mongoose";

const tenantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Tenant name is required"],
        trim: true
    },
    slug:{
        type: String,
        required: [true, "Tenant slug is required"],
        trim: true,
        unique: true,
        lowercase: true
    },
    subscription:{
        type: String,
        enum: ["free", "pro"],
        default: "free"
    },
    maxNotes:{
        type: Number,
        default: 3
    }
}, {timestamps: true});

export default mongoose.model("Tenant", tenantSchema);