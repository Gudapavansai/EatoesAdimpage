import { useState, useEffect } from 'react';
import axios from 'axios';
import { useFetch } from '../hooks/useFetch';
import { Award, Clock, DollarSign, Loader, ShoppingBag, CheckCircle, XCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const { data: topSellers, loading: loadingStats } = useFetch('/analytics/top-sellers');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      let query = `${API_URL}/orders?pageNumber=${page}`;
      if (statusFilter) query += `&status=${statusFilter}`;
      
      const res = await axios.get(query);
      setOrders(res.data.orders);
      setTotalPages(res.data.pages);
      setLoadingOrders(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoadingOrders(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    // Optimistic Update: Update UI immediately
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));

    try {
      await axios.patch(`${API_URL}/orders/${id}/status`, { status: newStatus });
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update status: " + (error.response?.data?.message || error.message));
      // Revert logic: Refetch orders to restore correct state
      fetchOrders();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Preparing': return 'bg-blue-100 text-blue-800';
      case 'Ready': return 'bg-purple-100 text-purple-800';
      case 'Served': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

      {/* Top Sellers Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Award className="mr-2 text-indigo-600" />
          Top Selling Items
        </h2>
        {loadingStats ? (
          <div className="h-40 flex items-center justify-center bg-white rounded-lg border border-gray-200">
            <Loader className="animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topSellers?.map((item, index) => (
              <div key={item._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg">
                  #{index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.details[0]?.name || 'Unknown Item'}</h3>
                  <p className="text-sm text-gray-500">{item.totalQty} Orders</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <ShoppingBag className="mr-2 text-indigo-600" />
                Recent Orders
            </h2>
            <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border-gray-300 rounded-md border p-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex space-x-2">
           <button 
             onClick={() => setPage(p => Math.max(1, p - 1))}
             disabled={page === 1}
             className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
           >
             Prev
           </button>
           <span className="px-3 py-1 text-gray-600">Page {page} of {totalPages}</span>
           <button 
             onClick={() => setPage(p => Math.min(totalPages, p + 1))}
             disabled={page === totalPages}
             className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
           >
             Next
           </button>
          </div>
        </div>
        
        {loadingOrders ? (
          <div className="p-12 flex justify-center">
             <Loader className="animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Table</th>
                  <th className="px-6 py-4 font-medium">Items</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-4">No Orders Found</td></tr>
                ) : orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">#{order._id.slice(-6)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.tableNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.items.map(i => (
                        <div key={i._id}>{i.menuItem?.name} x{i.quantity}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">${order.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                            {order.status === 'Served' ? (
                                <CheckCircle className="text-green-600 w-5 h-5" />
                            ) : order.status === 'Cancelled' ? (
                                <XCircle className="text-red-600 w-5 h-5" />
                            ) : (
                                <select 
                                value={order.status}
                                onChange={(e) => updateStatus(order._id, e.target.value)}
                                className="text-sm border-gray-300 rounded-md border p-1"
                                >
                                <option value="Pending">Pending</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Ready">Ready</option>
                                <option value="Served">Served</option>
                                <option value="Cancelled">Cancelled</option>
                                </select>
                            )}
                        <button 
                            onClick={() => setSelectedOrder(order)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                            View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
            <div className="bg-white rounded-xl max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Order Details #{selectedOrder.orderNumber || selectedOrder._id.slice(-6)}</h2>
                    <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="font-medium">{selectedOrder.customerName || 'Walk-in Customer'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Table Number</p>
                        <p className="font-medium">{selectedOrder.tableNumber}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                            {selectedOrder.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-bold text-lg text-indigo-600">${selectedOrder.totalAmount}</p>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                    <h3 className="font-semibold mb-3">Order Items</h3>
                    <div className="space-y-3">
                        {selectedOrder.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                                        {item.menuItem?.imageUrl ? (
                                            <img 
                                                src={item.menuItem.imageUrl} 
                                                alt={item.menuItem.name} 
                                                className="w-full h-full object-cover" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">IMG</div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{item.menuItem?.name || 'Unknown Item'}</p>
                                        <p className="text-xs text-gray-500">${item.price || item.menuItem?.price} x {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-bold">${(item.price || item.menuItem?.price || 0) * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
