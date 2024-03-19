


//Header.js
import React from 'react';
import { BrowserRouter , Routes,Route,Link } from 'react-router-dom';
import Home from './Home';
import ActiveListing from './ActiveListing';
import CreateListing from './CreateListing';
import WatchList from './WatchList';
import Category from './Category';
import './Header.css'

function Header(props) {
    console.log(props.list);
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/ActiveListing">ActiveListing</Link></li>
                    <li><Link to="/CreateListing">CreateListing</Link></li>
                    <li><Link to="/WatchList">WatchList</Link></li>
                    {/* <li><Link to="/Category">Category</Link></li> */}
                </ul>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/ActiveListing' element={<ActiveListing />} />
                    <Route exact path='/CreateListing' element={<CreateListing />} />
                    <Route exact path='/WatchList' element={<WatchList />} />
                    {/* <Route exact path='/Category' element={<Category />} /> */}
                </Routes>
            </div>
        </BrowserRouter>
    ) 
}
 
export default Header;
