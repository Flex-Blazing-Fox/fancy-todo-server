# Fancy Todo

## Usage

- ### Development Version
    The resource for already deployed development version is https://fancy-todo-dev.herokuapp.com. 

- ### Sandbox Version
    If you want to play with the sandbox or contributing, the steps are:
    1. Clone the repo from `git@github.com:ranggarppb/fancy-todo-server.git`
    2. Make sure the folder structures are like this
        <pre>
            .
            ├── Procfile
            ├── README.md
            ├── config
            ├── controllers
            ├── database
            ├── helpers
            ├── index.js
            ├── middlewares
            ├── migrations
            ├── models
            ├── node_modules
            ├── package-lock.json
            ├── package.json
            ├── routers
            ├── seeders
            ├── test
            ├── test.http
            └── views
        </pre>
    3. Run `npm run dev` in your terminal and try hitting the endpoints below with the main resource is `http://localhost:3000` (you can use test.http file if you dont want to move to Postman or terminal)
    4. We have **pre-commit** hook to automatically do **unit testing** before doing commit so make sure they are all passed
    5. Making **Pull Request** also will trigger the **Github CI Workflow** so all Pull Request must be verified first

## Endpoints
The resource for the endpoint is https://fancy-todo-dev.herokuapp.com or http://localhost:3000. You can use either Postman, curl, or REST API Client

<img src=https://img.shields.io/badge/POST-%2Fuser%2Fregister-blueviolet width=162.5/>
<br/>

Registering your email and password
- ### Request Body
    ```javascript
    {
        "email": "user6@gmail.com",
        "password": "user6"
    }
    ```
- ### Response Example
    ```
    {
        "id": 4,
        "email": "user6@gmail.com",
        "password": "$2b$10$JC7p4S6bZj.dtnHKMkGspOMn4ojnC5QU.CT3ApT7pr7v3g4ZroYOa",
        "updatedAt": "2021-06-28T12:04:30.390Z",
        "createdAt": "2021-06-28T12:04:30.390Z"
    }
    ```
<br/>
<img src=https://img.shields.io/badge/POST-%2Fuser%2Flogin-blueviolet width=143>
<br/>

Login your email and password
- ### Request Body
    ```javascript
    {
        "email": "user1@gmail.com",
        "password": "user1"
    }
    ```
- ### Response Example
    ```javascript
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0"
    }
    ```
The access_token will be used for create, put, patch, and delete
<br/>
<img src=https://img.shields.io/badge/GET-%2Ftodo-blue width=99>
<br/>

Get all todo list that you've made 
-   ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
-   ### Response Example
    ```javascript
    [
        {
            "id": 1,
            "title": "Truncating Saved Accounts Data",
            "description": "After the fix for different accrued interest is merged, the dwh core saving accounts need to be merged.",
            "status": "done",
            "due_date": "2021-07-01T00:00:00.000Z",
            "createdAt": "2021-06-27T04:58:20.839Z",
            "updatedAt": "2021-06-27T07:26:32.765Z",
            "user_id": 1
        },
        {
            "id": 2,
            "title": "Prevent Dying DAGS from Exceeding Concurrent Query Limit in BigQuery",
            "description": "Add retries to all of DAGs and change the query default mode to batching. Only provide the interactive mode if the developer need it.",
            "status": "to code",
            "due_date": "2021-06-23T06:00:00.000Z",
            "createdAt": "2021-06-27T04:58:20.839Z",
            "updatedAt": "2021-06-27T04:58:20.839Z",
            "user_id": 1
        }
    ]
    ```
<br/>
<img src=https://img.shields.io/badge/GET-%2Ftodo%2F%3Aid-blue width=119>
<br/>

Get todo with certain id (only if it's the todo that you've created)
- ### Request Parameter
    The parameter for this API is `{id}`. For example we use `id = 2` for `user1@gmail.com`
- ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
- ### Response Example
    ```javascript
    {
        "id": 2,
        "title": "Prevent Dying DAGS from Exceeding Concurrent Query Limit in BigQuery",
        "description": "Add retries to all of DAGs and change the query default mode to batching. Only provide the interactive mode if the developer need it.",
        "status": "to code",
        "due_date": "2021-06-23T06:00:00.000Z",
        "createdAt": "2021-06-27T04:58:20.839Z",
        "updatedAt": "2021-06-27T04:58:20.839Z",
        "user_id": 1
    }
    ```
<br/>
<img src=https://img.shields.io/badge/POST-%2Ftodo-blue width=101.5>
<br/>

Make new todo
- ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
- ### Request Body
    ```javascript
    {
        "title": "Example Title",
        "description": "Example Description",
        "status": "to execute",
        "due_date": "2021-07-03 12:00:00"
    }
    ```
- ### Response Example
    ```javascript
    {
        "id": 4,
        "title": "Example Title",
        "description": "Example Description",
        "status": "to execute",
        "due_date": "2021-07-03T12:00:00.000Z",
        "user_id": 1,
        "updatedAt": "2021-06-28T12:30:00.014Z",
        "createdAt": "2021-06-28T12:30:00.014Z"
    }
    ```
<br/>
<img src=https://img.shields.io/badge/PUT-%2Ftodo%2F%3Aid-blue width=122>
<br/>

Updating the todo record
- ### Request Parameter
    The parameter for this API is `{id}`. For example we use `id = 2` for `user1@gmail.com`
- ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
- ### Request Body
    ```javascript
    {
        "title": "adfasdf",
        "description": "asdfasdfasdfasdf",
        "status": "to plan",
        "due_date": "2021-06-30 00:00:00"
    }
    ```
- ### Response Body
    ```javascript
    {
        "id": 2,
        "title": "adfasdf",
        "description": "asdfasdfasdfasdf",
        "status": "to plan",
        "due_date": "2021-06-30T00:00:00.000Z",
        "createdAt": "2021-06-27T04:58:20.839Z",
        "updatedAt": "2021-06-28T12:45:09.327Z",
        "user_id": 1
    }
    ```
<br/>
<img src=https://img.shields.io/badge/PATCH-%2Ftodo%2F%3Aid-blue width=140>
<br/>

Updating the todo's value
- ### Request Parameter
    The parameter for this API is `{id}`. For example we use `id = 1` for `user1@gmail.com`
- ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
- ### Request Body
    ```javascript
    {
        "due_date": "2021-08-31 00:00:00"
    }
    ```
- ### Response Example
    ```javascript
    {
        "id": 1,
        "title": "Truncating Saved Accounts Data",
        "description": "After the fix for different accrued interest is merged, the dwh core saving accounts need to be merged.",
        "status": "done",
        "due_date": "2021-08-31T00:00:00.000Z",
        "createdAt": "2021-06-27T04:58:20.839Z",
        "updatedAt": "2021-06-28T12:49:52.917Z",
        "user_id": 1
    }
    ```
<br/>
<img src=https://img.shields.io/badge/DELETE-%2Ftodo%2F%3Aid-blue width=145>
<br/>

Delete a todo record
- ### Request Parameter
    The parameter for this API is `{id}`. For example we use `id = 2` for `user1@gmail.com`
- ### Request Header
    ```javascript
    {
        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODgyMzE3fQ.Smeq6lZPxFWHOaBtX3Q3tMP1wbxCZX5QDyGauoai5L0
    }
    ```
- ### Response Example
    ```javascript
    {
        "message": "Record with id 2 successfully deleted"
    }
    ```
