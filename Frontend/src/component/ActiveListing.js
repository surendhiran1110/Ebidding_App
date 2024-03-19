// // ActiveListing.js
// import './ActiveListing.css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import { jwtDecode } from 'jwt-decode';


// const ActiveListing = () => {
//   const [postItems, setPostItems] = useState([]);
//   const [watchlist, setWatchlist] = useState([]);
//   const [error, setError] = useState('');
//   const [showMessage, setShowMessage] = useState(false); // State to control the display of the message pop

//   useEffect(() => {
//     fetchPostItems();
//     // // Set interval to fetch updated post items every 10 seconds
//     // const interval = setInterval(fetchPostItems, 10000);
//     // // Clear interval on component unmount to prevent memory leaks
//     // return () => clearInterval(interval);
    
//   }, []);

//   // Function to fetch post items from the server
//   const fetchPostItems = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:3001/all');
//       if (response.data.status === 'ok') {
//         setPostItems(response.data.postItems);
//         // fetchBiddingItems(response.data.postItems);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('No item on the Dashboard yet');
//     }
//   };

//   const addToWatchlist = (itemId) => {
//     const itemToAdd = postItems.find(item => item._id === itemId);
//     setWatchlist(prevWatchlist => [...prevWatchlist, itemToAdd]);
//   };


//     return (
//         <div>
//         <div className='ActiveListing-container'> 
//             <h2>Active Listing</h2>
//             {/* value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} */}
//             <select >
//                 <option value="">All Categories</option>
//                 <option value="Category A">Mobile</option>
//                 <option value="Category B">Fashion</option>
//             </select>
//             <input type="text"  placeholder="Search" />
//             {/* value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} */}
//             <button >Search</button>
//             {/* onClick={() => handleSearch(searchTerm, selectedCategory)} */}
//             {/* <ul>
//                 {filteredProducts.map(product => (
//                     <li key={product.id}>
//                         <div>
//                             <h3>{product.name}</h3>
//                             <p>Category: {product.category}</p>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//             <center><p>No active listing</p></center> */}
//         </div>
        
//             {postItems.map((item) => (
                
//           <div className="post-item" key={item._id}>

//             {/* <img src={`http://localhost:3001/images/${item.item_image}`}></img> */}
//             <h3>Item Name : {item.item_name}</h3>
//             {/* <p>Key:{item.item._id}</p> */}
//             <p>Item Description : {item.item_description}</p>
//             <p>Initial Amount : {item.item_amount}</p>
            
//             {/* Display bidding item details */}
//             {/* {item.biddingItem && (
//               <div>
//                 <p>Current Amount : {item.biddingItem.current_amount}</p>
//                 <p>Bidding Count : {item.biddingItem.bidding_count}</p>
//               </div>
//             )} */}
//             <p>Start Date: {new Date(item.item_startdate).toLocaleDateString()} - End Date: {new Date(item.item_enddate).toLocaleDateString()}</p>
//             <p>Category : {item.item_category}</p>
//             {/* Add to Watchlist button */}
//             <button className="add-to-watchlist-btn" onClick={() => addToWatchlist(item._id)}>Add to Watchlist</button>
//             {/* <button className="add-to-watchlist-btn" onClick={() => handleBidClick(item._id)}>Bid</button> */}
//           </div>
//         ))}
//         </div>
//     );
// }

// export default ActiveListing;


import './ActiveListing.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActiveListing = () => {
  const [postItems, setPostItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPostItems();
  }, []);

  const fetchPostItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/all');
      if (response.data.status === 'ok') {
        setPostItems(response.data.postItems);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching post items:', error);
      setError('Failed to fetch post items');
    }
  };

  const addToWatchlist = async (itemId) => {
    try {
      await axios.post('http://localhost:3001/watchlist/add', { itemId });
      // Optionally, you can fetch updated watchlist items after adding to refresh the UI
      // fetchWatchlistItems();
    } catch (error) {
      console.error('Error adding item to watchlist:', error);
      alert('Failed to add item to watchlist. Please try again later.');
    }
  };

  return (
    <div>
      <div className='ActiveListing-container'>
        <h2>Active Listing</h2>
        <select>
          <option value="">All Categories</option>
          <option value="Category A">Mobile</option>
          <option value="Category B">Fashion</option>
        </select>
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>

      {postItems.map((item) => (
        <div className="post-item" key={item._id}>
          <h3>Item Name: {item.item_name}</h3>
          <p>Item Description: {item.item_description}</p>
          <p>Initial Amount: {item.item_amount}</p>
          <p>Start Date: {new Date(item.item_startdate).toLocaleDateString()} - End Date: {new Date(item.item_enddate).toLocaleDateString()}</p>
          <p>Category: {item.item_category}</p>
          <button className="add-to-watchlist-btn" onClick={() => addToWatchlist(item._id)}>Add to Watchlist</button>
        </div>
      ))}

      {error && <p>{error}</p>}
    </div>
  );
}

export default ActiveListing;

