import React, { useEffect, useState } from 'react';
import { Sparkles, Clipboard, CheckCircle, XCircle } from 'lucide-react'; // Icons for AI, copy, success, error
import FileSelector from './FileSelector';
import axios from 'axios';
const AIassistant = () => {
  const [inputData, setInputData] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [chartData, setChartData] = useState([]);
  const handleSummarize = async () => {

    setIsLoading(true);
    setSummary('');
    setMessage('');

    const prompt = `Please provide a concise summary of the following text: ${chartData.length > 0 ? JSON.stringify(chartData) : inputData}`;

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = process.env.gemini_api_key;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await axios.post(apiUrl, JSON.stringify(payload),
     {
       headers: { 'Content-Type': 'application/json' } 
      }

      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setSummary(text);
        setMessage('Summary generated successfully!');
      } else {
        setMessage('Could not generate summary. No valid response from AI.');
        console.error('Unexpected API response structure:', result);
      }
    } catch (error) {
      console.error('Error summarizing data:', error);
      setMessage(`Error: ${error.message || 'Failed to connect to AI service.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (summary) {
      // Using document.execCommand for better iframe compatibility
      const textarea = document.createElement('textarea');
      textarea.value = summary;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setMessage('Summary copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text:', err);
        setMessage('Failed to copy summary to clipboard.');
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100 font-inter p-6">
      <div className="flex-1 bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-4xl mx-auto flex flex-col">
        <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center">
          <Sparkles className="w-8 h-8 mr-3 text-indigo-400" />
          AI Assistant - Data Summarizer
        </h2>
        <FileSelector onDataParsed={(parsedData) => setChartData(parsedData)} />

        {message && (
          <div className={`p-4 rounded-xl text-center text-sm mb-6 ${message.includes('Error') ? 'bg-red-800 text-red-200' : 'bg-green-800 text-green-200'
            }`}>
            {message}
          </div>
        )}

        <div className="mb-6 flex-grow flex flex-col">
          <label htmlFor="input-data" className="block text-gray-300 text-lg font-medium mb-3">
            Enter text or data to summarize:
          </label>
          <textarea
            id="input-data"
            className="w-full h-48 bg-gray-700 border border-gray-600 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            placeholder="Paste your text here..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleSummarize}
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-6 border border-transparent text-lg font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Summarizing...
            </>
          ) : (
            'Summarize Data'
          )}
        </button>

        {summary && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Clipboard className="w-6 h-6 mr-2 text-indigo-400" />
              Summary:
              <button
                onClick={copyToClipboard}
                className="ml-auto p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-gray-400"
                title="Copy to clipboard"
              >
                <Clipboard className="w-5 h-5" />
              </button>
            </h3>
            <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 text-white leading-relaxed whitespace-pre-wrap shadow-inner min-h-[100px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {summary}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIassistant;
