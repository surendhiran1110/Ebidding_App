import express from "express";
import { PostItem } from "../Models/Createlisting.js";
const rout = express.Router();
//save a items
rout.post('/create', async (req, res) => {
    try {
        const { item_name, item_description, item_amount, item_enddate, item_category } = req.body;
        const postItem = await PostItem.create({
            item_name,
            item_description,
            item_amount,
            item_enddate,
            item_category,
        });
        return res.status(200).json({ status: 'ok', postItem, message: "item added succefully" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 'error', error: error.message });
    }
});

//get all items from db
rout.get('/all', async (req, res) => {
    try {
        const allPostItems = await PostItem.find();
        if (!allPostItems || allPostItems.length === 0) {
            return res.status(404).json({ status: 'error', message: 'No post items found' });
        }

        return res.status(200).json({ status: 'ok' , postItems : allPostItems});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 'error', error: error.message });
    }
});

//get one item by id 
rout.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const itemid = await PostItem.findById(id);
        if (!itemid) {
            return res.status(404).json({ status: 'error', message: 'Item not found' });
        }

        return res.status(200).json({ status: 'ok' });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 'error', error: error.message });
    }
});

//update the item 
rout.put('/update/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedData = req.body;

        const updatedItem = await PostItem.findByIdAndUpdate(itemId, updatedData, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ error: "Item Not Found" });
        }
        return res.status(200).json({ message: "Item updated successfully", updatedItem });
    } catch (error) {
        return res.json({ status: 'error', error: error.message });
    }
});


//delete  a item from db
rout.delete('/delete/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const deleteItem = await PostItem.findByIdAndDelete(itemId);
        if (!deleteItem) {
            return res.json({ status: 404, message: "Item already deleted" });
        }
        return res.status(200).json({ message: "Item deleted Successfully" });
    } catch (error) {
        return res.json({ status: 'error', error: error.message });
    }
});

// Get watchlist items
// rout.get('/watchlist', async (req, res) => {
//     try {
//         // Fetch watchlist items from the database
//         const watchlistItems = await fetchWatchlistItemsFromDatabase();
        
//         // Check if watchlistItems is empty or not
//         if (!watchlistItems || watchlistItems.length === 0) {
//             return res.status(404).json({ status: 'error', message: 'No watchlist items found' });
//         }

//         // If watchlistItems is not empty, send the response with the items
//         return res.status(200).json({ status: 'ok', watchlistItems });
//     } catch (error) {
//         console.error('Error fetching watchlist items:', error);
//         res.status(500).json({ status: 'error', error: error.message });
//     }
// });



export default rout;