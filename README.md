# Volunteer Management System

This project is a Volunteer Management System developed as part of Purdue's CS 348 coursework. It is a full-stack application that enables non-profit organizations to manage events, assign volunteers, and generate reports on volunteer participation. The project is built using FastAPI for the backend and React with Tailwind CSS for the frontend.

## Features

- **Event Management**: Create, edit, delete, and view events with details such as name, date, location, and type.
- **Volunteer Assignment**: Assign volunteers to events, edit their assignments, and track hours worked.
- **Report Generation**: Generate summary reports based on event type, date range, and other filters. View statistics on total events, total volunteers, and average volunteer hours.
- **Responsive UI**: User-friendly interface with dynamic forms and data lists built with Tailwind CSS.

## Technologies Used

- **Frontend**: 
  - React (UI components)
  - Vite (React app bundler)
  - Tailwind CSS (for styling)
- **Backend**:
  - FastAPI (API framework)
  - SQLAlchemy (database ORM)
  - SQLite (database)
- **Other**:
  - Axios (for HTTP requests)
  - SQLite Viewer (for database inspection)

## Project Structure

```plaintext
volunteer-management/
├── backend/
│   ├── app/
│   │   ├── main.py                # FastAPI entry point to start the server and define main app setup
│   │   ├── database.py            # Database connection setup using SQLAlchemy and session management
│   │   ├── models.py              # SQLAlchemy models defining tables for events and volunteer assignments
│   │   ├── schemas.py             # Pydantic models for data validation in API requests and responses
│   │   ├── crud.py                # CRUD operations handling direct interactions with the database
│   │   ├── routers/               # Directory for route modules to organize API endpoints
│   │   │   ├── events.py          # Event-related API routes (add, edit, delete, and retrieve events)
│   │   │   ├── assignments.py     # Volunteer assignment-related API routes (add, edit, delete assignments)
│   │   │   ├── reports.py         # Reporting API routes (generate volunteer event participation reports)
│   └── test.db                    # SQLite database for development and testing
├── frontend/
│   ├── src/
│   │   ├── components/            # Directory for reusable React components making up the UI
│   │   │   ├── EventForm.jsx      # Form component for adding or editing events
│   │   │   ├── EventList.jsx      # Component for displaying a list of events with edit/delete options
│   │   │   ├── Reports.jsx        # Component for generating and displaying reports
│   │   │   ├── VolunteerAssignmentForm.jsx # Form for assigning volunteers to events
│   │   │   ├── VolunteerList.jsx  # Component for displaying a list of volunteer assignments with edit/delete options
│   │   ├── services/              # Directory for Axios-based service modules to handle API requests
│   │   │   ├── api.js             # Main Axios instance configuration for API base URL
│   │   │   ├── assignmentService.js # API service for volunteer assignment-related operations
│   │   │   ├── eventService.js    # API service for event-related operations
│   │   ├── App.jsx                # Main application component that routes between different pages and components
│   │   ├── App.css                # Main CSS file for styling the application
│   │   ├── index.js               # Entry point for React application, renders App component
│   └── public/                    # Directory for static assets (HTML template, icons, etc.)
├── .gitignore                     # Specifies files and directories to ignore in version control
├── README.md                      # Project documentation with setup and usage instructions
└── tailwind.config.js             # Tailwind CSS configuration file for custom styling
```