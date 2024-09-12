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
        visitsTime: [{
            visitDate: {
                type: Date,
                default:Date(),
                unique:true
            },
            activityTime: {
                type: Number,
                required: true
            }
        }]
    }]
});


        
export default mongoose.model("VisitedWebsites", visitedWebsitesSchema)

