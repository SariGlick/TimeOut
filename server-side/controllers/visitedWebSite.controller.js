
import VisitedWebsite from '../models/visitedWebSite.model.js';

export const getAllVisitedWebsites = async (req, res) => {
    try {
        const visitedWebsites = await VisitedWebsite.find().populate('websiteId').select('-__v');
        res.json(visitedWebsites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// export const createVisitedWebsite = async (req, res) => {
//     const newVisitedWebsite = new VisitedWebsite(req.body);
//     try {
//         const savedVisitedWebsite = await newVisitedWebsite.save();
//         res.status(201).json(savedVisitedWebsite);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };
// export const getVisitedWebsiteById = async (req, res) => {
//     try {
//         const visitedWebsite = await VisitedWebsite.findById(req.params.id).populate('websiteId').select('-__v');
//         if (!visitedWebsite) {
//             return res.status(404).json({ message: 'Visited website not found' });
//         }
//         res.json(visitedWebsite);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
// export const updateVisitedWebsite = async (req, res) => {
//     try {
//         const updatedVisitedWebsite = await VisitedWebsite.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedVisitedWebsite) {
//             return res.status(404).json({ message: 'Visited website not found' });
//         }
//         res.json(updatedVisitedWebsite);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };
// export const deleteVisitedWebsite = async (req, res) => {
//     try {
//         const deletedVisitedWebsite = await VisitedWebsite.findByIdAndDelete(req.params.id);
//         if (!deletedVisitedWebsite) {
//             return res.status(404).json({ message: 'Visited website not found' });
//         }
//         res.json({ message: 'Visited website deleted successfully' }).status(201);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


export const createVisitedWebsite = async (req, res,next) => {
    try {
        const newVisitedWebsite = new VisitedWebsite(req.body);
        await newVisitedWebsite.validate();
        const savedVisitedWebsite = await newVisitedWebsite.save();
        res.status(201).json(savedVisitedWebsite);
    } catch (err) {
        next({message:err.message,status:500})
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

export const updateVisitedWebsite = async (req, res,next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'id is not valid' })
    try {
        const updatedVisitedWebsite = await VisitedWebsite.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVisitedWebsite) {
            return next({message:'visited Websites not found ',status:404})
        }
        res.json(updatedVisitedWebsite);
    } catch (err) {
        next({message:err.message,status:500})
    }
};

export const deleteVisitedWebsite = async (req, res,next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'id is not valid' })
    try {
        const deletedVisitedWebsite = await VisitedWebsite.findByIdAndDelete(id);
        if (!deletedVisitedWebsite) {
            return next({message:'visited Websites not found ',status:404})
        }
        res.json({ message: 'Visited website deleted successfully' }).status(201);
    } catch (err) {
        next({message:err.message,status:500})
    }
};
