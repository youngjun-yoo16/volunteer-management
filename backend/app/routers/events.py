from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud import create_event, get_events, delete_event_with_assignments, update_event
from schemas import EventCreate, EventUpdate, EventOut

router = APIRouter()

@router.post("/", response_model=EventOut)
def add_event(event: EventCreate, db: Session = Depends(get_db)):
    return create_event(db, event)

@router.get("/", response_model=list[EventOut])
def read_events(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_events(db, skip=skip, limit=limit)

@router.put("/{event_id}", response_model=EventOut)
def edit_event(event_id: int, event: EventUpdate, db: Session = Depends(get_db)):
    db_event = update_event(db, event_id, event)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@router.delete("/{event_id}")
def remove_event(event_id: int, db: Session = Depends(get_db)):
    delete_event_with_assignments(db, event_id)
    return {"msg": "Event and associated volunteer assignments deleted"}