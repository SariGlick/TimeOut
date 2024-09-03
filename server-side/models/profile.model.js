import mongoose, { Schema } from "mongoose";

const profileSchema = new mongoose.Schema({
    profileName: { type: String, required: true, minlength: 2, maxlength: 50 },
    statusBlockedSites: { enum: ['black list', 'white list'] },
    listWebsites: [{
        websiteId: { type: Schema.Types.ObjectId, ref: 'Websites' },
        status: { type: String, enum: ['block', 'open'] },
        limitedTimes: [{
            start: {type:Date,required:true},
            end: {type:Date,required:true} }]       
    }]
});

<<<<<<< HEAD
<<<<<<< HEAD
export  default mongoose.model("Profiles", profileSchema);

=======
export  default mongoose.model("Profiles", profileSchema);
>>>>>>> 48fda98c38898e7d69676ae621680a006f9131c3
=======
export  default mongoose.model("Profiles", profileSchema);
>>>>>>> e1846fe75f6d92f5dfa7a440988cb38473a34797
