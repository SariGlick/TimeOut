
import mongoose, { Schema } from "mongoose";


const visitedWebsitesSchema = new mongoose.Schema({
    visitedWebsites: [{
        website: {
            type: Schema.Types.ObjectId,
            ref: 'Website',
            required: true
        },
        visitsTime: [{
            visitDate: {
                type: Date,
                required: true
            },
            activityTime: {
                type: Number,
                required: true
            }
        }]
    }]
});
export default mongoose.model("VisitedWebsites", visitedWebsitesSchema)
