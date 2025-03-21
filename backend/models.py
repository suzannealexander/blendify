from pydantic import BaseModel
from datetime import datetime, date, time
from sqlalchemy import (
    create_engine,
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
class AlchemyBase(DeclarativeBase):
    pass


class UserAlchemy(AlchemyBase):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(40), nullable=False)  # length okay?
    username: Mapped[str] = mapped_column(String(40), nullable=False)
    # werkzeug.security generates 162 length hashes, modify with whatever we end up using
    password: Mapped[str] = mapped_column(String(162), nullable=False)
    email: Mapped[str] = mapped_column(String(60), nullable=False)  # length okay?
    photo_url: Mapped[str] = mapped_column(String(60), nullable=False, default="None")

    # relationships
    owned_groups: Mapped[list["GroupAlchemy"]] = relationship(back_populates="creator")
    joined_groups: Mapped[list["GroupAlchemy"]] = relationship(back_populates="members")

    events: Mapped[list["EventAlchemy"]] = relationship(back_populates="members")

    costs: Mapped[list["CostAlchemy"]] = relationship(back_populates="senders")
    receipts: Mapped[list["CostAlchemy"]] = relationship(back_populates="recipient")


class EventAlchemy(AlchemyBase):
    __tablename__ = "event"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    first_date: Mapped[date] = mapped_column(Date, nullable=False)
    first_time: Mapped[time] = mapped_column(Time, nullable=False)
    repeat_every: Mapped[str] = mapped_column(String(40))

    # user relationship
    member_ids: Mapped[list[int]] = mapped_column(Integer, ForeignKey("user.id"))
    members: Mapped[list["UserAlchemy"]] = relationship("user", back_populates="events")

    # group relationship
    group_id: Mapped[int] = mapped_column(Integer, ForeignKey("group.id"))
    group: Mapped["GroupAlchemy"] = relationship("group", back_populates="events")


class CostAlchemy(AlchemyBase):
    __tablename__ = "cost"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    category: Mapped[str] = mapped_column(String(40))
    amount: Mapped[float] = mapped_column(Float, nullable=False)

    # missing anything to track resolution of the cost
    # will need to track amount paid per user or similar

    # user relationship
    recipient_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    recipient: Mapped["UserAlchemy"] = relationship("user", back_populates="receipts")

    sender_ids: Mapped[list[int]] = mapped_column(Integer, ForeignKey("user.id"))
    senders: Mapped[list["UserAlchemy"]] = relationship("user", back_populates="costs")

    # group relationship
    group_id: Mapped[int] = mapped_column(Integer, ForeignKey("group.id"))
    group: Mapped["GroupAlchemy"] = relationship("group", back_populates="costs")


class GroupAlchemy(AlchemyBase):
    __tablename__ = "group"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(60), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False)
    expiration: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    timezone: Mapped[str] = mapped_column(
        String(30), nullable=False
    )  # all events/times in the group should use the reference timezone?

    # creator relationship
    creator_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    creator: Mapped["UserAlchemy"] = relationship("user", back_populates="owned_groups")

    # member relationship
    member_ids: Mapped[list[int]] = mapped_column(Integer, ForeignKey("user.id"))
    members: Mapped[list["UserAlchemy"]] = relationship(
        "user", back_populates="joined_groups"
    )

    # event relationship
    event_ids: Mapped[list[int]] = mapped_column(Integer, ForeignKey("event.id"))
    events: Mapped[list["EventAlchemy"]] = relationship("event", back_populates="group")

    # cost relationship
    cost_ids: Mapped[list[int]] = mapped_column(Integer, ForeignKey("cost.id"))
    costs: Mapped[list["CostAlchemy"]] = relationship("cost", back_populates="group")


# define base pydantic classes without relations
class UserBase(BaseModel):
    id: int
    name: str
    username: str
    password: str
    email: str
    photo_url: str

    class Config:
        orm_mode: bool = True


class EvenBase(BaseModel):
    id: int
    name: str
    first_date: str
    first_time: str
    repeat_every: str | None

    class Config:
        orm_mode: bool = True


class CostBase(BaseModel):
    id: int
    name: str
    category: str
    amount: str

    class Config:
        orm_mode: bool = True


class GroupBase(BaseModel):
    id: str
    name: str
    status: str
    expiration: str | None  # is there a better dtype for datetimes in pydantic?
    timezone: str  # all events/times in the group should use the reference timezone?

    class Config:
        orm_mode: bool = True


if __name__ == "__main__":
    # instantiate the engine
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        future=True,
        echo=True,
        connect_args={"check_same_thread": False},
    )

    # create all tables using it
    AlchemyBase.metadata.create_all(engine)
