import React, { useState, useEffect } from 'react';

function WatchList() {
  const [watchlist, setWatchlist] = useState([]); // Initialize watchlist with an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch watchlist data from the backend
    const fetchWatchlistData = async () => {
      try {
        const response = await fetch('http://localhost:3001/watchlist');
        if (response.ok) {
          const data = await response.json();
          setWatchlist(data.watchlist); // Assuming the response contains a watchlist array
        } else {
          console.error('Failed to fetch watchlist data');
        }
      } catch (error) {
        console.error('Error fetching watchlist data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <center><h2>Watchlist</h2></center>
      {watchlist.length === 0 ? (
        <center><p>Your watchlist is empty.</p></center>
      ) : (
        <ul>
          {watchlist.map(product => (
            <li key={product.id}>
              <div>
                <img src={product.image} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>Current Bid: {product.currentBid}</p>
                  <p>End Date: {product.endDate}</p>
                  {/* Add a button or action to remove item from watchlist */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WatchList;