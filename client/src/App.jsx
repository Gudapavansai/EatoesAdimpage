import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import POS from './pages/POS';
import AdminProfile from './pages/AdminProfile';

import { useState } from 'react';
import { Menu } from 'lucide-react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-10 p-2 bg-white rounded-lg shadow-md md:hidden text-gray-700"
        >
          <Menu size={24} />
        </button>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'} md:ml-64 w-full`}>
          <div className="pt-16 md:pt-0"> {/* Add padding top on mobile for the burger button */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/menu" element={<MenuManagement />} />
              <Route path="/pos" element={<POS />} />
              <Route path="/profile" element={<AdminProfile />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
