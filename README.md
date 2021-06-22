# fancy-todo-server

fancy-todo-server

# Dokumentasi API Todo App

### Fancy Todo

#### HTTP Request
***Base URL:***
```
http://127.0.0.1:3000
```
#### Show All Todos
- ***URL:***
```
http://127.0.0.1:3000/todos
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
http://127.0.0.1:3000/todos
```

- ***METHOD:***
```
POST
```

- ***PARAMS:***
```
none
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
- ***ERROR RESPONSE:***
```
code: 500
```