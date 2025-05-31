import React, { useState, useEffect, createContext, useContext } from 'react';
import { ShoppingCart, User, Search, Filter, Star, Heart, Truck, Shield, CreditCard, Menu, X, Plus, Minus, Eye, Edit, Trash2, Package, Users, BarChart3, Settings } from 'lucide-react';

// Context for global state management
const AppContext = createContext();

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "PlayStation 5 Console",
    price: 499.99,
    originalPrice: 599.99,
    category: "consoles",
    brand: "Sony",
    rating: 4.8,
    reviews: 2456,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
    description: "Next-gen gaming console with ultra-high speed SSD and ray tracing.",
    inStock: true,
    featured: true,
    tags: ["new", "sale"]
  },
  {
    id: 2,
    name: "Xbox Series X",
    price: 499.99,
    category: "consoles",
    brand: "Microsoft",
    rating: 4.7,
    reviews: 1834,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop",
    description: "Most powerful Xbox ever with 4K gaming and backwards compatibility.",
    inStock: true,
    featured: true,
    tags: ["new"]
  },
  {
    id: 3,
    name: "Nintendo Switch OLED",
    price: 349.99,
    category: "consoles",
    brand: "Nintendo",
    rating: 4.9,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Handheld gaming with vibrant OLED screen and enhanced audio.",
    inStock: true,
    featured: true,
    tags: ["popular"]
  },
  {
    id: 4,
    name: "Call of Duty: Modern Warfare III",
    price: 69.99,
    originalPrice: 79.99,
    category: "games",
    brand: "Activision",
    rating: 4.3,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=400&fit=crop",
    description: "Latest installment in the iconic Call of Duty franchise.",
    inStock: true,
    featured: false,
    tags: ["sale", "fps"]
  },
  {
    id: 5,
    name: "Gaming Headset Pro",
    price: 199.99,
    category: "accessories",
    brand: "SteelSeries",
    rating: 4.6,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    description: "Premium gaming headset with 7.1 surround sound and RGB lighting.",
    inStock: true,
    featured: false,
    tags: ["audio"]
  },
  {
    id: 6,
    name: "Mechanical Gaming Keyboard",
    price: 149.99,
    category: "accessories",
    brand: "Razer",
    rating: 4.5,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
    description: "RGB mechanical keyboard with tactile switches for gaming.",
    inStock: false,
    featured: false,
    tags: ["rgb", "mechanical"]
  }
];

const mockUsers = [
  { id: 1, email: 'admin@gamestop.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { id: 2, email: 'user@example.com', password: 'user123', role: 'user', name: 'John Gamer' }
];

// Main App Component
function GameStopApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const contextValue = {
    currentUser,
    setCurrentUser,
    currentView,
    setCurrentView,
    cart,
    setCart,
    wishlist,
    setWishlist,
    products,
    setProducts,
    orders,
    setOrders,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedProduct,
    setSelectedProduct
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        {currentView === 'admin' ? <AdminPanel /> : <CustomerApp />}
      </div>
    </AppContext.Provider>
  );
}

// Customer App Component
function CustomerApp() {
  const { currentView } = useContext(AppContext);

  return (
    <>
      <Header />
      <main>
        {currentView === 'home' && <HomePage />}
        {currentView === 'products' && <ProductsPage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'profile' && <ProfilePage />}
        {currentView === 'login' && <LoginPage />}
        {currentView === 'register' && <RegisterPage />}
      </main>
      <Footer />
    </>
  );
}

// Header Component
function Header() {
  const { currentUser, setCurrentView, cart, setCurrentView: setView } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-bold text-gray-800">GameStop</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentView('home')}
              className="text-gray-700 hover:text-red-600 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('products')}
              className="text-gray-700 hover:text-red-600 font-medium"
            >
              Products
            </button>
            <button className="text-gray-700 hover:text-red-600 font-medium">
              Deals
            </button>
            <button className="text-gray-700 hover:text-red-600 font-medium">
              Trade-In
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search games, consoles..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
              />
            </div>

            {/* Cart */}
            <button
              onClick={() => setCurrentView('cart')}
              className="relative p-2 text-gray-700 hover:text-red-600"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden md:block">{currentUser.name}</span>
                </button>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Admin
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('login')}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="space-y-2">
              <button
                onClick={() => {setCurrentView('home'); setMobileMenuOpen(false);}}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Home
              </button>
              <button
                onClick={() => {setCurrentView('products'); setMobileMenuOpen(false);}}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Products
              </button>
              <div className="px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Home Page Component
function HomePage() {
  const { products, setCurrentView, setSelectedProduct } = useContext(AppContext);
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Level Up Your Gaming</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the latest games, consoles, and accessories at unbeatable prices
          </p>
          <button
            onClick={() => setCurrentView('products')}
            className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $35</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your transactions are safe and secure</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy on all items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentView('products')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Products Page Component
function ProductsPage() {
  const { 
    products, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory 
  } = useContext(AppContext);

  const categories = ['all', 'consoles', 'games', 'accessories'];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    <span className="capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Products ({filteredProducts.length})</h2>
            <select className="border rounded-lg px-4 py-2">
              <option>Sort by Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const { setCurrentView, setSelectedProduct, cart, setCart, wishlist, setWishlist } = useContext(AppContext);

  const addToCart = (e) => {
    e.stopPropagation();
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const viewProduct = () => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const isInWishlist = wishlist.find(item => item.id === product.id);

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={viewProduct}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.tags?.includes('sale') && (
          <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
            SALE
          </span>
        )}
        {product.tags?.includes('new') && (
          <span className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs rounded">
            NEW
          </span>
        )}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-red-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          {product.inStock ? (
            <button
              onClick={addToCart}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Add to Cart
            </button>
          ) : (
            <span className="text-red-500 font-medium text-sm">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Product Detail Page Component
function ProductDetailPage() {
  const { selectedProduct, cart, setCart, setCurrentView } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const addToCart = () => {
    const existingItem = cart.find(item => item.id === selectedProduct.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === selectedProduct.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...selectedProduct, quantity }]);
    }
    setCurrentView('cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => setCurrentView('products')}
        className="mb-4 text-red-600 hover:text-red-700"
      >
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(selectedProduct.rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">({selectedProduct.reviews} reviews)</span>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-red-600">${selectedProduct.price}</span>
            {selectedProduct.originalPrice && (
              <span className="text-xl text-gray-500 line-through">${selectedProduct.originalPrice}</span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

          <div className="border-t pt-6">
            <div className="flex items-center space-x-4 mb-6">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {selectedProduct.inStock ? (
              <button
                onClick={addToCart}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}
              </button>
            ) : (
              <button disabled className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold">
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Cart Page Component
function CartPage() {
  const { cart, setCart, setCurrentView } = useContext(AppContext);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some awesome gaming gear to get started!</p>
        <button
          onClick={() => setCurrentView('products')}
          className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {cart.map(item => (
              <div key={item.id} className="flex items-center p-6 border-b last:border-b-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                