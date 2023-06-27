# us-mortality-stats
Project 3: us-mortality-stats

# Project 3 : Group 4, US Mortality Stats

### Details of the Project 
###### Name: US Mortality Stats
###### Date: 6/27/2023
###### Presentation: 6/27/2023

### Team
###### [Vinayak Shankar](https://github.com/VinnyShankar), [Shridhar Kamat](https://github.com/shriparna), [Cecilia Rosete](https://github.com/CiciRose), [Nolan Tonthat](https://github.com/Nolan-Tonthat), [Irfan Senyurt](https://github.com/sncrsenyurt), [Ahmed Abousamra](https://github.com/AbousamraEd)
<hr>

## Project Specification:
#### Tech Stack
- Database: MongoDB (NoSQL)
- API: Python Flask
- Front-end: HTML, CSS, JavaScript
- Visuals: echarts, Plotly

#### Flow
- We are using local MongoDB connectivity to load the US Mortality data from CDC for 18 years from 1999 to 2017.
- We are using Flask to create our routes to access the MongoDB to retrieve data from MongoDB
- Using HTML/CSS/JavaScript we populate the data fetched from MondoDB to render the three visualization plots

#### Package Contents:
- [Code](https://github.com/shriparna/us-mortality-stats/tree/main/Code) - Directory to store all the code
   - [csv_to_json.ipynb](https://github.com/shriparna/us-mortality-stats/blob/main/Code/csv_to_json.ipynb) - Jupyter notebook to connect to the CDC website and get the data and populate in the MongoDB
   - [flask_v1.py](https://github.com/shriparna/us-mortality-stats/blob/main/Code/flask_v1.py) - Python file to define different API routes using Flask
   - [images](https://github.com/shriparna/us-mortality-stats/tree/main/Code/images) - Image files which displayed using html
        - [ucb_logo.PNG](https://github.com/shriparna/us-mortality-stats/blob/main/Code/images/ucb_logo.PNG) - UCB Logo file
        - [edx_logo.PNG](https://github.com/shriparna/us-mortality-stats/blob/main/Code/images/edx_logo.PNG) - edX logo file
        - [cdc_logo.PNG](https://github.com/shriparna/us-mortality-stats/blob/main/Code/images/cdc_logo.PNG) - CDC logo file
   - [static](https://github.com/shriparna/us-mortality-stats/tree/main/Code/static) - This folder contains the css stylesheet and JavaScript code
        - [css](https://github.com/shriparna/us-mortality-stats/tree/main/Code/static/css) - Directory to store stylesheet files
            - [style.css](https://github.com/shriparna/us-mortality-stats/blob/main/Code/static/css/style.css) - Main Stylesheet file 
        - [js](https://github.com/shriparna/us-mortality-stats/tree/main/Code/static/js) -  Directory to store the JavaScript files
            - [app.js](https://github.com/shriparna/us-mortality-stats/blob/main/Code/static/js/app.js) - Main JavaScript file to dynamically render the visuals
   - [templates](https://github.com/shriparna/us-mortality-stats/tree/main/Code/templates) - Directory to store the main index file
        - [index.html](https://github.com/shriparna/us-mortality-stats/blob/main/Code/templates/index.html) - Main html file to drive
- [Data](https://github.com/shriparna/us-mortality-stats/tree/main/Data) - Direcotry to store all data files
    - [NCHS_-_Leading_Causes_of_Death__United_States.csv](https://github.com/shriparna/us-mortality-stats/blob/main/Data/NCHS_-_Leading_Causes_of_Death__United_States.csv) - Main data file from CDC
    - [statesData.js](https://github.com/shriparna/us-mortality-stats/blob/main/Data/statesData.js) - JavaScript to get all the states data
    - [statesData.json](https://github.com/shriparna/us-mortality-stats/blob/main/Data/statesData.json) - Json file to get all the states data
    - [stats.json](https://github.com/shriparna/us-mortality-stats/blob/main/Data/stats.json) - Json file to get all the stats data
    - [us-states.json](https://github.com/shriparna/us-mortality-stats/blob/main/Data/us-states.json) - Json file to get all the us-states data
- [Presentation](https://github.com/shriparna/us-mortality-stats/tree/main/Presentation) - Directory to store presentation
    - [DEATH.pptx](https://github.com/shriparna/us-mortality-stats/blob/main/Presentation/DEATH.pptx) Presentation file

<hr>

## Visuals:

1. Map Plot
![Screenshot 2023-06-22 at 9 35 21 PM](https://github.com/shriparna/us-mortality-stats/assets/71340748/b31130de-0dea-4ee2-9743-5be4a03592e5)

2. Bar Plot
![Screenshot 2023-06-22 at 9 35 40 PM](https://github.com/shriparna/us-mortality-stats/assets/71340748/3fb60c68-a407-4597-a0c1-aba3cdb190b2)

3. Line Plot
![Screenshot 2023-06-22 at 9 35 51 PM](https://github.com/shriparna/us-mortality-stats/assets/71340748/70051604-49be-4b47-801a-dda0acccfc61)

<hr>

## Instructions:

- Our HTML is deployed on the route http://127.0.0.1:5000/api/v1.0/index/
- Use drop down for State and Year to dynamically change the bar plot
- The map shows 2017 death rate
- The line chart shows (pending)

<hr>

