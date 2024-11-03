import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Volunteer Management System</h1>
      <EventForm onEventAdded={() => window.location.reload()} />
      <EventList />
    </div>
  );
}

export default App;
