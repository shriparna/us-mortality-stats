# Dependencies
from flask import Flask, render_template
from pymongo import MongoClient
from bson.json_util import dumps

def get_from_mongo():
    client = MongoClient(port=27017)
    db = client.health
    mortality = db.mortality
    return mortality

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

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
# USA JSON endpoint
#################################################
@app.route("/api/v1.0/usJSON")
def us_json():
    client = MongoClient(port=27017)
    db = client.health
    states = db.states
    query = {}
    fields = {"_id":0}
    result = states.find_one(query,fields)
    return dumps(result)

#################################################
# Map data endpoint
#################################################
@app.route("/api/v1.0/mapdata/<year>")
def map_data(year):
    query = {"Cause Name":"All causes",
             "Year":int(year),
             "State":{"$not":{"$in":["United States"]}}}
    fields = {"_id":0,
              "State":1,
              "Age-adjusted Death Rate":1}
    # result = list(get_from_mongo().find(query,fields))
    match = {"$match":{"Cause Name":"All causes","Year":int(year),"State":{"$not":{"$in":["United States"]}}}}
    alias = { "$project": {"_id": 0,"value": "$Age-adjusted Death Rate","name":"$State"}}
    result = list(get_from_mongo().aggregate([match,alias]))
    return dumps(result)

#################################################
# State data endpoint
#################################################
@app.route("/api/v1.0/<state>")
def get_state(state):
    query = {"State":state}
    fields = {"_id":0}
    result = list(get_from_mongo().find(query,fields))
    return dumps(result)

#################################################
# Render HTML
#################################################
@app.route("/api/v1.0/index/")
def page():
    query = {"Cause Name":"Unintentional injuries",
             "Year":2017}
    result = list(get_from_mongo().find(query).sort("State",1))

    query2 = {"Cause Name":"Unintentional injuries",
              "State":"Alabama"}
    result2 = list(get_from_mongo().find(query2).sort("Year",-1))
    
    states = [x["State"] for x in result]
    years = [x["Year"] for x in result2]

    data1 = [states,years]

    return render_template("index.html",data=data1)

#################################################
# States list endpoint
#################################################
@app.route("/api/v1.0/states_list")
def geo_code():
    query = {"Cause Name":"Unintentional injuries",
             "Year":2017}
    result = get_from_mongo().find(query).sort("State",1)
    states = [x["State"] for x in result]
    return dumps(states)

#################################################
# Years list endpoint
#################################################
@app.route("/api/v1.0/years_list")
def get_years():
    query = {"Cause Name":"Unintentional injuries",
             "State":"Alabama"}
    result = get_from_mongo().find(query).sort("Year",-1)
    years = [x["Year"] for x in result]
    return dumps(years)

#################################################
# Bar data endpoint
#################################################
@app.route("/api/v1.0/bar_data/<state>/<year>")
def get_bar_data(state,year):
    query = {"State":state,
             "Year":int(year),
             "Cause Name":{"$not":{"$in":["All causes"]}}}
    fields = {"_id":0}
    result = list(get_from_mongo().find(query,fields).sort("Age-adjusted Death Rate",1))
    return dumps(result)

#################################################
# Line data endpoint
#################################################
@app.route("/api/v1.0/line")
def get_line():
    query = {"Cause Name":"All causes",
             "State":"Alabama"}
    fields = {"_id":0,
              "Year":1,
              "State":1,
              "Age-adjusted Death Rate":1}
    result = get_from_mongo().find(query,fields).sort("Year",1)
    return dumps(result)

# Debug mode
if __name__ == "__main__":
    app.run(debug=True)