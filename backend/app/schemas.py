from pydantic import BaseModel
from datetime import date

class EventBase(BaseModel):
    name: str
    date: date
    location: str
    type: str

class EventCreate(EventBase):
    pass

class EventOut(EventBase):
    id: int
    class Config:
        orm_mode = True
