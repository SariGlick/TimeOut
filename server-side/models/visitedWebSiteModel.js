import mongoose, { Schema } from "mongoose";


const visitedWebsitesSchema=new mongoose.Schema({
    ids: {type: [Schema.Types.ObjectId],
        required: true,   
    },
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
export  const  visitedSchema= mongoose.model("visitedWebsitesSchema",visitedWebsitesSchema)