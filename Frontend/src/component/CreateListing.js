
// CreateListing.js
import './CreateListing.css';
import React, { useState } from 'react';
import axios from 'axios';

const CreateListing =() =>{
  const [formData, setFormData] = useState({
    item_name: '',
    item_description: '',
    item_amount: 0,
    item_enddate: '',
    item_category: '',
   // images: null
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation if needed

    try {
      //const token = localStorage.getItem('token');
      // if (!token) {
      //   throw new Error('No token found');
      // }
      await axios.post('http://127.0.0.1:3001/create', formData, {
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      });
      setShowSuccessMessage(true); // Show success message
      setFormData({
        item_name: '',
        item_description: '',
        //item_quantity: 0,
        item_amount: 0,
        //minimum_bidamount: 0,
        item_enddate: '',
        item_category: '',
        //images: null
      });

      // Trigger callback function to notify parent component
      // if (typeof onListingCreate === 'function') {
      //   onListingCreate();
      // }
    } catch (error) {
      console.error('Error add items:', error.message);
    }
  };


    return (
      <div className='container'>
          <h2>Create Listing</h2>
          <form onSubmit={handleSubmit}>
        <label >
          Item Name:

          <input type="text" name="item_name" value={formData.item_name} onChange={handleChange} required />
        </label>
        <label className='label'>
          Item Description:  
          <textarea name="item_description" value={formData.item_description} onChange={handleChange} required></textarea>
        </label>

        <label >
          Item Amount:
          <input type="number" name="item_amount" value={formData.item_amount} onChange={handleChange} required />
        </label>
        {/* <label >
          Minimum Bid Amount:
          <input type="number" name="minimum_bidamount" value={formData.minimum_bidamount} onChange={handleChange} required />
        </label> */}
        <label >
          Item End Date:
          <input type="date" name="item_enddate" value={formData.item_enddate} onChange={handleChange} required />
        </label>
        <label >
          Item Category:
          <input type="text" name="item_category" value={formData.item_category} onChange={handleChange} required />
        </label>
        <center><button type="submit">Add Item</button></center>
      </form>
      {showSuccessMessage && (
        <div className="success-message">
          Item added successfully!
        </div>
      )}
      </div>
      
    );
}

export default CreateListing;
