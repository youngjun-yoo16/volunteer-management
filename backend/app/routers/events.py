from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud import create_event, get_events, delete_event
from schemas import EventCreate, EventOut

router = APIRouter()

@router.post("/", response_model=EventOut)
def add_event(event: EventCreate, db: Session = Depends(get_db)):
    return create_event(db, event)

@router.get("/", response_model=list[EventOut])
def read_events(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_events(db, skip=skip, limit=limit)

@router.delete("/{event_id}")
def remove_event(event_id: int, db: Session = Depends(get_db)):
    delete_event(db, event_id)
    return {"msg": "Event deleted"}
