from django.shortcuts import render
from django.http import JsonResponse

from schema.alchemy_models import EventAlchemy
import datetime


# Create your views here.
def add_event_to_household(request):
    # TODO: Ask frontend how request JSON will look
    # TODO: Add verification of expected data

    if request.method == "POST":
        event = EventAlchemy(
            id=request["event_id"],
            name=request["event_name"],
            first_date=datetime.date.today(),
            first_time=datetime.datetime.now().time(),
            repeat_every=request["repeat_every"],
            group_id=request["group_id"],
            # TODO: Query for group name, members, and member ids, add to Event
        )

        # TODO: Add Event to Group/Household

        # TODO: Ask what frontend needs on return
        return JsonResponse({"success": True}, status=200)

    return JsonResponse({"success": False}, status=405)
