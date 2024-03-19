import express from 'express';
import WatchlistItem from '../Models/WatchlistItem.js';

const router = express.Router();

// Route to add an item to the watchlist
router.post('/add', async (req, res) => {
    try {
        const { itemId, userId } = req.body;
        const watchlistItem = await WatchlistItem.create({ itemId, userId });
        return res.status(201).json({ status: 'ok', watchlistItem });
    } catch (error) {
        console.error('Error adding item to watchlist:', error);
        return res.status(500).json({ status: 'error', error: error.message });
    }
});

// Route to fetch watchlist items for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const watchlistItems = await WatchlistItem.find({ userId }).populate('itemId');
        return res.status(200).json({ status: 'ok', watchlistItems });
    } catch (error) {
        console.error('Error fetching watchlist items:', error);
        return res.status(500).json({ status: 'error', error: error.message });
    }
});

export default router;
