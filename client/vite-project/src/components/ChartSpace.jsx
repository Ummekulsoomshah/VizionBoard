import React, { useState, useEffect } from 'react';
import {
  ChevronDown, LayoutDashboard, Settings, Bell, Search, Moon
} from 'lucide-react';

import {
  BarChart, LineChart, AreaChart, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Bar, Line, Area
} from 'recharts'; 

import { Link } from 'react-router-dom';
import axios from 'axios';

const ChartSpace = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('http://localhost:3000/get-all-files');
        setUploadedFiles(res.data.filesData);
        console.log("Fetched files:", res.data);
      } catch (err) {
        console.error("Error fetching file list:", err);
      }
    };
    fetchFiles();
  }, []);

  const handleFileChange = (fileId) => {
    setSelectedFileId(fileId);
    const file = uploadedFiles.find(f => f.id === parseInt(fileId));
    if (file?.data) {
      const parsed = file.data.map(row => {
        const cleanRow = {};
        for (let key in row) {
          const val = row[key];
          cleanRow[key] = isNaN(val) ? val : Number(val);
        }
        return cleanRow;
      });
      setChartData(parsed);
    } else {
      setChartData([]);
    }
  };

  const renderChart = () => {
    if (!Array.isArray(chartData) || chartData.length === 0 || !chartData[0]) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500 text-xl">
          Select a file and chart type to visualize data.
        </div>
      );
    }

    const dataKeys = chartData[0] ? Object.keys(chartData[0]) : [];
    if (dataKeys.length < 2) {
      return (
        <div className="flex items-center justify-center h-full text-red-400 text-xl">
          Insufficient data to render a meaningful chart.
        </div>
      );
    }

    const xAxisKey = dataKeys[0];
    const yAxisKeys = dataKeys.slice(1);

    return (
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'bar' && (
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis dataKey={xAxisKey} stroke="#a0aec0" />
            <YAxis stroke="#a0aec0" />
            <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#cbd5e0' }} />
            <Legend wrapperStyle={{ color: '#cbd5e0' }} />
            {yAxisKeys.map((key, index) => (
              <Bar key={index} dataKey={key} fill={['#6366f1', '#a855f7', '#10b981'][index % 3]} radius={[10, 10, 0, 0]} />
            ))}
          </BarChart>
        )}
        {chartType === 'line' && (
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis dataKey={xAxisKey} stroke="#a0aec0" />
            <YAxis stroke="#a0aec0" />
            <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#cbd5e0' }} />
            <Legend wrapperStyle={{ color: '#cbd5e0' }} />
            {yAxisKeys.map((key, index) => (
              <Line key={index} type="monotone" dataKey={key} stroke={['#6366f1', '#a855f7', '#10b981'][index % 3]} strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            ))}
          </LineChart>
        )}
        {chartType === 'area' && (
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis dataKey={xAxisKey} stroke="#a0aec0" />
            <YAxis stroke="#a0aec0" />
            <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#cbd5e0' }} />
            <Legend wrapperStyle={{ color: '#cbd5e0' }} />
            {yAxisKeys.map((key, index) => (
              <Area key={index} type="monotone" dataKey={key} stroke={['#6366f1', '#a855f7', '#10b981'][index % 3]} fillOpacity={1} fill={`url(#color${index})`} />
            ))}
            <defs>
              {yAxisKeys.map((key, index) => (
                <linearGradient key={index} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={['#6366f1', '#a855f7', '#10b981'][index % 3]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={['#6366f1', '#a855f7', '#10b981'][index % 3]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
          </AreaChart>
        )}
      </ResponsiveContainer>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col rounded-r-2xl shadow-lg">
        <div className="flex items-center mb-10">
          <img src="https://placehold.co/40x40/4f46e5/ffffff?text=F" alt="Fillow Logo" className="w-10 h-10 rounded-full mr-3" />
          <h1 className="text-2xl font-bold text-indigo-400">fillow.</h1>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <Link to='/dashboard/chart-space' className="flex items-center p-3 rounded-xl bg-indigo-700 text-white font-semibold">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Chart Workspace
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between bg-gray-800 p-4 rounded-xl mb-6 shadow-lg">
          <h2 className="text-xl font-semibold">Chart Workspace</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search here ..." className="bg-gray-700 text-gray-200 py-2 pl-10 pr-4 rounded-xl w-64" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <Bell className="text-gray-400" />
            <Settings className="text-gray-400" />
            <Moon className="text-white bg-indigo-600 rounded-full p-1" />
            <img src="https://placehold.co/40x40/cccccc/ffffff?text=User" alt="User" className="w-10 h-10 rounded-full" />
          </div>
        </header>

        {/* Controls */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label htmlFor="file-select" className="text-gray-300 text-sm mb-2 block">Select uploaded file:</label>
            <div className="relative">
              <select
                id="file-select"
                value={selectedFileId}
                onChange={(e) => handleFileChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl text-white py-2 pl-3 pr-10 appearance-none"
              >
                <option value="">-- Choose a file --</option>
                {uploadedFiles.map(file => (
                  <option key={file.id} value={file.id}>{file.file_name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="chart-type-select" className="text-gray-300 text-sm mb-2 block">Select chart type:</label>
            <div className="relative">
              <select
                id="chart-type-select"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl text-white py-2 pl-3 pr-10 appearance-none"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="area">Area Chart</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-[600px] flex items-center justify-center">
          {renderChart()}
        </div>
      </main>
    </div>
  );
};

export default ChartSpace;
