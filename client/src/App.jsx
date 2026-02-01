import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import POS from './pages/POS';
import AdminProfile from './pages/AdminProfile';

function App() {
  return (
    <Router>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="ml-64 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/profile" element={<AdminProfile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
