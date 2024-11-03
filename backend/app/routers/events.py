# events.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from crud import create_event, get_events
from schemas import EventCreate, EventOut

router = APIRouter()

@router.post("/events/", response_model=EventOut)
def add_event(event: EventCreate, db: Session = Depends(get_db)):
    return create_event(db, event)
