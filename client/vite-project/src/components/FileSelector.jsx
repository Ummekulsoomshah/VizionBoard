// components/FileSelector.jsx
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';

const FileSelector = ({ onDataParsed }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('http://localhost:3000/get-all-files');
        setUploadedFiles(res.data.filesData);
      } catch (err) {
        console.error("Failed to fetch uploaded files:", err);
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
      onDataParsed(parsed); // Send data to parent
    } else {
      onDataParsed([]);
    }
  };

  return (
    <div>
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
  );
};

export default FileSelector;
