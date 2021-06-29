# fancy-todo-server



***Getting Started for Server Side***

- _Jalankan `npm install` di terminal_
- _Edit file `config.js` sesuai dengan database masing masing :_
- _Setting `.env` diperlukan agar app dapat berjalan sebagaimana semestinya_ :
    * _Sesuaikan `JWT_KEY` yang sudah ditentukan_
    * _Sesuaikan `DB_USERNAME` yang sudah ditentukan_
    * _Sesuaikan `DB_PASSWORD` yang sudah ditentukan_
    * _Sesuaikan `DB_NAME` yang sudah ditentukan_
- _Jalankan `sequelize db:migrate` untuk migrasi ke database_
- _Jalankan `sequelize db:migrate:undo:all` untuk menghapus migrasi di database_
- _Jalankan `nodemon app.js` untuk menjalankan applikasi server side._


## Available Endpoint _Todos_
_Todos_

* `POST /todos`
* `GET /todos`
* `GET /todos/:id`
* `PUT /todos/:id`
* `PATCH /todos/:id`
* `DELETE /todos/:id`

_Users_

* `POST /users/register`
* `POST /users/login`


## RESTful Endpoint


### User Register

> Buat / daftar user baru

* _URL_
  ```
  /users/register
  ```
* _Method_
  ```
  POST
  ```
* _URL Params_
  ```
  None
  ```
* _Data Params_
  ```
  {
    "email": req.body.email,
    "password": req.body.password
  }
  ```
