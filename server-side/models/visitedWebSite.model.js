<<<<<<< HEAD
import mongoose, { Schema } from "mongoose";


const visitedWebsitesSchema=new mongoose.Schema({
    
    websitesId:[{
        type:Schema.Types.ObjectId,
        ref:'website',
        require:true,
    }],
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
});
export  default mongoose.model("VisitedWebsites",visitedWebsitesSchema)
=======

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

>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936
