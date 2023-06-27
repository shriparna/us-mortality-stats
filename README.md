# us-mortality-stats
Project 3: us-mortality-stats

# Project 3 : Group 4. US Mortality Stats

### Details of the Project 
###### Name: US Mortality Stats
###### Submission Date: 6/26/2023
###### Presentation Date: 6/27/2023

### Team
###### [Vinayak Shankar](https://github.com/VinnyShankar), [Shridhar Kamat](https://github.com/shriparna), [Cecilia Rosete](https://github.com/CiciRose), [Nolan Tonthat](https://github.com/Nolan-Tonthat), [Irfan Senyurt](https://github.com/sncrsenyurt), [Ahmed Abousamra](https://github.com/AbousamraEd)
<hr>

## Project Specification:
#### Tech Stack
- Database: MongoDB (NoSQL)
- API: Python Flask
- Front-end: HTML, CSS, JavaScript
- Visuals: ECharts

#### Flow
- We are using local MongoDB connectivity to load the US Mortality data from CDC for 18 years from 1999 to 2017.
- We are using Flask to create our routes to access the MongoDB to retrieve data from MongoDB
- Using HTML/CSS/JavaScript we populate the data fetched from MondoDB to render the four visualization plots using ECharts
- We have included a Bonus script to show the Matrix effect

#### Package Contents:
- [Code](https://github.com/shriparna/us-mortality-stats/tree/main/Code) - Directory to store all the code
   - [database_setup.py](https://github.com/shriparna/us-mortality-stats/blob/feat_vs/Code/database_setup.py) - Python script to get the data from .csv file (extracted from CDC website) and populate in the MongoDB
   - [flask_v2.py](https://github.com/shriparna/us-mortality-stats/blob/feat_vs/Code/flask_v2.py) - Python file to define different API routes using Flask
   - [static](https://github.com/shriparna/us-mortality-stats/tree/main/Code/static) - This folder contains the css stylesheet and JavaScript code
        - [css](https://github.com/shriparna/us-mortality-stats/tree/main/Code/static/css) - Directory to store stylesheet files
            - [style.css](https://github.com/shriparna/us-mortality-stats/blob/main/Code/static/css/style.css) - Main Stylesheet file 
            - [bonus.css](https://github.com/shriparna/us-mortality-stats/blob/main/Code/static/css/bonus.css) - Bonus Stylesheet for the Matrix
        - [js](https://github.com/shriparna/us-mortality-stats/tree/main/Code/static/js) -  Directory to store the JavaScript files
            - [app.js](https://github.com/shriparna/us-mortality-stats/blob/main/Code/static/js/app.js) - Main JavaScript file to dynamically render the visuals by calling other JavaScripts
            - [usmap.js](https://github.com/shriparna/us-mortality-stats/blob/main/Code/static/js/usmap.js) - JavaScript which plots US map and dynamically render with Year dropdown
            - [hbars.js](https://github.com/shriparna/us-mortality-stats/blob/main/Code/static/js/hbars.js) - JavaScript which plots horizontal bars and dynamically render with Year and State dropdown 
            - [boxplot.js](https://github.com/shriparna/us-mortality-stats/blob/main/Code/static/js/boxplot.js) - JavaScript to render the static boxplot plot for all US States from 1999 till 2017
            - [lines.js](https://github.com/shriparna/us-mortality-stats/blob/main/Code/static/js/lines.js) - Javascript to render the static lines plot to show all the cause of deaths across all states from 1999 till 2017
            - [bonus.js](https://github.com/shriparna/us-mortality-stats/blob/main/Code/static/js/bonus.js) - Bonus JavaScript for the Matrix
   - [templates](https://github.com/shriparna/us-mortality-stats/tree/main/Code/templates) - Directory to store the main index file
        - [index.html](https://github.com/shriparna/us-mortality-stats/blob/main/Code/templates/index.html) - Main html file to display the dashboard
        - [bonus.html](https://github.com/shriparna/us-mortality-stats/blob/main/Code/templates/bonus.html) - Bonus JavaScript to display the Matrix effect
- [Data](https://github.com/shriparna/us-mortality-stats/tree/main/Data) - Direcotry to store all data files
    - [NCHS_-_Leading_Causes_of_Death__United_States.csv](https://github.com/shriparna/us-mortality-stats/blob/main/Data/NCHS_-_Leading_Causes_of_Death__United_States.csv) - Main data file from CDC
    - [stats.json](https://github.com/shriparna/us-mortality-stats/blob/main/Data/stats.json) - Json file to get all the stats data
    - [us-states.json](https://github.com/shriparna/us-mortality-stats/blob/main/Data/us-states.json) - Json file to get all the us-states data
- [Presentation](https://github.com/shriparna/us-mortality-stats/tree/main/Presentation) - Directory to store presentation
    - [project_03_group_04.pptx](https://github.com/shriparna/us-mortality-stats/blob/main/Presentation/project_03_group_04.pptx) Presentation file

<hr>

## Visuals:

1. Map Plot
![State Death Rates_ All Causes - 2017_ (per 100,000 population)](https://github.com/shriparna/us-mortality-stats/assets/71340748/022ec2e6-a9c7-4520-bd0c-1345dc8627a4)

2. Horizontal Bar Plot
![Screenshot 2023-06-27 at 12 53 32 PM](https://github.com/shriparna/us-mortality-stats/assets/71340748/519551f1-9bee-432f-b51e-dd84bf5d253b)

3. Box Plot
![Screenshot 2023-06-27 at 1 40 08 PM](https://github.com/shriparna/us-mortality-stats/assets/71340748/df8b478d-259d-454a-86b5-05ba56f1e838)

4. Lines Plot
![Screenshot 2023-06-27 at 12 47 27 PM](https://github.com/shriparna/us-mortality-stats/assets/71340748/af850c9b-5560-43ea-b6eb-0ec32e6e97c8)

<hr>

## Instructions:

- Our Dashboard is deployed on the route http://127.0.0.1:5000
- Use drop down for State and Year to dynamically change the bar plot
- The map shows death rate across state and dynamically change with the Year dropdown
- The boxplot shows the death rates across all states from 1999 to 2017
- The line chart the death rates across US for all the causes from 1999 tol 2017
- The bonus route (http://127.0.0.1:5000/api/v1.0/thematrix) will show the Matrix effect

<hr>