* _Response_

  **Code 201** : Jika request berhasil

  ```
  {
    "message": "User Created"
  }
  ```

  **Code 400** : Jika validasi tidak terpenuhi

  ```
  {
    "errors": [
        "Email can not be null",
        "Email has been used",
        "Email format is not correct",
        "Email can not be empty"
        "Password at least have 6 characters",
        "Password can not be null"
        "Password can not be empty"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

### User Login

> login ke applikasi

* _URL_

  ```
  /users/login
  ```

* _Method_

  ```
  POST
  ```

* _URL Params_

  ```
  None
  ```

* _Data Params_

  ```
  {
    "email": req.body.email,
    "password": req.body.password
  }
  ```

* _Response_

  **Code 201** : Jika request berhasil

  ```
  {
    "success": true,
    "access_token": access_token
  }
  ```

  **Code 401** : Jika validasi tidak terpenuhi

  ```
  {
    "errors": [
      "Email or Password is wrong"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

### Add Todo
> Menambahkan todo baru

* _URL_
  ```
  /todos
  ```

* _Method_
  ```
  POST
  ```

* _URL Params_
  ```
  None
  ```

* _Data Params_
  ```
  {
    "title": req.body.title,
    "description": req.body.title,
    "status": req.body.status,
    "due_date": req.body.due_date
    "userId" : req.userId
  }
  ```

* _Response_

  **Code 201** : Jika request berhasil

  ```
  {
    "data": [
        {
            "id": 2,
            "title": "belajar 2",
            "description": "belajar js 2",
            "status": true,
            "due_date": "2021-06-28T16:35:11.113Z",
            "userId": 1,
            "createdAt": "2021-06-27T16:31:23.692Z",
            "updatedAt": "2021-06-27T16:31:23.692Z"
        }
    ]
  }
  ```

  **Code 400** : Validasi tidak terpenuhi,

  Jika ada value attributes berupa `empty string` maka akan mengeluarkan error validasi sesuai attributenya

  ```
      {
        "errors": [
            "Validation notEmpty on title failed",
            "Validation notEmpty on description failed",
            "Validation notEmpty on status failed",
            "Tidak dapat menginput tanggal yang sudah lewat dari tanggal hari ini"
        ]
      }
  ```

### Display todo

> Menampilkan semua todo list dari user 

* _URL_
  ```
  /todos
  ```

* _Method_
  ```
  GET
  ```

* _URL Params_
  ```
  None
  ```

* _Data Params_
  ```
  None
  ```

* _Response_

  **Code 200** : Jika request berhasil

  ```
  {
    "data": [
        {
            "id": 2,
            "title": "belajar 2",
            "description": "belajar js 2",
            "status": true,
            "due_date": "2021-06-28T16:35:11.113Z",
            "userId": 1,
            "createdAt": "2021-06-27T16:31:23.692Z",
            "updatedAt": "2021-06-27T16:31:23.692Z"
        },
        {
            "id": 3,
            "title": "Belajar 3",
            "description": "Belajar js 3",
            "status": true,
            "due_date": "2021-06-28T16:35:11.113Z",
            "userId": 1,
            "createdAt": "2021-06-28T08:46:36.702Z",
            "updatedAt": "2021-06-28T08:46:36.702Z"
        }
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

### Display by id

> Menampilkan todo berdasarkan todo id

* _URL_
  ```
  /todos
  ```

* _Method_
  ```
  GET
  ```

* _URL Params_
  ```
  id
  ```

* _Data Params_
  ```
  None
  ```

* _Response_

  **Code 200** : Jika request berhasil

  ```
  {
    "data": {
        "id": 3,
        "title": "Belajar 3",
        "description": "Belajar js 3",
        "status": true,
        "due_date": "2021-06-28T16:35:11.113Z",
        "userId": 1,
        "createdAt": "2021-06-28T08:46:36.702Z",
        "updatedAt": "2021-06-28T08:46:36.702Z"
    }
  }
  ```

  **Code 404** : Jika todo tidak ditemukan

  ```
  {
    "errors": [
      "Todo not found"
    ]
  }
  ```

### Edit todo

> Edit value dari todo yang ditemukan

* _URL_
  ```
  /todos
  ```

* _Method_
  ```
  PUT
  ```

* _URL Params_
  ```
  id
  ```

* _Data Params_
  ```
  {
    "title": req.body.title,
    "description": req.body.title,
    "status": req.body.status,
    "due_date": req.body.due_date
  }
  ```

* _Response_

  **Code 200** : Jika request berhasil

  ```
  {
    "id": 1,
    "title": req.body.title,
    "description": req.body.title,
    "status": req.body.status,
    "due_date": req.body.due_date
  }
  ```

  **Code 400** : Validasi tidak terpenuhi,

  Jika ada value attributes berupa `empty` maka akan mengeluarkan error validasi sesuai attributenya

  ```
  {
    "errors": [
        "Validation notEmpty on title failed",
        "Validation notEmpty on description failed",
        "Validation notEmpty on status failed",
        "Tidak dapat menginput tanggal yang sudah lewat dari tanggal hari ini"
    ]
  }

  {
    "errors": [
        "Todo.title cannot be null",
        "Todo.description cannot be null",
        "Todo.status cannot be null",
        "Todo.due_date cannot be null"
    ]
  }
  ```
  Jika ada value attributes berupa `null` maka akan mengeluarkan error validasi sesuai attributenya

  ```
  {
    "errors": [
        "Todo.title cannot be null",
        "Todo.description cannot be null",
        "Todo.status cannot be null",
        "Todo.due_date cannot be null"
    ]
  }
  ```

  **Code 404** : Jika todo tidak ditemukan

  ```
  {
    "errors": [
      "Todo not found"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

### Update todo

> Update todo status

* _URL_

  ```
  /todos
  ```

* _Method_

  ```
  PATCH
  ```

* _URL Params_

  ```
  id
  ```

* _Data Params_

  ```
  {
    "status": req.body.status
  }
  ```

* _Response_

  **Code 200** : Jika request berhasil

  ```
  {
    "data": {
        "id": 6,
        "title": "Belajar lagi",
        "description": "Belajar lagi 3",
        "status": false,
        "due_date": "2021-06-29T09:27:22.133Z",
        "userId": 1,
        "createdAt": "2021-06-28T10:24:57.621Z",
        "updatedAt": "2021-06-28T10:37:44.112Z"
    }
  }
  ```

  **Code 400** : Validasi tidak terpenuhi,

  Jika ada value attributes status berupa `empty` maka akan mengeluarkan error validasi sesuai attributenya

  ```
  {
    "errors": [
        "Validation notEmpty on status failed"
    ]
  }
  ```

  Jika ada value attributes status berupa `null` maka akan mengeluarkan error validasi sesuai attributenya

  ```
  {
    "errors": [
        "Todo.status cannot be null"
    ]
  }
  ```

  **Code 404** : Jika todo tidak ditemukan

  ```
  {
    "errors": [
      "Todo not found"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```

### Delete todo

> Delete todo by id

* _URL_
  ```
  /todos
  ```

* _Method_
  ```
  DELETE
  ```

* _URL Params_
  ```
  id
  ```

* _Data Params_
  ```
  None
  ```

* _Response_

  **Code 200** : Jika request berhasil

  ```
  {
      "message": "todo success to delete"
  }
  ```

  **Code 404** : Jika todo tidak ditemukan

  ```
  {
    "errors": [
      "Todo not found"
    ]
  }
  ```

  **Code 500** : Jika request gagal karena server error

  ```
  {
    "errors": [
      "Internal server error"
    ]
  }
  ```