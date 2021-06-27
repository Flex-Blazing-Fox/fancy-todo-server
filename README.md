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
<br/>

<img src=https://img.shields.io/badge/POST-%2Fuser%2Fregister-blueviolet width=162.5/>
<br/>
<br/>

- ### Request Body
- ### Request Example
- ### Response Example

<br/>
<img src=https://img.shields.io/badge/POST-%2Fuser%2Flogin-blueviolet width=143>
<br/>
<br/>

- ### Request Body
- ### Request Example
- ### Response Example

<br/>
<img src=https://img.shields.io/badge/GET-%2Ftodo-blue width=99>
<br/>
<br/>

- ### Request Example
- ### Response Example

<br/>
<img src=https://img.shields.io/badge/GET-%2Ftodo%2F%3Aid-blue width=119>
<br/>
<br/>

- ### Request Parameter
- ### Request Example
- ### Response Example

<br/>
<img src=https://img.shields.io/badge/POST-%2Ftodo-blue width=101.5>
<br/>
<br/>

- ### Request Body
- ### Request Example
- ### Response Example

<br/>
<img src=https://img.shields.io/badge/PUT-%2Ftodo%2F%3Aid-blue width=122>
<br/>
<br/>

- ### Request Parameter
- ### Request Body
- ### Request Example
- ### Response Example

<br/>
<img src=https://img.shields.io/badge/PATCH-%2Ftodo%2F%3Aid-blue width=140>
<br/>
<br/>

- ### Request Parameter
- ### Request Body
- ### Request Example
- ### Response Example

<br/>
<img src=https://img.shields.io/badge/DELETE-%2Ftodo%2F%3Aid-blue width=145>
<br/>
<br/>

- ### Request Parameter
- ### Request Body
- ### Request Example
- ### Response Example

<br/>
