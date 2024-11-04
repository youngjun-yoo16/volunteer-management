from pydantic import BaseModel
from typing import Optional
from datetime import date

class EventBase(BaseModel):
    name: str
    date: date
    location: str
    type: str

class EventCreate(EventBase):
    pass

class EventUpdate(EventBase):
    name: Optional[str]
    date: Optional[date]
    location: Optional[str]
    type: Optional[str]
    
class EventOut(EventBase):
    id: int
    class Config:
        orm_mode = True

# Schema for Event summary details within an assignment
class EventSummary(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
        
# EventReport schema for reporting
class EventReport(BaseModel):
    total_events: int
    total_volunteers: int
    avg_volunteer_hours: Optional[float]  # Avg hours may be null if no data

    class Config:
        orm_mode = True

# AssignmentCreate schema for adding volunteer assignments
class AssignmentCreate(BaseModel):
    event_id: int
    volunteer_id: int
    hours: int

    class Config:
        orm_mode = True

# AssignmentUpdate schema for updating volunteer assignments
class AssignmentUpdate(BaseModel):
    event_id: Optional[int]
    volunteer_id: Optional[int]
    hours: Optional[int]

    class Config:
        orm_mode = True

class AssignmentOut(BaseModel):
    id: int
    volunteer_id: int
    hours: int
    event: Optional[EventSummary] = None  # Make event optional

    class Config:
        orm_mode = True
