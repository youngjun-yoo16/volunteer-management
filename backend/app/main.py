from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from crud import create_event, get_events, delete_event
from schemas import EventCreate, EventOut

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.post("/events/", response_model=EventOut)
def add_event(event: EventCreate, db: Session = Depends(get_db)):
    return create_event(db, event)

@app.get("/events/", response_model=list[EventOut])
def read_events(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_events(db, skip=skip, limit=limit)

@app.delete("/events/{event_id}")
def remove_event(event_id: int, db: Session = Depends(get_db)):
    delete_event(db, event_id)
    return {"msg": "Event deleted"}
