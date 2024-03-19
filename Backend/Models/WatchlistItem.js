import mongoose from 'mongoose';

const watchlistItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostItem', // Reference to the original item schema (you may need to adjust this based on your schema for post items)
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who added the item to the watchlist
        required: true
    },
    // Add any additional fields you need for the watchlist item
    // For example, date added to watchlist, etc.
});

const WatchlistItem = mongoose.model('WatchlistItem', watchlistItemSchema);

export default WatchlistItem;
