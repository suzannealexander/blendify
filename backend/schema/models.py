from base_models import UserBase, EventBase, CostBase, GroupBase


# define top-level pydantic classes *with* relations
# based on the approach used here: https://www.gormanalysis.com/blog/many-to-many-relationships-in-fastapi/
class User(UserBase):
    # relationships
    owned_groups: list[GroupBase]
    joined_groups: list[GroupBase]

    events: list[EventBase]

    costs: list[CostBase]
    receipts: list[CostBase]


class Event(EventBase):
    # relationships
    # user relationship
    member_ids: list[int]
    members: list[UserBase]

    # group relationship
    group_id: int
    group: GroupBase


class Cost(CostBase):
    # relationships
    recipient_id: int
    recipient: UserBase

    sender_ids: list[int]
    senders: list[UserBase]

    # group relationship
    group_id: int
    group: GroupBase


class Group(GroupBase):
    # relationships
    # creator relationship
    creator_id: int
    creator: UserBase

    # member relationship
    member_ids: list[int]
    members: list[UserBase]

    # event relationship
    event_ids: list[int]
    events: list[EventBase]

    # cost relationship
    cost_ids: list[int]
    costs: list[CostBase]
