import React from 'react';
import { User, FileText, Award, Briefcase, Check, Square } from 'lucide-react'; // Importing necessary icons
import {Link} from 'react-router-dom'
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-gray-800 shadow-lg">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <img src="https://placehold.co/40x40/4f46e5/ffffff?text=G" alt="Geecko ID Logo" className="w-10 h-10 rounded-full mr-2" />
            <span className="text-2xl font-bold text-gray-100">VisionBoard</span>
            <span className="text-sm font-semibold text-gray-400 ml-1">ID</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to='/signup' className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors duration-200">
              <User className="w-5 h-5 mr-1" /> Profile
            </Link>
            <a href="#" className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors duration-200">
              <FileText className="w-5 h-5 mr-1" /> Data file
            </a>
            <a href="#" className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors duration-200">
              <Award className="w-5 h-5 mr-1" /> Ai assistant
            </a>
            <a href="#" className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors duration-200">
              <Briefcase className="w-5 h-5 mr-1" /> visuals
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Ivan Zheludkov</span>
          <img src="https://placehold.co/36x36/cccccc/ffffff?text=IZ" alt="User Avatar" className="w-9 h-9 rounded-full" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center py-16 px-4">
        <h2 className="text-4xl font-bold text-white mb-2">Hello, Ivan Zheludkov</h2>
        <p className="text-xl text-gray-400 mb-12">Your way to understand complex data easily</p>

        {/* Progress Steps */}
        <div className="flex items-center space-x-8 mb-16">
          <div className="flex items-center flex-col">
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white border-2 border-indigo-600">
              <Check className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center flex-col">
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 text-gray-300 border-2 border-indigo-600">
              <span className="text-lg font-semibold">2</span>
            </div>
          </div>
          <div className="flex items-center flex-col">
            <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 text-gray-300 border-2 border-gray-700">
              <span className="text-lg font-semibold">3</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Card 1: Create CV */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
              {/* SVG for CV icon */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text w-12 h-12 text-indigo-400">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload File</h3>
            <p className="text-gray-400 text-sm mb-6">
              We have developed a platform where you upload complex data file
            </p>
            <button className="bg-gray-700 text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors duration-200 shadow-md">
              Done
              
            </button>
          </div>

          {/* Card 2: Power-up your CV */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center border-2 border-indigo-600">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
              {/* SVG for Power-up icon */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-from-line w-12 h-12 text-indigo-400">
                <path d="M12 17V3" />
                <path d="m6 8 6-6 6 6" />
                <path d="M19 21H5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Turn into visulas</h3>
            <p className="text-gray-400 text-sm mb-6">
              Convert your complex data into simplified visiuals,graphs
            </p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md">
              Take the test
            </button>
          </div>

          {/* Card 3: Choose the most suitable jobs */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex flex-col items-center justify-center mb-6">
              {/* SVG for list icon with numbers */}
              <div className="text-xl font-bold text-indigo-400">100</div>
              <div className="text-xl font-bold text-indigo-400">100</div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get AI suggestions</h3>
            <p className="text-gray-400 text-sm mb-6">
              Do not waste time in thinking get insights from ai
            </p>
            <button className="bg-gray-700 text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors duration-200 shadow-md">
              Get AI powers
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
