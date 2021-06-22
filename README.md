# **Todo App**
---
### Initial Setup
```
npm install
```

### Database Setup
```
sequelize db:migrate
sequelize db:seed:all
```

### Run Application 
```
npm run dev
```
Base URL : 
```
http://127.0.0.1:3000
```

### **<span style="color:green">GET</span> / Show All Todos**

- **URL**

    ```
    /todos
    ```

- **Method**

    ```
    GET 
    ```

- **URL Params**
    ```
    None
    ```
- Success Response :
    ```json
    {
        "code": 200,
        "message": "Success",
        "data": [
            {
                "id": 1,
                "title": "Create Aplikasi",
                "description": "Create Aplikasi Fancy Todo",
                "status": "selesai",
                "due_date": "2020-06-21T00:00:00.000Z",
                "createdAt": "2021-06-22T13:59:36.105Z",
                "updatedAt": "2021-06-22T13:59:36.105Z"
            }
        ]
    }
    ```

- Error Response :

    `
    Code: 500
    `
### **<span style="color:green">GET</span> / Find Todo By Id**

- **URL**

    ```
    /todos/:id
    ```

- **Method**

    ```
    GET 
    ```

- **URL Params**
    ```
    id
    ```
- Success Response :
    ```json
    {
        "code": 200,
        "message": "Success",
        "data": [
            {
                "id": 1,
                "title": "Create Aplikasi",
                "description": "Create Aplikasi Fancy Todo",
                "status": "selesai",
                "due_date": "2020-06-21T00:00:00.000Z",
                "createdAt": "2021-06-22T13:59:36.105Z",
                "updatedAt": "2021-06-22T13:59:36.105Z"
            }
        ]
    }
    ```

- Error Response Code :

    `
    Code: 404
    `
### **<span style="color:orange">POST</span> / Post Todo**

- **URL**

    ```
    /todos
    ```

- **Method**

    ```
    POST 
    ```

- **URL Params**
    ```
    None
    ```
- **Body** urlencoded

    
    Key         | Value 
    ----------- |------
    title       | Membaca
    decription  | Membaca Buku Harry Potter
    status      | belum selesai 
    due_date    | 2020-06-22
    
- Success Response :
    ```json
    {
        "code": 201,
        "message": "Success",
        "data": [
            {
                "id": 2,
                "title": "Membaca",
                "description": "Membaca Buku Harry Potter",
                "status": "belum selesai",
                "due_date": "2020-06-22T00:00:00.000Z",
                "updatedAt": "2021-06-22T14:20:50.820Z",
                "createdAt": "2021-06-22T14:20:50.820Z"
            }
        ]
    }
    ```

- Error Response Code :

    `
    Code: 500
    `
### **<span style="color:grey">FETCH</span> / Update Status By Id**

- **URL**

    ```
    /todos/:id
    ```

- **Method**

    ```
    FETCH 
    ```

- **URL Params**
    ```
    id
    ```
- **Body** urlencoded

    
    Key         | Value 
    ----------- |------
    status      | belum selesai 
    
- Success Response :
    ```json
    {
        "code": 200,
        "message": "Success",
        "data": [
            {
                "id": 2,
                "title": "Membaca",
                "description": "Membaca Buku Harry Potter",
                "status": "belum selesai",
                "due_date": "2020-06-22T00:00:00.000Z",
                "updatedAt": "2021-06-22T14:20:50.820Z",
                "createdAt": "2021-06-22T14:20:50.820Z"
            }
        ]
    }
    ```

- Error Response Code :

    `
    Code: 500
    `

### **<span style="color:blue">PUT</span> / Update Todo**

- **URL**

    ```
    /todos/:id
    ```

- **Method**

    ```
    PUT
    ```

- **URL Params**
    ```
    id
    ```
- **Body** urlencoded

    
    Key         | Value 
    ----------- |------
    title       | Bernyanyi
    decription  | Menyanyikan Lagu Indonesia Raya
    status      | selesai 
    due_date    | 2020-06-22
    
- Success Response :
    ```json
    {
        "code": 200,
        "message": "Success",
        "data": [
            {
                "id": 2,
                "title": "Bernyanyi",
                "description": "Menyanyikan Lagu Indonesia Raya",
                "status": "selesai",
                "due_date": "2020-06-22T00:00:00.000Z",
                "updatedAt": "2021-06-22T14:20:50.820Z",
                "createdAt": "2021-06-22T14:20:50.820Z"
            }
        ]
    }
    ```

- Error Response Code :

    `
    Code: 500
    `
### **<span style="color:red">DELETE</span> / Delete Todo**

- **URL**

    ```
    /todos/:id
    ```

- **Method**

    ```
    DELETE
    ```

- **URL Params**
    ```
    id
    ```
    
- Success Response :
    ```json
    {
        "code": 200,
        "message": "Delete Successfull",
    }
    ```

- Error Response Code :

    `
    Code: 500
    `