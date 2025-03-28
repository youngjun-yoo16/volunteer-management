from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    date = Column(Date)
    location = Column(String)
    type = Column(String)
    # Set cascade on the relationship with assignments
    assignments = relationship("VolunteerAssignment", back_populates="event", cascade="all, delete-orphan")

class VolunteerAssignment(Base):
    __tablename__ = "volunteer_assignments"
    id = Column(Integer, primary_key=True, index=True)
    # Set cascade delete on the foreign key
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"))
    volunteer_id = Column(Integer)
    hours = Column(Integer)
    event = relationship("Event", back_populates="assignments")
