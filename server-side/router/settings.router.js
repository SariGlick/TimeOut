import express from 'express';
import UserSettings from '../models/UserSettings.js';

const settingsRouter = express.Router();

settingsRouter.get('/settings/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const settings = await UserSettings.findOne({ userId });
        if (!settings) {
            return res.status(404).json({ error: { message: 'Settings not found' } });
        }
        res.json(settings.settings);
    } catch (error) {
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

export default settingsRouter;