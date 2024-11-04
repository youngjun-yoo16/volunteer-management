from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import events, reports, assignments

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specify allowed origins, e.g., ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


Base.metadata.create_all(bind=engine)

# Register the routers
app.include_router(events.router, prefix="/events")
app.include_router(reports.router, prefix="/reports")
app.include_router(assignments.router, prefix="/assignments")
