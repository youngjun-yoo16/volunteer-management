from sqlalchemy.orm import Session, joinedload
from models import Event, VolunteerAssignment
from schemas import EventCreate, EventUpdate, AssignmentCreate, AssignmentUpdate

# Event-related CRUD functions
def create_event(db: Session, event: EventCreate):
    db_event = Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

def get_events(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Event).offset(skip).limit(limit).all()

def update_event(db: Session, event_id: int, event_data: EventUpdate):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if db_event is None:
        return None
    
    # Update fields
    db_event.name = event_data.name
    db_event.date = event_data.date
    db_event.location = event_data.location
    db_event.type = event_data.type

    db.commit()
    db.refresh(db_event)
    return db_event

def delete_event_with_assignments(db: Session, event_id: int):
    # First, delete all volunteer assignments linked to this event
    db.query(VolunteerAssignment).filter(VolunteerAssignment.event_id == event_id).delete()
    # Then, delete the event itself
    db.query(Event).filter(Event.id == event_id).delete()
    db.commit()

# Assignment-related CRUD functions
def add_assignment(db: Session, assignment: AssignmentCreate):
    db_assignment = VolunteerAssignment(**assignment.dict())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

def get_assignments(db: Session):
    # Use joinedload to fetch related events and filter out None values for event
    assignments = (
        db.query(VolunteerAssignment)
        .options(joinedload(VolunteerAssignment.event))
        .filter(VolunteerAssignment.event != None)  # Exclude assignments with no associated event
        .all()
    )
    return assignments

def update_assignment(db: Session, assignment_id: int, assignment: AssignmentUpdate):
    db_assignment = db.query(VolunteerAssignment).filter(VolunteerAssignment.id == assignment_id).first()
    if db_assignment is None:
        return None
    
    db_assignment.volunteer_id = assignment.volunteer_id
    db_assignment.event_id = assignment.event_id
    db_assignment.hours = assignment.hours

    db.commit()
    db.refresh(db_assignment)
    return db_assignment

def delete_assignment(db: Session, assignment_id: int):
    db_assignment = db.query(VolunteerAssignment).filter(VolunteerAssignment.id == assignment_id).first()
    if db_assignment is None:
        return None
    
    db.delete(db_assignment)
    db.commit()
    return {"msg": "Assignment deleted successfully"}
