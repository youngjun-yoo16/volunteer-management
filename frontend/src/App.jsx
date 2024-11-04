import EventForm from './components/EventForm';
import EventList from './components/EventList';
import VolunteerAssignmentForm from './components/VolunteerAssignmentForm';
import VolunteerList from './components/VolunteerList';
import Reports from './components/Reports';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Volunteer Management System</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Forms to Add Event and Assign Volunteer */}
                <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-5xl">
                  <div className="flex-1">
                    <EventForm onEventAdded={() => window.location.reload()} />
                  </div>
                  <div className="flex-1">
                    <VolunteerAssignmentForm onAssignmentAdded={() => window.location.reload()} />
                  </div>
                </div>

                {/* View Reports Button */}
                <div className="mt-6">
                  <Link to="/reports">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                      View Reports
                    </button>
                  </Link>
                </div>

                {/* Event List and Volunteer List */}
                <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-5xl mt-8">
                  <div className="flex-1">
                    <EventList />
                  </div>
                  <div className="flex-1">
                    <VolunteerList onVolunteerDeleted={() => window.location.reload()} />
                  </div>
                </div>
              </>
            }
          />
          <Route path="/reports" element={<Reports />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
