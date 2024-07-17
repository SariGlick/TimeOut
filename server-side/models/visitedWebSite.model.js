
import mongoose, { Schema } from "mongoose";

const visitedWebsitesSchema = new mongoose.Schema({
   
        websiteId: {
            type: Schema.Types.ObjectId,
            ref: 'Websites',
            required: true
        },
        visitsTime: [{
            visitDate: {
                type: Date,
                default:Date.now,
            },
            activityTime: {
                type: Number,
                required: true
            }
        }]
   
});

export default mongoose.model("VisitedWebsite", visitedWebsitesSchema)

