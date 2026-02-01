import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ShoppingCart, Plus, Minus, Trash2, CheckCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const POS = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [tableNumber, setTableNumber] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get(`${API_URL}/menu`);
      setMenuItems(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setLoading(false);
    }
  };

  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
        return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart(prev => prev.map(item => {
        if (item._id === id) {
            const newQty = item.quantity + change;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    if (!tableNumber) return alert('Please enter a table number');
    if (cart.length === 0) return alert('Cart is empty');

    try {
      const orderData = {
        tableNumber: parseInt(tableNumber),
        items: cart.map(item => ({
          menuItem: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: parseFloat(calculateTotal())
      };

      await axios.post(`${API_URL}/orders`, orderData);
      setOrderSuccess(true);
      setCart([]);
      setTableNumber('');
      setTimeout(() => setOrderSuccess(false), 3000);
    } catch (error) {
      alert('Failed to place order');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen pt-4 pb-4 px-4 gap-4 overflow-hidden">
        {/* Menu Selection Area */}
        <div className="flex-1 overflow-y-auto pr-0 md:pr-2 pb-20 md:pb-0">
            <div className="mb-6 sticky top-0 bg-gray-50 pt-2 pb-4 z-10 mx-0 md:mx-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 pl-8 md:pl-0">New Order (POS)</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search menu items..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20 md:pb-20">
                {loading ? (
                    <div className="col-span-full text-center py-12">Loading menu...</div>
                ) : filteredItems.map(item => (
                    <div 
                        key={item._id} 
                        onClick={() => item.isAvailable && addToCart(item)}
                        className={`bg-white p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between h-full ${!item.isAvailable ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:shadow-md border-gray-100 hover:border-indigo-200'}`}
                    >
                        <div>
                            {item.imageUrl && (
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.name} 
                                    className="w-full h-32 object-cover rounded-lg mb-3" 
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            )}
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-900">{item.name}</h3>
                                <span className="font-bold text-indigo-600">${item.price}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full mt-2">{item.category}</span>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
                            <span className={`text-xs font-medium ${item.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                                {item.isAvailable ? 'In Stock' : 'Sold Out'}
                            </span>
                            {item.isAvailable && <div className="bg-indigo-50 text-indigo-600 p-1.5 rounded-lg"><Plus size={16} /></div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Cart Sidebar */}
        <div className="w-full md:w-[350px] bg-white border-l border-gray-200 flex flex-col shadow-xl fixed md:relative bottom-0 left-0 right-0 z-40 h-[30vh] md:h-full rounded-t-xl md:rounded-none transition-all duration-300 transform translate-y-0">
            <div className="p-4 md:p-6 border-b border-gray-200 bg-white flex justify-between items-center rounded-t-xl md:rounded-none cursor-pointer md:cursor-default" onClick={() => document.getElementById('mobile-cart-content').classList.toggle('hidden')}>
                <h2 className="text-lg md:text-xl font-bold flex items-center text-gray-900">
                    <ShoppingCart className="mr-2" /> <span className="md:hidden">Order Items ({cart.length}) - Total: ${calculateTotal()}</span><span className="hidden md:inline">Current Order</span>
                </h2>
                <div className="md:hidden text-gray-500">
                   ▲
                </div>
            </div>
            
            <div id="mobile-cart-content" className="hidden md:flex flex-col flex-1 h-full"> 
            {/* On mobile this is initially hidden or toggled. For better UX, let's make it styled nicer in next iteration if needed, but for now specific h-full logic */}
            {/* Actually, let's keep it simple: fully visible sidebar on desktop, collapsible bottom sheet on mobile */}
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <ShoppingCart size={48} className="mb-4 opacity-20" />
                        <p>Cart is empty</p>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                                <p className="text-sm text-gray-500">${item.price}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button 
                                    onClick={() => updateQuantity(item._id, -1)}
                                    className="p-1 hover:bg-gray-200 rounded text-gray-600"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="font-medium w-4 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item._id, 1)}
                                    className="p-1 hover:bg-gray-200 rounded text-gray-600"
                                >
                                    <Plus size={14} />
                                </button>
                                <button 
                                    onClick={() => removeFromCart(item._id)}
                                    className="p-1 text-red-500 hover:bg-red-50 rounded ml-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200">
                <div className="bg-white p-3 rounded-lg border border-gray-200 mb-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Table Number</label>
                    <input 
                        type="number" 
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="Enter table #"
                        className="w-full font-bold text-gray-900 outline-none text-lg"
                        min="1"
                    />
                </div>
                
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600">Total</span>
                    <span className="text-3xl font-bold text-indigo-600">${calculateTotal()}</span>
                </div>

                <button 
                    onClick={handlePlaceOrder}
                    disabled={cart.length === 0 || !tableNumber}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-95 flex justify-center items-center"
                >
                    {orderSuccess ? (
                        <>
                            <CheckCircle className="mr-2" /> Order Placed!
                        </>
                    ) : 'Place Order'}
                </button>
            </div>
            </div>
        </div>
    </div>
  );
};

export default POS;
