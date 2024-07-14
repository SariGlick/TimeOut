import visitedWebsites from '../models/visitedWebSite.model.js'; 

 export const    getAllVisitedWebsites= async (req, res) => {
        try {
            const visitedWebsites = await visitedWebsites.find();
            res.json(visitedWebsites);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
 export const    createVisitedWebsite=  async (req, res) => {
        const newVisitedWebsite = new visitedWebsites(req.body);
        try {
            const savedVisitedWebsite = await visitedWebsites.save();
            res.status(201).json(savedVisitedWebsite);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };
  export const   getVisitedWebsiteById= async (req, res) => {
        try {
            const visitedWebsite = await visitedWebsites.findById(req.params.id);
            if (!visitedWebsite) {
                return res.status(404).json({ message: 'Visited website not found' });
            }
            res.json(visitedWebsite);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
 export const    updateVisitedWebsite = async (req, res) => {
        try {
            const updatedVisitedWebsite = await visitedWebsites.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedVisitedWebsite) {
                return res.status(404).json({ message: 'Visited website not found' });
            }
            res.json(updatedVisitedWebsite);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };
  export const    deleteVisitedWebsite= async (req, res) => {
        try {
            const deletedVisitedWebsite = await visitedWebsites.findByIdAndDelete(req.params.id);
            if (!deletedVisitedWebsite) {
                return res.status(404).json({ message: 'Visited website not found' });
            }
            res.json({ message: 'Visited website deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

