import { useState } from 'react';
import { User, Mail, Building, Save, Lock, Bell } from 'lucide-react';

const AdminProfile = () => {
    const [profile, setProfile] = useState({
        restaurantName: 'Eatoes Restaurant',
        adminName: 'Admin User',
        email: 'admin@eatoes.com',
        phone: '+1 234 567 890',
        notifications: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert('Profile updated successfully! (Mock)');
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-3xl mx-auto mb-4">
                            {profile.adminName.charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{profile.adminName}</h2>
                        <p className="text-gray-500 text-sm">Super Admin</p>
                        
                        <div className="mt-6 border-t border-gray-100 pt-6 text-left space-y-3">
                            <div className="flex items-center text-gray-600">
                                <Building size={18} className="mr-3" />
                                <span>{profile.restaurantName}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Mail size={18} className="mr-3" />
                                <span>{profile.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Profile Settings</h3>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="text" 
                                            name="restaurantName"
                                            value={profile.restaurantName}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="text" 
                                            name="adminName"
                                            value={profile.adminName}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={profile.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-md font-semibold text-gray-900 flex items-center">
                                        <Lock className="mr-2" size={18} /> Security
                                    </h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="password" placeholder="New Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                    <input type="password" placeholder="Confirm Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Bell className="mr-2 text-gray-500" size={20} />
                                        <div>
                                            <p className="font-medium text-gray-900">Email Notifications</p>
                                            <p className="text-sm text-gray-500">Receive daily summary reports</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            name="notifications"
                                            checked={profile.notifications}
                                            onChange={handleChange}
                                            className="sr-only peer" 
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button type="submit" className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                                    <Save size={18} />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
