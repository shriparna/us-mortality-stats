# Dependencies
import pandas as pd
import os

# Read csv
csv_file = "../Data/NCHS_-_Leading_Causes_of_Death__United_States.csv"
df = pd.read_csv(csv_file)

# Remove commas from numerical columns
df[["Deaths","Age-adjusted Death Rate"]] = df[["Deaths","Age-adjusted Death Rate"]].\
                                           apply(lambda x: x.str.replace(",",""))

# Change data types
df["Deaths"] = df["Deaths"].astype("int64")
df["Age-adjusted Death Rate"] = df["Age-adjusted Death Rate"].astype("float64")

# Save DataFrame to json
json_output = "../Data/stats.json"
output = df.to_json(json_output, indent = 1, orient = "records")

# Import json files into MongoDB
os.system("mongoimport --type json -d health -c mortality --drop --jsonArray ../Data/stats.json")
os.system("mongoimport --type json -d health -c states --drop ../Data/us-states.json")
