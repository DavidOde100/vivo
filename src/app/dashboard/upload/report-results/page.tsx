"use client";

import { useSearchParams } from "next/navigation"; // Use for extracting query params
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/DashboardNavbar";
import { useState } from "react";

// Lab Results Component
const LabResults = ({ labResults }: { labResults: string }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold text-blue-600 mb-3">Lab Results</h2>
      <p className="whitespace-pre-line leading-relaxed text-black">{labResults}</p>
    </div>
  );
};

// Chatbot Component
const Chatbot = ({ summary }: { summary: string }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question) {
      alert('Please enter a question.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/dashboard/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ summary, question }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
      alert('There was an error fetching the chatbot response.');
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
      <h2 className="text-lg font-semibold text-blue-600 mb-3">Ask Questions About the Summary</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the summary..."
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {isLoading ? 'Asking...' : 'Ask'}
        </button>
      </form>
      {response && (
        <div className="bg-gray-100 p-3 rounded shadow">
          <h3 className="font-semibold">Chatbot Response:</h3>
          <p className="text-black">{response}</p> {/* Changed to black */}
        </div>
      )}
    </div>
  );
};

const ReportResultsPage = () => {
  const searchParams = useSearchParams();
  const summary = searchParams.get("summary"); // Extract the summary from the URL
  const labResults = searchParams.get("labResults"); // Extract the lab results from the URL

  return (
    <div className="flex h-screen bg-white"> {/* Changed background to white */}
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main content - Centered Card */}
        <div className="flex-1 flex items-center justify-center h-screen bg-white"> {/* Centering using Flexbox */}
          <div className="w-full h-auto min-h-[50vh] min-w-[50vw] lg:max-w-[80vw] lg:max-h-[80vh] bg-white shadow-lg rounded-lg p-6 overflow-y-auto"> {/* Dynamic width/height based on screen size */}
            
            {/* Lab Results Section */}
            {labResults ? (
              <LabResults labResults={labResults} />
            ) : (
              <p>No lab results available</p>
            )}

            {/* PDF Summary Section */}
            <h2 className="text-2xl font-bold text-blue-600 mb-4 mt-4">PDF Summary</h2>
            {summary ? (
              <p className="whitespace-pre-line leading-relaxed text-black"> {/* Changed to black */}
                {summary}
              </p>
            ) : (
              <p>No summary available</p>
            )}

            {/* Chatbot Integration */}
            {summary && <Chatbot summary={summary} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportResultsPage;