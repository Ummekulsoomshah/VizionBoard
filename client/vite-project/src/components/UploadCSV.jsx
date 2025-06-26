import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { X, Upload, Table } from 'lucide-react';
import axios from 'axios';

const UploadCSV = ({ onClose }) => {
  console.log('UploadCSV component rendered', onClose);
  const [previewData, setPreviewData] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(''); // State for custom messages instead of alert

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewData([]); // Clear previous preview data
    setMessage(''); // Clear previous messages

    if (!selectedFile) {
      return;
    }

    const ext = selectedFile.name.split('.').pop();
    if (ext === 'csv') {
      Papa.parse(selectedFile, {
        header: true,
        complete: async (results) => {
          if (results.data.length > 0) {
            await setPreviewData(results.data);
            console.log('preview data', results.data)
          } else {
            setMessage('CSV file is empty or has no valid data.');
          }
        },
        error: (error) => {
          setMessage(`Error parsing CSV: ${error.message}`);
        }
      });
    }
    else if (ext === 'xlsx') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet);
          if (json.length > 0) {
            await setPreviewData(json);
            console.log('preview data', previewData)

          } else {
            setMessage('Excel file is empty or has no valid data.');
          }
        } catch (error) {
          setMessage(`Error reading Excel file: ${error.message}`);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      setMessage('Only CSV and Excel (.xlsx) files are supported.');
    }
  };

  const handleUpload = async () => {
    if (!file || previewData.length === 0) {
      setMessage('No file selected or preview data is empty.');
      return;
    }

    setMessage('Uploading...');
    try {
      console.log('Simulating upload:', { fileName: file.name, data: previewData });
      const uploadData = {
        fileName: file.name,
        data: previewData
      }
      console.log('uploadData', uploadData)
      const response = await axios.post('http://localhost:3000/uploadFile', uploadData
        // {
        //   headers: {
        //     'authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // }
      )
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (response.status == 201) {
        setMessage('File uploaded and data saved successfully!');
        setIsModalOpen(false);
        setPreviewData([]);
        setFile(null);
      } else {
        console.log('error in submitiing')
      }
      // Optionally close modal after successful upload

    } catch (err) {
      console.error(err);
      setMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100 font-inter p-4">

      <div className="fixed inset-0 bg-[tranparent] flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-gray-700">
          <button
            onClick={() => {
              onClose(); // Call the onClose prop to close the modal
              setPreviewData([]); // Clear data on close
              setFile(null); // Clear file on close
              setMessage(''); // Clear message on close

            }}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-3xl font-bold text-white mb-6 text-center">Upload Data File</h2>

          <div className="flex items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-8 mb-6 cursor-pointer hover:border-indigo-500 transition-colors duration-200">
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
              <Upload className="w-12 h-12 text-indigo-400 mb-3" />
              <span className="text-gray-300 text-lg font-medium">Drag & Drop your file here or <span className="text-indigo-400">Browse</span></span>
              <span className="text-gray-500 text-sm mt-1">(CSV or XLSX files only)</span>
              <input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {file && (
            <p className="text-gray-400 text-center mb-4">Selected File: <span className="font-semibold text-white">{file.name}</span></p>
          )}

          {message && (
            <div className={`p-3 rounded-lg text-sm mb-4 ${message.includes('Error') ? 'bg-red-800 text-red-200' : 'bg-green-800 text-green-200'}`}>
              {message}
            </div>
          )}

          {previewData.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Table className="w-5 h-5 mr-2" />
                Data Preview (First 5 Rows):
              </h3>
              <div className="overflow-x-auto rounded-xl border border-gray-700">
                <table className="min-w-full table-auto text-sm text-left text-gray-300">
                  <thead className="bg-gray-700 text-gray-200 uppercase tracking-wider">
                    <tr>
                      {Object.keys(previewData[0]).map((col, idx) => (
                        <th key={idx} className="px-4 py-3 font-semibold border-b border-gray-600 whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(0, 5).map((row, i) => (
                      <tr key={i} className="bg-gray-800 hover:bg-gray-700 transition-colors duration-150 border-b border-gray-700 last:border-b-0">
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="px-4 py-3 whitespace-nowrap">
                            {val !== null && val !== undefined ? String(val) : ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleUpload}
                  className="px-8 py-3 bg-indigo-600 rounded-xl font-medium text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Upload to Server
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadCSV

