import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MenuForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Main Course',
    price: '',
    description: '',
    isAvailable: true,
    ingredients: '',
    preparationTime: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        category: 'Main Course',
        price: '',
        description: '',
        isAvailable: true,
        ingredients: '',
        preparationTime: '',
        imageUrl: ''
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
        ...formData,
        price: parseFloat(formData.price),
        preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : undefined,
        ingredients: typeof formData.ingredients === 'string' ? formData.ingredients.split(',').map(i => i.trim()).filter(i => i) : formData.ingredients
    };
    onSubmit(submissionData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center catch-click z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{initialData ? 'Edit Item' : 'Add New Item'}</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              name="name" 
              required
              value={formData.name} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
            >
              <option>Appetizer</option>
              <option>Main Course</option>
              <option>Dessert</option>
              <option>Beverage</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input 
              type="number" 
              name="price" 
              required
              value={formData.price} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
            />

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
            <input 
              type="text" 
              name="ingredients" 
              value={formData.ingredients} 
              onChange={handleChange}
              placeholder="Tomato, Basil, Cheese"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Prep Time (mins)</label>
                <input 
                type="number" 
                name="preparationTime" 
                value={formData.preparationTime} 
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                />
            </div>
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input 
                type="text" 
                name="imageUrl" 
                value={formData.imageUrl} 
                onChange={handleChange}
                placeholder="https://..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
                />
            </div>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="isAvailable" 
              checked={formData.isAvailable} 
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Available</label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {initialData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;
