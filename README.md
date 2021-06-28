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

## Todos API

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
    - Code : 200

    ```json
    [
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
    - Code : 200

    ```json
    [
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
    - Code : 201

    ```json
    [
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
    - Code : 200
    ```json
    [
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
    - Code : 200
    ```json
    [
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
    - Code : 200

    ```json
    {
        "message": "Todo deleted successfully!",
    }
    ```

- Error Response Code :

    `
    Code: 500
    `

## User API

### **<span style="color:red">POST</span> / User Register**

- **URL**

    ```
    /users/register
    ```

- **Method**

    ```
    POST
    ```

- **URL Params**
    ```
    none
    ```
- **Body** urlencoded

    
    Key         | Value 
    ----------- |------
    email       | budi@mail.com
    password    | 123456

    
- Success Response :
    - Code : 201

    ```json
    {
        "message": "Pendaftaran Berhasil"
    }
    ```

- Error Response Code :

    -  Code: 400
    
    - Email Sudah Terdaftar
    ```json
    [
        {
            "message": "Email telah terdaftar"
        }
    ]
    ```
    - Email Sudah Kosong
    ```json
    [
        {
            "message": "Email Tidak Boleh Kosong"
        }
    ]
    ```
    - password Kurang dari 6 karakter
    ```json
    [
        {
            "message": "Password minimal 6 karkter"
        }
    ]
    ```
     - password kosong
    ```json
    [
        {
            "message": "Password Tidak Boleh Kosong"
        }
    ]
    ```
### **<span style="color:red">POST</span> / User Login**

- **URL**

    ```
    /users/login
    ```

- **Method**

    ```
    POST
    ```

- **URL Params**
    ```
    none
    ```
- **Body** urlencoded

    
    Key         | Value 
    ----------- |------
    email       | budi@mail.com
    password    | 123456

    
- Success Response :
    - Code : 200
    ```json
    {
        "message": "Success",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0ODkwOTUyfQ.Gxh1bvB2tN9k80_Jlc6AAwxZv0SMxs5PYC66wSPeM9U"
    }
    ```
- Success Response :
    - Code : 400