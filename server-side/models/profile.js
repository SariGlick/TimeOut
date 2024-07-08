import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profileName: { type: String, required: true },
    blockedSites: [{ type: Schema.Types.ObjectId, ref: 'Website' }],
    limitedWebsites: [{
        websiteId: { type: Schema.Types.ObjectId, ref: 'Website' },
        status: { type: String, enum: ['block', 'open'] },
        limitedTimes: {
            start: { type: Number },
            end: { type: Number }
        }
    }]
});

export default mongoose.model("Profile", profileSchema);