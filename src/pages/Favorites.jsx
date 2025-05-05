import React from 'react';

const Favorites = () => {
  // Mock favorites data - replace with actual data from your state management
  const favorites = [
    { id: 1, name: 'Product 1', price: 99.99, image: 'placeholder.jpg' },
    // Add more favorite items as needed
  ];

  const handleRemoveFromFavorites = (productId) => {
    // TODO: Implement remove from favorites functionality
  };

  const handleAddToCart = (productId) => {
    // TODO: Implement add to cart functionality
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No favorite items yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-primary font-medium mt-2">${product.price}</p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromFavorites(product.id)}
                    className="w-full border border-red-500 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
