# Import the dependencies.
from flask import Flask, jsonify
from pymongo import MongoClient
from pprint import pprint
from bson.json_util import dumps, loads

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
    """List all available routes."""
    return(f"Welcome to the Home Page, Traveler!<br/>"
           f"-----------------------------------<br/>"
           f"Route: /api/v1.0/state")

#################################################
# Route one
#################################################
@app.route("/api/v1.0/<state>")
def get_state(state):
    client = MongoClient(port=27017)
    db = client.health
    mortality = db.mortality
    query = {"State":state}
    return dumps(list(mortality.find(query)))
    
# Debug mode
if __name__ == "__main__":
    app.run(debug=True)