
<<<<<<< HEAD

=======
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
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
<<<<<<< HEAD
export default mongoose.model("VisitedWebsites", visitedWebsitesSchema)
=======

export default mongoose.model("VisitedWebsite", visitedWebsitesSchema)
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3

