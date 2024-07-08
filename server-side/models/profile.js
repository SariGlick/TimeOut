import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const profileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profileName: { type: String, required: true, minlength: 2, maxlength: 50 },
    blockedSites: [{ type: Schema.Types.ObjectId, ref: 'Website' }],
    limitedWebsites: [{
        websiteId: { type: Schema.Types.ObjectId, ref: 'Website' },
        status: { type: String, enum: ['block', 'open'] },
        limitedTimes: [{
            start: {
                hours: { type: Number, min: 0, max: 23 },
                minutes: { type: Number, min: 0, max: 59 },
                validate: {
                    validator: function() {
                        // בודק אם השעה והדקה תקינים
                        return Number.isInteger(this.hours) && Number.isInteger(this.minutes);
                    },
                    message: 'Invalid start time'
                }
            },
            end: {
                hours: { type: Number, min: 0, max: 23 },
                minutes: { type: Number, min: 0, max: 59 },
                validate: {
                    validator: function() {
                        // בודק אם השעה והדקה תקינים וגדולים מה-start
                        return Number.isInteger(this.hours) && Number.isInteger(this.minutes) && 
                            (this.hours > this.start.hours || (this.hours === this.start.hours && this.minutes > this.start.minutes));
                    },
                    message: 'End time must be greater than start time'
                }
            }
        }]
    }]
});




export default mongoose.model("Profile", profileSchema);