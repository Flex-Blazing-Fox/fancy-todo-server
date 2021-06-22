# fancy-todo-server

fancy-todo-server

# Dokumentasi API Todo App

### Fancy Todo
#### Database
```
todo_db
```
#### Package
```
pg, express, sequelize, nodemon
```

#### Migration
```
sequelize db:migrate
sequelize db:seed:all
```

#### Run Dev
```
npm run dev
```

#### HTTP Request
***Base URL:***
```
http://127.0.0.1:3000
```
#### Show All Todos
- ***URL:***
```
/todos
```

- ***METHOD:***
```
GET
```

- ***PARAMS:***
```
none
```

- ***SUCCESS RESPONSE:***
```code 200
[
    {
        "id": 1,
        "title": "Test",
        "desc": "Test Todo App",
        "status": "On Progress",
        "due_date": "2021-06-30T00:00:00.000Z",
        "createdAt": "2021-06-21T23:22:02.155Z",
        "updatedAt": "2021-06-21T23:22:02.155Z"
    }
]
```
- ***ERROR RESPONSE:***
```
code: 500
```

#### Add Todo
- ***URL:***
```
/todos
```

- ***METHOD:***
```
POST
```

- ***PARAMS:***
```
none
```

- ***BODY:***
```
title, desc, status, due_date
```

- ***SUCCESS RESPONSE:***
```code: 201
[
    {
        "id": 4,
        "title": "tes2",
        "status": "new",
        "desc": "tes CRUD"
        "due_date": "2021-06-22T00:00:00.000Z",
        "updatedAt": "2021-06-22T01:35:37.476Z",
        "createdAt": "2021-06-22T01:35:37.476Z"
    }
]
```

- ***ERROR VALIDATION:***
```
code: 400
message : "DueDate Cannot Previus Date"
```

- ***ERROR RESPONSE:***
```
code: 500
```

#### Read Detail
- ***URL:***
```
/todos/:id
```

- ***METHOD:***
```
GET
```

- ***PARAMS:***
```
id
```

- ***SUCCESS RESPONSE:***
```code: 201
[
    {
        "id": 4,
        "title": "tes2",
        "status": "new",
        "desc": "tes CRUD"
        "due_date": "2021-06-22T00:00:00.000Z",
        "updatedAt": "2021-06-22T01:35:37.476Z",
        "createdAt": "2021-06-22T01:35:37.476Z"
    }
]
```
- ***NO RESULT:***
```
code: 404
message: Todo Not Found
```

- ***ERROR RESPONSE:***
```
code: 500
```

#### UPDATE ALL
- ***URL:***
```
/todos/:id
```

- ***METHOD:***
```
PUT
```

- ***PARAMS:***
```
id
```

- ***BODY:***
```
title, desc, status, due_date
```

- ***SUCCESS RESPONSE:***
```code: 201
[
    {
        "id": 4,
        "title": "tes3",
        "status": "on progress",
        "desc": "tes CRUD"
        "due_date": "2021-06-23T00:00:00.000Z",
        "updatedAt": "2021-06-22T01:35:37.476Z",
        "createdAt": "2021-06-22T01:35:37.476Z"
    }
]
```
- ***NO RESULT:***
```
code: 404
message: Todo Not Found
```

- ***ERROR VALIDATION:***
```
code: 400
message : "DueDate Cannot Previus Date"
```

- ***ERROR RESPONSE:***
```
code: 500
```

#### UPDATE STATUS
- ***URL:***
```
/todos/:id
```

- ***METHOD:***
```
PATCH
```

- ***PARAMS:***
```
id
```

- ***BODY:***
```
status
```

- ***SUCCESS RESPONSE:***
```code: 201
[
    {
        "id": 4,
        "title": "tes3",
        "status": "on progress",
        "desc": "tes CRUD"
        "due_date": "2021-06-23T00:00:00.000Z",
        "updatedAt": "2021-06-22T01:35:37.476Z",
        "createdAt": "2021-06-22T01:35:37.476Z"
    }
]
```
- ***NO RESULT:***
```
code: 404
message: Todo Not Found
```

- ***ERROR RESPONSE:***
```
code: 500
```


#### DELETE
- ***URL:***
```
/todos/:id
```

- ***METHOD:***
```
delete
```

- ***PARAMS:***
```
id
```

- ***SUCCESS RESPONSE:***
```code: 201
message: Success deleted todo
```
- ***NO RESULT:***
```
code: 404
message: Todo Not Found
```

- ***ERROR RESPONSE:***
```
code: 500
```