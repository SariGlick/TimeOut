import VisitedWebsite from '../models/visitedWebSite.model.js';
import visitedWebsiteservice from '../services/visitedWebsiteService.js'

export const getAllVisitedWebsites = async (req, res) => {
    try {
        const visitedWebsites = await VisitedWebsite.find();
        res.json(visitedWebsites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const createVisitedWebsite = async (req, res) => {
    const newVisitedWebsite = new VisitedWebsite(req.body);
    try {
        const savedVisitedWebsite = await VisitedWebsite.save();
        res.status(201).json(savedVisitedWebsite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const getVisitedWebsiteById = async (req, res,next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'id is not valid' })
    try {
        const visitedWebsite = await VisitedWebsite.findById(id).populate('websiteId').select('-__v');
        if (!visitedWebsite) {
            return next({message:'visited Websites not found ',status:404})
        }
        res.json(visitedWebsite);
    } catch (err) {
        next({message:err.message,status:500})
    }
};




export const updateVisitedWebsite = async (req, res) => {
    try {
        const updatedVisitedWebsite = await VisitedWebsite.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVisitedWebsite) {
            return res.status(404).json({ message: 'Visited website not found' });
        }
        res.json(updatedVisitedWebsite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
export const deleteVisitedWebsite = async (req, res) => {
    try {
        const deletedVisitedWebsite = await VisitedWebsite.findByIdAndDelete(req.params.id);
        if (!deletedVisitedWebsite) {
            return res.status(404).json({ message: 'Visited website not found' });
        }
        res.json({ message: 'Visited website deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
};

export const getVisitedWebsiteByvisitsId = async (visitsId) => {
    try {
        const visitedWebsite = await VisitedWebsite.findById(visitsId).populate('websiteId').select('-__v');
        if (!visitedWebsite) {
            throw new Error('ID is not valid');
        }
        return visitedWebsite
    } catch (err) {
        throw new Error(error.message);
    }
};



export const showVisitedWebsite = async (req, res) => {
    const obj = req.body;
   
    if (obj.type == "custom") {

        if (!Array.isArray(obj.customDates) || obj.customDates.length !== 2) {
            return res.status(400).json({ message: 'Invalid array format' });
        }
        else {
            if (obj.customDates[0] == null || obj.customDates[1] == null) {
                res.status(400).json({ message: 'Impossible to calculate because data is missing' });
            }
            if (obj.customDates[1] < obj.customDates[0])
                res.status(400).json({ message: 'order of dates is invalid' });
        }
    }

    try {
        const data = await visitedWebsiteservice(obj);
        console.log('Data from service:', data);
        res.status(200);
        res.json(data);
       
    } catch {
        res.status(500).json({ message: "error" });
    }
    
};
