# FancyTodo-Server

***Getting Started for Server Side Development Level***

* _Edit file `env-template` menjadi `.env`._
* _Pada file `.env` tersebut isi sesuai kebutuhan / database._
* _`JWT_KEY` yaitu signature untuk generate token._
* _`DB_USERNAME` yaitu username database._
* _`DB_PASSWORD` yaitu password database._
* _`DB_NAME` yaitu nama databse._
* _`DIALEC_NAME` yaitu jenis database yang digunakan._
* _`HOST` yaitu alamat localhost._
* _Setelah itu jalankan `sequelize db:migrate` untuk migrasi ke database._
* _Jalankan `nodemon app.js` untuk menjalankan aplikasi._

## Available Endpoint
_Users_

* `POST /register`
* `POST /login`

_Todos_

* `POST /todos`
* `GET /todos`
* `GET /todos/:id`
* `PUT /todos/:id`
* `PATCH /todos/:id`
* `DELETE /todos/:id`

## RESTful Endpoint

### Add User
> Menambahkan user baru

* _URL_

  ```
  /register
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

  **Code 201**

  Jika request berhasil

  ```
 {
    "id": req.body.id,
    "email": req.body.email,
 }

  ```

  **Code 400**

  Validasi tidak terpenuhi,

  jika ada value attributes tidak sesuai dengan validasi

  ```
 {
    "err": [
        "Email must be not empty",
        "Must be email format",
        "password must be filled",
        "Password min 6 characters",
        "There must be a number"
    ]
 }
  ```

  **Code 500**

  Jika value dari attributes ada yang `tidak ada` atau `null`

  ```
  {
    "err": "Internal server error"
  }
  ```
   **Code 400**

  Jika email belum terdaftar

  ```
  {
    "err": "Email not registered"
  }
  ```
  **Code 400**

  Jika email telah terdaftar

  ```
  {
    "err": "Email has been used"
  }
  ```
### Login User
> Login user ke aplikasi

* _URL_

  ```
  /login
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

  **Code 200**

  Jika request berhasil

  ```
 {
    "token": "access token"
}

  ```

  **Code 500**

  Jika value dari attributes ada yang `tidak ada` atau `null`

  ```
  {
    "err": "Internal server error"
  }
  ```
   **Code 400**

  Jika email belum terdaftar

  ```
  {
    "err": "Email not registered"
  }
  ```

### Display todo

> Menampilkan semua todo dari user 

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

  **Code 200**

  Jika request berhasil

  ```
  todo:[
    {
      "id": 1,
      "title": req.body.title,
      "description": req.body.title,
      "status": req.body.status,
      "due_date": req.body.due_date,
      "user_id":1
    },
    {
      "id": 2,
      "title": req.body.title,
      "description": req.body.title,
      "status": req.body.status,
      "due_date": req.body.due_date,
      "user_id":1
    }
  ]
  ```

  **Code 500**

  Jika request gagal karena server error

  ```
    "err": {
      "Internal server error"
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

  **Code 200**

  Jika request berhasil

  ```
  todo:
  {
    "id": 1,
    "title": req.body.title,
    "description": req.body.title,
    "status": req.body.status,
    "due_date": req.body.due_date,
    "user_id":1
  }
  ```

  **Code 404**

  Jika todo tidak ditemukan

  ```
    "err": {
      "Todo not found"
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

  **Code 200**

  Jika request berhasil

  ```
  {
    "id": 1,
    "title": req.body.title,
    "description": req.body.title,
    "status": req.body.status,
    "due_date": req.body.due_date
    "user_id": 1
  }
  ```

  **Code 400**

  Validasi tidak terpenuhi,

  jika validasi tidak terpenuhi dari attribute

  ```
  {
    "err": [
      "Title must be filled",
      "Description must be filled",
      "Status must be filled",
      "Hanya boleh input tanggal sekarang dan setelahnya",
    ]
  }
  ```

  **Code 404**

  Jika todo tidak ditemukan

  ```
    "err": {
      "Todo not found"
    }
  
  ```

  **Code 500**

  Jika request gagal karena server error

  ```
    "err": {
      "Internal server error"
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

  **Code 200**

  Jika request berhasil

  ```
  {
    "id": 1,
    "title": "makan siang",
    "description": "makan ",
    "status": true,
    "due_date": "2021-06-28T00:00:00.000Z",
    "user_id": 1,
  }
  ```

  **Code 400**

  Validasi tidak terpenuhi,

  jika ada value attributes tidak sesuai validasi

  ```
  
    "err": {
      "Status must be filled"
    }
  
  ```

  **Code 404**

  Jika todo tidak ditemukan

  ```
  
    "err": {
      "Todo not found"
    }
  
  ```

  **Code 500**

  Jika request gagal karena server error

  ```
  
    "err": {
      "Internal server error"
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

  **Code 200**

  Jika request berhasil

  ```
  { "message": "todo success to delete" }
  ```

  **Code 404**

  Jika todo tidak ditemukan

  ```
    "err": {
      "Todo not found"
    }

  ```

  **Code 500**

  Jika request gagal karena server error

  ```
  
    "err": {
      "Internal server error"
    }
  
  ```
