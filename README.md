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
│   │   ├── main.py                # FastAPI entry point
│   │   ├── database.py            # Database connection and setup
│   │   ├── models.py              # SQLAlchemy models for events and assignments
│   │   ├── schemas.py             # Pydantic models for request and response validation
│   │   ├── crud.py                # CRUD operations for database interactions
│   │   ├── routers/
│   │   │   ├── events.py          # Event-related API routes
│   │   │   ├── assignments.py     # Volunteer assignment-related API routes
│   │   │   ├── reports.py         # Reporting API routes
│   └── test.db                    # SQLite database (development)
├── frontend/
│   ├── src/
│   │   ├── components/            # React components for the UI
│   │   │   ├── EventForm.jsx      # Event creation/editing form
│   │   │   ├── EventList.jsx      # List of events with edit/delete options
│   │   │   ├── VolunteerAssignment.jsx # Volunteer assignment form
│   │   │   ├── VolunteerList.jsx  # List of volunteer assignments with edit/delete options
│   │   ├── services/              # Axios service files for API requests
│   │   ├── App.jsx                # Main application component
│   └── public/
└── README.md                      # Project README
```