import mongoose, { Schema } from "mongoose";

const profileSchema = new mongoose.Schema({
    profileName: { type: String, required: true, minlength: 2, maxlength: 50 },
    blockedSites: [{ type: Schema.Types.ObjectId, ref: 'Websites' }],
    limitedWebsites: [{
        websiteId: { type: Schema.Types.ObjectId, ref: 'Websites' },
        status: { type: String, enum: ['block', 'open'] },
        limitedTimes: [{
            start: {type:Date,required:true},
            end: {type:Date,required:true} }]
    }]
});

export  default mongoose.model("Profiles", profileSchema);