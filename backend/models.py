from pydantic import BaseModel
from typing import List


class User(BaseModel):
    name: str
    username: str
    password: str
    email: str
    photo_url: str  # can default to a blank placeholder?


class Group(BaseModel):
    group_id: str
    name: str
    status: str
    expiration: str | None  # is there a better dtype for datetimes in pydantic
    timezone: str  # all events/times in the group should use the reference timezone?
    creator: None
    members: List[str] = []
    events: None
    costs: None


class Event(BaseModel):
    name: str
    first_date: str
    first_time: str
    repeat_every: str | None
    users: None


class Cost(BaseModel):
    name: str
    users: None
    category: str
    amount: float
