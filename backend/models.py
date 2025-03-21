from pydantic import BaseModel
from typing import List

class User(BaseModel):
    username: str
    password: str

class Group(BaseModel):
    group_id: str
    name: str
    members: List[str] = []
