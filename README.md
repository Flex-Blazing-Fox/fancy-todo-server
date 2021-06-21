# fancy-todo-server

## **Todo App**
BaseURL : 
```
http://127.0.0.1:3000
```

### **Show All Todos**

- **URL**

    ```
    /todos
    ```

- **Method**

    `GET`

- **URL Params**

    None

- Success Response :
    ```json
    [
        {
            "id": 1,
            "title": "Create Aplikasi",
            "description": "Create Aplikasi Fancy Todo",
            "status": "selesai",
            "due_date": "2020-06-21T00:00:00.000Z",
            "createdAt": "2021-06-21T14:54:11.466Z",
            "updatedAt": "2021-06-21T14:54:11.466Z"
        },
        {
            "id": 2,
            "title": "Membaca",
            "description": "Membaca Buku Harry Potter",
            "status": "belum selesai",
            "due_date": "2020-06-22T00:00:00.000Z",
            "createdAt": "2021-06-21T15:03:50.007Z",
            "updatedAt": "2021-06-21T15:03:50.007Z"
        }
    ]
    ```

- Error Response :

    `
    Code: 500
    `