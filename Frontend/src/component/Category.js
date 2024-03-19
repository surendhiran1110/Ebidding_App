// Category.js
import React, { useState, useEffect } from 'react'; 
function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]); // Define products state

  useEffect(() => {
    // Fetch categories and products from the backend
    const fetchCategoryAndProductData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('your-categories-endpoint');
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setCategories(categoriesData.categories);
        } else {
          console.error('Failed to fetch categories');
        }

        // Fetch products
        const productsResponse = await fetch('your-products-endpoint');
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData.products);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching category and product data:', error);
      }
    };

    fetchCategoryAndProductData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handleSearch(searchTerm, category);
  };

  const handleSearch = (term, category) => {
    // Filter products based on the selected category and search term
    const filtered = products.filter(product => {
      return (
        (category === '' || product.category === category) &&
        (term === '' || product.name.toLowerCase().includes(term.toLowerCase()))
      );
    });
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h2>Category</h2>
              {/* <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            All Categories
          </button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button">Mobile Phones</button></li>
            <li><button class="dropdown-item" type="button">Furnitures</button></li>
            <li><button class="dropdown-item" type="button">Fashion</button></li>
          </ul>
        </div> */}
      {/* Category dropdown */}
      <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        <ul class="dropdown-menu">
            <li><button class="dropdown-item" type="button">Mobile Phones</button></li>
            <li><button class="dropdown-item" type="button">Furnitures</button></li>
            <li><button class="dropdown-item" type="button">Fashion</button></li>
          </ul>
        {categories.map(category => (
          <option key={category.id} value={category.name}>{category.name}</option>
        ))}
      </select>
      {/* Search input */}
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <center><button onClick={() => handleSearch(searchTerm, selectedCategory)} type="button" class="btn btn-primary" data-bs-toggle="button">Search</button></center>
      {/* Display filtered products */}
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
