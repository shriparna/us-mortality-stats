# Import the dependencies.
from flask import Flask
from pymongo import MongoClient
from bson.json_util import dumps
import json

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
# app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True

#################################################
# Root endpoint
#################################################
@app.route("/")
def welcome():
    """List all available routes."""
    return(f"Welcome to the Home Page, Traveler!<br/>"
           f"-----------------------------------<br/>"
           f"States: /api/v1.0/state")

#################################################
# Route one
#################################################
@app.route("/api/v1.0/<state>")
def get_state(state):
    client = MongoClient(port=27017)
    db = client.health
    mortality = db.mortality
    query = {"State":state}
    result = list(mortality.find(query))
    return json.loads(dumps(result))
    # return current_app.response_class(dumps(result),mimetype="application/json")
    # return dumps(mortality.find(query))
    
# Debug mode
if __name__ == "__main__":
    app.run(debug=True)