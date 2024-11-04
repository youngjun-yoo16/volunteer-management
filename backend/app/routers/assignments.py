from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import AssignmentCreate, AssignmentUpdate, AssignmentOut
from typing import List
import crud  # Importing crud module

router = APIRouter()

@router.post("/", response_model=AssignmentCreate)
def add_assignment(assignment: AssignmentCreate, db: Session = Depends(get_db)):
    return crud.add_assignment(db, assignment)

@router.get("/", response_model=List[AssignmentOut])
def get_assignments(db: Session = Depends(get_db)):
    return crud.get_assignments(db)  # Explicitly call the CRUD function

@router.put("/{assignment_id}", response_model=AssignmentCreate)
def update_assignment(assignment_id: int, assignment: AssignmentUpdate, db: Session = Depends(get_db)):
    db_assignment = crud.update_assignment(db, assignment_id, assignment)
    if db_assignment is None:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return db_assignment

@router.delete("/{assignment_id}", response_model=dict)
def delete_assignment(assignment_id: int, db: Session = Depends(get_db)):
    result = crud.delete_assignment(db, assignment_id)
    if result is None:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return result
