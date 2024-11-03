from sqlalchemy.orm import Session
from models import Event, VolunteerAssignment
from schemas import EventCreate

def create_event(db: Session, event: EventCreate):
    db_event = Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def get_events(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Event).offset(skip).limit(limit).all()

def delete_event(db: Session, event_id: int):
    db.query(Event).filter(Event.id == event_id).delete()
    db.commit()
