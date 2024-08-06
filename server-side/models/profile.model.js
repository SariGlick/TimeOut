import mongoose from 'mongoose';
<<<<<<< HEAD

const { Schema } = mongoose;
=======
const Schema = mongoose.Schema;
>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936

const profileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profileName: { type: String, required: true, minlength: 2, maxlength: 50 },
<<<<<<< HEAD
    statusBlockedSites: { type: String, enum: ['black list', 'white list'], required: true },
    listWebsites: [{
        websiteId: { type: Schema.Types.ObjectId, ref: 'Websites' },
        status: { type: String, enum: ['blocked', 'opened', 'limited'] },
        limitedMinutes: { type: Number, default: () => 60
            , required: true },
    }],
    profileTime: [{
        start: { type: Date, default: new Date() },
        end: { type: Date, default: new Date() }
    }]
});

// Middleware to check the status of listWebsites before saving
profileSchema.pre('save', function (next) {
    const profile = this;

    if (profile.statusBlockedSites === 'white list') {
        profile.listWebsites.forEach(site => {
            if (site.status === 'blocked') {
                return next(new Error('In white list mode, site status cannot be "blocked"'));
            }
        });
    }else if (profile.statusBlockedSites === 'black list') {
        profile.listWebsites.forEach(site => {
            if (site.status === 'opened') {
                return next(new Error('In white list mode, site status cannot be "opened"'));
            }
        });
    }
    
    next();
});

export default mongoose.model("Profiles", profileSchema);
=======
    statusBlockedSites: { type: String,enum: ['black list', 'white list'] },
    listWebsites: [{
        websiteId: { type: Schema.Types.ObjectId, ref: 'Websites' },
        status: { type: String, enum: ['block', 'open', 'limit'] },
        limitedMinutes: { type: Number, default: new Date().getHours.Number, required: true },
    }],
    timeProfile: {
        start: { type: String }, 
        end: { type: String } 
    }
});

export default mongoose.model("Profiles", profileSchema);
>>>>>>> f053a445fbff4cdfeb96452c39deb0b58dcc1936
