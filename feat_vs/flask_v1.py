# Dependencies
from flask import Flask, render_template
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
           f"States: /api/v1.0/state<br/>"
           f"HMTL: /api/v1.0/index/<br/>"
           f"Data: /api/v1.0/states_list")

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

#################################################
# Route two
#################################################
@app.route("/api/v1.0/index/")
def page():
    client = MongoClient(port=27017)
    db = client.health
    mortality = db.mortality
    query = {"Cause Name":"Unintentional injuries",
             "Year":2017}
    result = list(mortality.find(query).sort("State",1))
    states = [x["State"] for x in result]
    return render_template("index.html",data=states)

#################################################
# Data endpoint
#################################################
@app.route("/api/v1.0/states_list")
def geo_code():
    client = MongoClient(port=27017)
    db = client.health
    mortality = db.mortality
    query = {"Cause Name":"Unintentional injuries",
             "Year":2017}
    result = list(mortality.find(query).sort("State",1))
    states = [x["State"] for x in result]
    return states

#################################################
# Bar data endpoint
#################################################
@app.route("/api/v1.0/bar_data")
def get_bar_data():
    client = MongoClient(port=27017)
    db = client.health
    mortality = db.mortality
    query = {"State":"Alabama",
             "Year":2017}
    result = list(mortality.find(query))
    return json.loads(dumps(result))

# Debug mode
if __name__ == "__main__":
    app.run(debug=True)