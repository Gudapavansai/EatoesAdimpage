import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from '../hooks/useDebounce';
import { Search, Plus, Loader, Edit, Trash2 } from 'lucide-react';
import MenuForm from '../components/MenuForm';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchMenuItems();
  }, [debouncedSearch, selectedCategory, availabilityFilter]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      let query = `?q=${debouncedSearch}`;
      if (selectedCategory) query += `&category=${selectedCategory}`;
      if (availabilityFilter) query += `&isAvailable=${availabilityFilter === 'available'}`;
      
      const res = await axios.get(`${API_URL}/menu${query}`);
      setMenuItems(res.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await axios.post(`${API_URL}/menu`, formData);
      fetchMenuItems();
      setIsFormOpen(false);
    } catch (error) {
      alert("Failed to create item: " + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await axios.put(`${API_URL}/menu/${editingItem._id}`, formData);
      fetchMenuItems();
      setIsFormOpen(false);
      setEditingItem(null);
    } catch (error) {
      alert("Failed to update item");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/menu/${id}`);
      setMenuItems(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      alert("Failed to delete item");
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    // Optimistic UI
    const originalItems = [...menuItems];
    setMenuItems(prev => 
      prev.map(item => item._id === id ? { ...item, isAvailable: !currentStatus } : item)
    );

    try {
      await axios.patch(`${API_URL}/menu/${id}/availability`);
    } catch (error) {
      setMenuItems(originalItems); // Revert
      alert("Failed to update availability");
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
        <button 
          onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full sm:w-auto justify-center"
        >
          <Plus size={20} />
          <span>Add Item</span>
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search items..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>

        <select 
          value={availabilityFilter} 
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="soldout">Sold Out</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader className="animate-spin text-indigo-600" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  {item.imageUrl && (
                    <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-32 object-cover rounded-lg mb-3" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                      <span className="inline-block bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full font-medium">
                        {item.category}
                      </span>
                      {item.preparationTime && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                            {item.preparationTime} min
                        </span>
                      )}
                  </div>
                </div>
                <div className="flex space-x-2 ml-2">
                  <button 
                    onClick={() => { setEditingItem(item); setIsFormOpen(true); }}
                    className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</p>
              {item.ingredients && item.ingredients.length > 0 && (
                  <p className="text-xs text-gray-400 mb-4 truncate">
                      Ingredients: {item.ingredients.join(', ')}
                  </p>
              )}
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <span className="text-xl font-bold text-gray-900">${item.price}</span>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={item.isAvailable} 
                      onChange={() => toggleAvailability(item._id, item.isAvailable)}
                    />
                    <div className={`block w-10 h-6 rounded-full transition ${item.isAvailable ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${item.isAvailable ? 'translate-x-4' : ''}`}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{item.isAvailable ? 'Available' : 'Sold Out'}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      <MenuForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        initialData={editingItem}
      />
    </div>
  );
};

export default MenuManagement;
