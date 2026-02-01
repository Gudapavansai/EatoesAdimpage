import { ChevronRight, LayoutDashboard, UtensilsCrossed } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600">Eatoes Admin</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>
        <NavLink 
          to="/menu" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          <UtensilsCrossed size={20} />
          <span className="font-medium">Menu Management</span>
        </NavLink>
        <NavLink 
          to="/pos" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          <div className="w-5 h-5 flex items-center justify-center border-2 border-current rounded-md text-[10px] font-bold">POS</div>
          <span className="font-medium">New Order</span>
        </NavLink>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <NavLink to="/profile" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors group">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-200 transition-colors">A</div>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500 group-hover:text-indigo-600 transition-colors">View Profile</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
