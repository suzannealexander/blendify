from pydantic import BaseModel
from datetime import datetime, date, time
from sqlalchemy import (
    Integer,
    Float,
    String,
    ForeignKey,
    DateTime,
    Date,
    Time,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


# instantiate declarative base
class Base(DeclarativeBase):
    pass


class UserBase(Base):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(40), nullable=False)  # length okay?
    username: Mapped[str] = mapped_column(String(40), nullable=False)
    # werkzeug.security generates 162 length hashes, modify with whatever we end up using
    password: Mapped[str] = mapped_column(String(162), nullable=False)
    email: Mapped[str] = mapped_column(String(60), nullable=False)  # length okay?
    photo_url: Mapped[str] = mapped_column(String(60), nullable=False, default="None")

    # relationships
    owned_groups: Mapped[list["GroupBase"]] = relationship(back_populates="creator")
    joined_groups: Mapped[list["GroupBase"]] = relationship(back_populates="members")

    events: Mapped[list["EventBase"]] = relationship(back_populates="members")

    costs: Mapped[list["CostBase"]] = relationship(back_populates="senders")
    receipts: Mapped[list["CostBase"]] = relationship(back_populates="recipient")


class EventBase(Base):
    __tablename__ = "event"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    first_date: Mapped[date] = mapped_column(Date, nullable=False)
    first_time: Mapped[time] = mapped_column(Time, nullable=False)
    repeat_every: Mapped[str] = mapped_column(String(40))

    # user relationship
    member_ids: Mapped[list[int]] = mapped_column(Integer, ForeignKey("user.id"))
    members: Mapped[list["UserBase"]] = relationship("user", back_populates="events")

    # group relationship
    group_id: Mapped[int] = mapped_column(Integer, ForeignKey("group.id"))
    group: Mapped["GroupBase"] = relationship("group", back_populates="events")


class CostBase(Base):
    __tablename__ = "cost"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    category: Mapped[str] = mapped_column(String(40))
    amount: Mapped[float] = mapped_column(Float, nullable=False)

    # missing anything to track resolution of the cost
    # will need to track amount paid per user or similar

    # user relationship
    recipient_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    recipient: Mapped["UserBase"] = relationship("user", back_populates="receipts")

    sender_ids: Mapped[list[int]] = mapped_column(Integer, ForeignKey("user.id"))
    senders: Mapped[list["UserBase"]] = relationship("user", back_populates="costs")

    # group relationship
    group_id: Mapped[int] = mapped_column(Integer, ForeignKey("group.id"))
    group: Mapped["GroupBase"] = relationship("group", back_populates="costs")


class GroupBase(Base):
    __tablename__ = "group"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False)
    expiration: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    timezone: Mapped[str] = mapped_column(
        String(30), nullable=False
    )  # all events/times in the group should use the reference timezone?

    # creator relationship
    creator_id = Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    creator: Mapped["UserBase"] = relationship("user", back_populates="owned_groups")

    # member relationship
    member_ids = Mapped[list[int]] = mapped_column(Integer, ForeignKey("user.id"))
    members: Mapped[list["UserBase"]] = relationship(
        "user", back_populates="joined_groups"
    )

    # event relationship
    event_ids = Mapped[list[int]] = mapped_column(Integer, ForeignKey("event.id"))
    events: Mapped[list["EventBase"]] = relationship("event", back_populates="group")

    # cost relationship
    cost_ids = Mapped[list[int]] = mapped_column(Integer, ForeignKey("cost.id"))
    costs: Mapped[list["CostBase"]] = relationship("cost", back_populates="group")


# pydantic classes
class User(BaseModel):
    id: int
    name: str
    username: str
    password: str
    email: str
    photo_url: str  # can default to a blank placeholder?

    class Config:
        orm_mode: bool = True


class Event(BaseModel):
    id: int
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


class Group(BaseModel):
    group_id: str
    name: str
    status: str
    expiration: str | None  # is there a better dtype for datetimes in pydantic
    timezone: str  # all events/times in the group should use the reference timezone?
    creator: User
    members: list[User] = []
    events: list[Event] = []
    costs: list[Cost] = []

    class Config:
        orm_mode: bool = True
