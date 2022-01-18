# DATA-GRID    
1. [Project Description](#project-description)
2. [Features](#features)
   - [Sort Data](#sort-data)
   - [Hide Column](#hide-column)
   - [Quick Search](#quick-search)
4. [Requirements](#requirements)
5. [Configuration](#configuration)
   - [Config.json](#configjson)
   - [Data.json](#datajson)
6. [App Memory](#app-memory)
7. [Built with:](#built-with)
## Project Description
Data-Grid app displays given data in a user friendly way by providing multiple displaying options. Number of data-rows and columns to be displayed are flexible and will be created depending on provided data structure. User can display only desired columns and hide some of them, or can display sup-columns as expanded or collapsed, or can assign index numbers to columns to display them in desired order by default, by editing configuration.It is also possible to display data-columns or rows in different orders during usage.
## Features
- ### Sort Data
**SORT DATA** button is used to sort data-rows by header names and display them in ascending or descending order as preferred. New sort options can be added by clicking add button and user can have different sort options as much as the number of headers and easily combine them.
- ### Hide Column
Each columns can be hidden or displayed via **HIDE COLUMN** button. All user needs to do is clicking on the checkbox next to the column name. On each click column display options will toggle and the column will be hidden or displayed that way.
- ### Quick Search
**QUICK SEARCH** is another feature to search needed data-rows depending on user input. Quick search compares each data-cell information with entered input values and displays matched data-rows.
## Requirements
- To run this project you will need:
  - Modern browser like **Google Chrome** or **Firefox**.
- To apply your own datas and config options you will need:
  - A code editor like **Visual Studio Code**.
  - Your own created data and config **json** files which will be mentioned below.
  - Being familiar with **TypeScript**, **JavaScript**, **CSS** and **HTML**.
## Configuration
   To run your own config and datas:
   1. Create your own Data.json and Config.json files explained below.
   2. Go to **`configService.ts`**.
   3. Find **`fetchConfig()`** method.
   4. ```typescript
      return fetch(
      "https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/datasets/dataset-2/config.json"
      )
      ```
      Replace the link with the link of your **`config.json`** file and that's it.
   
   - ### Data.json
   User can create her own json file depending on her data needs. This structure allows to enter also sub-informations so it is possible to create a detailed personalized data structure.
   ```json
    [
     {
      "id": "61ab91f6d3979f169b8364cb",
      "gender": "female",
      "fullName": {
        "firstName": "Jewel",
        "middleName": "Araceli",
        "lastName": "Lowery"
      },
      "birthDate": "1970-06-22T17:58:36.544Z",
      "age": 51,
      "email": "jewel@lowery.com",
      "address": {
        "country": "USA",
        "state": "Connecticut",
        "city": "Dundee",
        "street": "Furman Street",
        "houseNumber": 994
      }
    },
    {
      "id": "61ab91f6919f1f2525b2250d",
      "gender": "female",
      "fullName": {
        "firstName": "Cleo",
        "middleName": "Joann",
        "lastName": "Adkins"
      },
      "birthDate": "1984-01-10T23:38:29.199Z",
      "age": 37,
      "email": "cleo@adkins.com",
      "address": {
        "country": "USA",
        "state": "North Carolina",
        "city": "Taycheedah",
        "street": "Jaffray Street",
        "houseNumber": 283
      }
    }
  ]
   ```
   - ### Config.json
     - **dataUrl:** Here the URL of data.json needs to be added.
     - **columns:** Individual columns are created for each Data.json file object property names. There needs to be a column config description for each of those column names.
       - **id**:
       id values needs to be written the same as Data.json file object property names. 
       - **displayName**:
       It needs to be written the name of column to be displayed here.
       - **type**:
       Type needs to be written in uppercase and type of the data can be a **"STRING"**, **"NUMBER"** or a **"DATE"**.
       - **columnIndex**:
       Order of displayed columns can be arranged by assigning an index number for each column.
       - **visible**:
       Column can be displayed or hidden by default by editing this. "visible" can be **true** or **false**.
       - **summary**:
       Information about sub-datas are displayed here as a summary of them when sup-column is collapsed. It can esaily be personalized by writing id of columns and adding **+** between id names.
       - **collapsed**:
       This is for displaying column expanded or collapsed by default. It can have two values, **true** and **false**.
       - **children**:
       Each child column can have **id**, **displayName**, **type**, **columnIndex** and **visible** properties. children is used to define structure of sub-columns.
     - **sortingRules:**
       - **id**:
       id needs to be id of column to be sorted by default.
       - **direction**:
       direction can be ascencending(**"ASC"**) or descending (**"DESC"**).
   ```json
   {
    "dataUrl": "https://raw.githubusercontent.com/kanow-blog/kanow-school-javascript-basics/master/projects/project-2/datasets/dataset-2/data.json",
    "columns": [
      {
        "id": "id",
        "displayName": "Id",
        "type": "STRING",
        "columnIndex": 0,
        "visible": false
      },
      {
        "id": "fullName",
        "displayName": "Full name",
        "type": "OBJECT",
        "columnIndex": 2,
        "visible": true,
        "summary": "firstName+lastName",
        "collapsed": false,
        "children": [
          {
            "id": "firstName",
            "displayName": "First name",
            "type": "STRING",
            "columnIndex": 0
          }
        ]
      }
    ],
     "sortingRules": [
      {
        "id": "firstName",
        "direction": "ASC"
      },
      {
        "id": "lastName",
        "direction": "DESC"
      }    
    ]
  }
   ```
  ## App Memory
  - **localStorage** is used for saving user options.
  - If user hides some columns and reloads the page, column hiding options will be still the same.
  - If user sorts data-rows and reloads the page, datas will be still sorted.
  - If user expands a column and reloads the page, that column still will be expanded.
  ## Built with:
- TypeScript
- JavaScript
- CSS
- HTML   
