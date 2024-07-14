import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const profileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profileName: { type: String, required: true, minlength: 2, maxlength: 50 },
    blockedSites: [{ type: Schema.Types.ObjectId, ref: 'Websites' }],
    limitedWebsites: [{
        websiteId: { type: Schema.Types.ObjectId, ref: 'Websites' },
        status: { type: String, enum: ['block', 'open'] },
        limitedTimes: [{
            start: {type:Date, default:new Date()},
            end: {type:Date, default:new Date()}
        }]
    }]
});




export  default mongoose.model("Profiles", profileSchema);