from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date
from typing import Optional
from database import get_db
from sqlalchemy import text
from schemas import EventReport

router = APIRouter()

@router.get("/events/", response_model=EventReport)
def generate_event_report(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    event_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    # Base SQL query for filtered report
    base_query = """
        SELECT 
            COUNT(DISTINCT e.id) AS total_events,
            COUNT(DISTINCT va.volunteer_id) AS total_volunteers,
            AVG(va.hours) AS avg_volunteer_hours
        FROM events e
        JOIN volunteer_assignments va ON e.id = va.event_id
        WHERE (:start_date IS NULL OR e.date >= :start_date)
          AND (:end_date IS NULL OR e.date <= :end_date)
          AND (:event_type IS NULL OR e.type = :event_type)
    """

    # Execute the query using SQLAlchemy's `text` for prepared statements
    result = db.execute(
        text(base_query),
        {"start_date": start_date, "end_date": end_date, "event_type": event_type}
    ).fetchone()

    return {
        "total_events": result.total_events,
        "total_volunteers": result.total_volunteers,
        "avg_volunteer_hours": result.avg_volunteer_hours,
    }
