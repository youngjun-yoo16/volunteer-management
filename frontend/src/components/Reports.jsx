import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Reports() {
  const [reportData, setReportData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventType, setEventType] = useState('');

  const navigate = useNavigate(); // Initialize navigate hook

  const fetchReport = async () => {
    try {
      const response = await api.get('/reports/events/', {
        params: {
          start_date: startDate || undefined,
          end_date: endDate || undefined,
          event_type: eventType || undefined,
        },
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Event Report</h2>
      
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200 mb-4"
      >
        Go Back
      </button>

      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Event Type</label>
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Types</option>
          <option value="Cleanup">Cleanup</option>
          <option value="Fundraising">Fundraising</option>
          <option value="Environmental">Environmental</option>
        </select>
      </div>
      <button
        onClick={fetchReport}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Generate Report
      </button>

      {reportData && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Report Summary</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <p className="text-gray-600 font-semibold">Total Events</p>
              <p className="text-3xl font-bold text-blue-600">{reportData.total_events}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <p className="text-gray-600 font-semibold">Total Volunteers</p>
              <p className="text-3xl font-bold text-green-600">{reportData.total_volunteers}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <p className="text-gray-600 font-semibold">Average Volunteer Hours</p>
              <p className="text-3xl font-bold text-purple-600">{reportData.avg_volunteer_hours?.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
