import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const profileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profileName: { type: String, required: true, minlength: 2, maxlength: 50 },
    statusBlockedSites: { enum: ['black list', 'white list'] },
    listWebsites: [{
        websiteId: { type: Schema.Types.ObjectId, ref: 'Websites' },
        status: { type: String, enum: ['block', 'open', 'limit'] },
        limitedMinutes: { type: Number, default: new Date().getHours.Number, required: true },
    }],
    profileTime: [{
        start: { type: Date, default: new Date()},
        end: { type: Date, default: new Date()}
    }]
});


export default mongoose.model("Profiles", profileSchema);