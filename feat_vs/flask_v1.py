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
           f"Data: /api/v1.0/states_list<br/>"
           f"Years: /api/v1.0/years_list<br/>"
           f"Bar Data: /api/v1.0/bar_data/state/year")

#################################################
# State data endpoint
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
# Render HTML
#################################################
@app.route("/api/v1.0/index/")
def page():
    client = MongoClient(port=27017)
    db = client.health
    mortality = db.mortality
    query = {"Cause Name":"Unintentional injuries",
             "Year":2017}
    result = list(mortality.find(query).sort("State",1))

    query2 = {"Cause Name":"Unintentional injuries",
              "State":"Alabama"}
    result2 = list(mortality.find(query2).sort("Year",-1))
    
    states = [x["State"] for x in result]
    years = [x["Year"] for x in result2]

    data1 = [states,years]

    return render_template("index.html",data=data1)

#################################################
# States list endpoint
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
# Years list endpoint
#################################################
@app.route("/api/v1.0/years_list")
def get_years():
    client = MongoClient(port=27017)
    db = client.health
    mortality = db.mortality
    query = {"Cause Name":"Unintentional injuries",
             "State":"Alabama"}
    result = list(mortality.find(query).sort("Year",-1))
    years = [x["Year"] for x in result]
    return years

#################################################
# Bar data endpoint
#################################################
@app.route("/api/v1.0/bar_data/<state>/<year>")
def get_bar_data(state,year):
    client = MongoClient(port=27017)
    db = client.health
    mortality = db.mortality
    query = {"State":state,
             "Year":int(year),
             "Cause Name":{"$not":{"$in":["All causes"]}}}
    result = list(mortality.find(query).sort("Deaths",1))
    return json.loads(dumps(result))

# Debug mode
if __name__ == "__main__":
    app.run(debug=True)