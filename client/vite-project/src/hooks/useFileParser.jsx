// hooks/useFileParser.js
import { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const useFileParser = () => {
  const [previewData, setPreviewData] = useState([]);
  const [error, setError] = useState('');

  const parseFile = (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    setPreviewData([]);
    setError('');

    if (ext === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          if (results.data.length > 0) {
            setPreviewData(results.data);
          } else {
            setError('CSV file is empty or has no valid data.');
          }
        },
        error: (err) => setError(`CSV Parsing Error: ${err.message}`),
      });
    } else if (ext === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet);
          if (json.length > 0) {
            setPreviewData(json);
          } else {
            setError('Excel file is empty or has no valid data.');
          }
        } catch (err) {
          setError(`Excel Parsing Error: ${err.message}`);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError('Only CSV and Excel files are supported.');
    }
  };

  return { previewData, error, parseFile, setPreviewData };
};

export default useFileParser;
