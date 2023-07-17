import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, {
    timestamps: true,
})

export default mongoose.model('Task', taskSchema)