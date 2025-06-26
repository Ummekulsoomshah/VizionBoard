import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Search, Bell, Settings, Sun, Moon, LayoutDashboard, Briefcase, Users, Kanban, Calendar, MessageSquare, Package, BarChart, HardDrive, Plug, FileText, ArrowLeft, ArrowRight, Grid3x3 } from 'lucide-react'; // Using lucide-react for icons. Replaced 'Widgets' with 'Grid3x3' which is a common icon for widgets/grid layouts.
import axios from 'axios';
import { Link } from 'react-router-dom';
import UploadCSV from '../components/UploadCSV';
import { useNavigate } from 'react-router-dom';

// Main App Component
const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);
  const [avatar, setavatar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login'); // or your login route
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getUser',
          {
            headers: {
              'authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        if (response.status === 200) {
          console.log("User data fetched successfully:", response.data);
          setavatar(response.data.user.avatar);
        } else {
          console.error("Failed to fetch user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getUser();
  })
  return (
    <>
      {isModalOpen && (
        <UploadCSV onClose={() => setIsModalOpen(false)} />
      )}
      <div className="flex min-h-screen bg-gray-900 text-gray-100 font-inter">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 p-6 flex flex-col rounded-r-2xl shadow-lg">
          <div className="flex items-center mb-10">
            {/* Placeholder for Fillow Logo */}
            <img src="https://placehold.co/40x40/4f46e5/ffffff?text=VB" alt="vb Logo" className="w-10 h-10 rounded-full mr-3" />
            <h1 className="text-2xl font-bold text-indigo-400">VizionBoard.</h1>
          </div>

          <aside className="fixed top-0 left-0 w-64 h-screen bg-gray-800 p-6 flex flex-col rounded-r-2xl shadow-lg z-20" >
            <ul>
              <li className="mb-4">
                <button
                  className="flex items-center w-full p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setShowDashboardSubMenu(!showDashboardSubMenu)}
                >
                  <LayoutDashboard className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="flex-grow text-lg font-medium">Dashboard</span>
                  {showDashboardSubMenu ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                </button>
                {showDashboardSubMenu && (
                  <ul className="ml-8 mt-2">
                    <li className="mb-2">
                      <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700 text-sm transition-colors duration-200">
                        Dashboard Light
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center p-2 rounded-lg bg-indigo-700 text-sm font-semibold">
                        Dashboard Dark
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                  <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-lg font-medium">My Datasets</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                  <Users className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-lg font-medium">Team</span>
                </a>
              </li>
              <li className="mb-4">
                <Link to='/dashboard/chart-space' className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                  <Kanban className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-lg font-medium">Chart Workspace</span>
                </Link>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                  <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-lg font-medium">Activity Log</span>
                </a>
              </li>
              <li className="mb-4">
                <Link to='/dashboard/ai-assistant' className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                  <MessageSquare className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-lg font-medium">AI Assistant</span>
                </Link>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                  <Package className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-lg font-medium flex items-center">
                    Insights <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 rounded-full">New</span>
                  </span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                  <HardDrive className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-lg font-medium">Export</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                  <BarChart className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-lg font-medium">Charts</span>
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors duration-200">
                  <FileText className="w-5 h-5 mr-3 text-gray-400" />
                  <span className="text-lg font-medium">Upload CSV</span>
                </a>
              </li>
            </ul>
          </aside>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Header */}
          <header className="flex items-center justify-between bg-gray-800 p-4 rounded-xl mb-6 shadow-lg">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold mr-4">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search here ..."
                  className="bg-gray-700 text-gray-200 placeholder-gray-400 py-2 pl-10 pr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                <p className="w-5 h-5 text-gray-400 mr-10" >Logout</p>
              </button>
              <button className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
                <Moon className="w-5 h-5 text-white" />
              </button>
              {/* Placeholder for User Avatar */}
              <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full" />
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Manage your project card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-700 to-purple-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between items-start relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-3xl font-bold mb-2">Replace with an AI prompt card</h3>
                <p className="text-indigo-200 mb-6">Upload your CSV and let AI build insights
                </p>
                <Link to='/dashboard/upload' onClick={() => setIsModalOpen(true)} className="bg-white text-indigo-800 font-semibold py-2 px-6 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  Upload Now
                </Link>
              </div>
              {/* Placeholder for Illustration */}
              <img src="https://placehold.co/200x150/667eea/ffffff?text=Chart" alt="Illustration" className="absolute bottom-0 right-0 opacity-50 z-0" />
            </div>

            {/* Total Clients Card 1 */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-300 mb-2">Total datasets uploaded</h4>
                <p className="text-4xl font-bold text-white">68 <span className="text-green-400 text-lg ml-2">+0.5%</span></p>
              </div>
              <div className="h-16 flex items-end justify-center">
                {/* Placeholder for small bar chart */}
                <div className="flex space-x-1 h-full items-end w-full">
                  <div className="w-1/6 bg-indigo-500 rounded-sm" style={{ height: '40%' }}></div>
                  <div className="w-1/6 bg-indigo-500 rounded-sm" style={{ height: '60%' }}></div>
                  <div className="w-1/6 bg-indigo-500 rounded-sm" style={{ height: '30%' }}></div>
                  <div className="w-1/6 bg-indigo-500 rounded-sm" style={{ height: '80%' }}></div>
                  <div className="w-1/6 bg-indigo-500 rounded-sm" style={{ height: '50%' }}></div>
                  <div className="w-1/6 bg-indigo-500 rounded-sm" style={{ height: '70%' }}></div>
                </div>
              </div>
            </div>

            {/* Total Clients Card 2 */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-300 mb-2">Total datasets uploaded</h4>
                <p className="text-4xl font-bold text-white">42</p>
                <p className="text-sm text-gray-400">76 left from target</p>
              </div>
              <div className="relative w-full bg-gray-700 rounded-full h-2 mt-4">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            {/* Total Clients Card 3 (562) */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
              <div>
                <p className="text-4xl font-bold text-white">562</p>
                <h4 className="text-lg font-medium text-gray-300 mb-2">Charts created</h4>
                <p className="text-sm text-red-400">-2% mon last month</p>
              </div>
              <div className="h-16 flex items-end justify-end">
                {/* Placeholder for small wave chart */}
                <img src="https://placehold.co/100x50/3730a3/ffffff?text=Wave" alt="Wave Chart" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* New Projects Card (892) */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between relative">
              <div>
                <p className="text-4xl font-bold text-white">892</p>
                <h4 className="text-lg font-medium text-gray-300 mb-2">Active collaborators</h4>
                <p className="text-sm text-green-400">+2% than last month</p>
              </div>
              <div className="h-16 flex items-end justify-end">
                {/* Placeholder for small wave chart */}
                <img src="https://placehold.co/100x50/3730a3/ffffff?text=Wave" alt="Wave Chart" className="w-full h-full object-contain" />
              </div>
              <button className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Project Statistics Card */}
            <div className="lg:col-span-2 bg-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Project Statistics</h3>
                <div className="flex space-x-2">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium">Monthly</button>
                  <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-600 transition-colors duration-200">Weekly</button>
                  <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-600 transition-colors duration-200">Today</button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                <div>
                  <p className="text-4xl font-bold text-white">246</p>
                  <p className="text-gray-400">Total Projects</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white">246</p>
                  <p className="text-gray-400">On Going</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white">28</p>
                  <p className="text-gray-400">Unprocessed Datasets</p>
                </div>
              </div>
              {/* Placeholder for larger bar chart */}
              <div className="h-64 bg-gray-700 rounded-lg flex items-end p-4">
                <div className="flex items-end h-full w-full justify-around">
                  {/* Example bars */}
                  <div className="flex-1 bg-indigo-500 rounded-t-lg mx-1" style={{ height: '80%' }}></div>
                  <div className="flex-1 bg-purple-500 rounded-t-lg mx-1" style={{ height: '60%' }}></div>
                  <div className="flex-1 bg-indigo-500 rounded-t-lg mx-1" style={{ height: '90%' }}></div>
                  <div className="flex-1 bg-purple-500 rounded-t-lg mx-1" style={{ height: '70%' }}></div>
                  <div className="flex-1 bg-indigo-500 rounded-t-lg mx-1" style={{ height: '50%' }}></div>
                  <div className="flex-1 bg-purple-500 rounded-t-lg mx-1" style={{ height: '85%' }}></div>
                  <div className="flex-1 bg-indigo-500 rounded-t-lg mx-1" style={{ height: '75%' }}></div>
                </div>
              </div>
            </div>

            {/* Fillow Company Profile Card */}
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">VB Company Profile</h3>
                <p className="text-gray-300 text-lg mb-4">Website Project</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  AI Insights Panel – summary of uploaded data (e.g., column types, top trends, etc.) </p>
                <div className="flex justify-start space-x-4 mb-4">
                  <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
                    <ArrowLeft className="w-5 h-5 text-gray-300" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
                    <ArrowRight className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
              </div>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                  <circle
                    className="text-pink-500"
                    strokeWidth="10"
                    strokeDasharray="251.2" // 2 * PI * 40
                    strokeDashoffset="75.36" // 251.2 * (1 - 0.70)
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                  <text x="50" y="55" className="text-2xl font-bold text-white" textAnchor="middle" dominantBaseline="middle">70%</text>
                </svg>
                <p className="text-center text-sm mt-2 text-gray-400">On Progress 70 %</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

// You'll need to install lucide-react for the icons.
// npm install lucide-react

export default Dashboard;
