from sqlalchemy.orm import Session, joinedload
from models import Event, VolunteerAssignment
from schemas import EventCreate, AssignmentCreate, AssignmentUpdate

# Event-related CRUD functions
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

# Assignment-related CRUD functions
def add_assignment(db: Session, assignment: AssignmentCreate):
    db_assignment = VolunteerAssignment(**assignment.dict())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

def get_assignments(db: Session):
    return db.query(VolunteerAssignment).options(joinedload(VolunteerAssignment.event)).all()

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
