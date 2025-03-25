import flask
from schema.alchemy_models import EventAlchemy
import datetime

app = flask.Flask(__name__)


@app.route("/add_event_to_household")
def add_event_to_household():
    # TODO: Ask frontend how this will look
    data = flask.request.json

    # TODO: Add verification of expected data
    if True:
        event = EventAlchemy(
            id=data["event_id"],
            name=data["event_name"],
            first_date=datetime.date.today(),
            first_time=datetime.datetime.now().time(),
            repeat_every=data["repeat_every"],
            group_id=data["group_id"],
            # TODO: Query for group name, members, and member ids, add to Event
        )

        # TODO: Add Event to Group/Household

        # TODO: Ask what frontend needs on return
        return flask.jsonify({"success": True})

    return flask.jsonify({"success": False})


app.run(debug=True)
