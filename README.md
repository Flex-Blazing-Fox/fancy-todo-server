# Todos App
**How to run the app:**
 - Install packages by running : 
    > `$ npm install`
 - Migrate db : 
    > `$ sequelize db:migrate`
 - Setup a development server: 
    > `$ npm run dev`

**Base URL** <br>
http://localhost:3000  

**Environment Variable** <br>
> Save your environment variable in .env file and don't forget to add .env to .gitignore.

**Note :** <br>
Todo status must be either "not done" or "done".

---

## Register
Register a user and return user's id and email.
* **URL** <br>
/users
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 201 <br>
		**Content:**
        ```
        {
          "id": 1,
          "email": "user@gmail.com"
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      { 
        "name": "UniqueEmailError",
        "message" : "email already exists" 
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      { 
        "name": "InternalServerError",
        "message" : "Internal server error" 
      }
      ```
      
---

## Login
Login to the app.
* **URL** <br>
/users
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
Headers : `token`
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOjUsImlhdCI6MTYyNDUzNTk5OX0.Ndr8i4DPr0-a_bPjPwSh_D9-QxShNDVQ9q1WiP8rSrI"
        }
        ```
* **Error Response:**
    * **Code:** 400 <br>
      **Content:**
      ```
      { 
        "name": "IncorrectCredentialsError",
        "message" : "email or password is wrong" 
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      { 
        "name": "InternalServerError",
        "message" : "Internal server error" 
      }
      ```
      
---

## Show List Todos
Returns json data about all todos.
* **URL** <br>
/todos
* **Method** <br>
`GET`
* **URL Params** <br>
None
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        [
          {
            "id": 3,
            "title": "Lari",
            "description": "Lari pagi",
            "status": "not done",
            "due_date": "2021-06-23T00:00:00.000Z",
            "createdAt": "2021-06-20T16:43:49.923Z",
            "updatedAt": "2021-06-20T16:43:49.923Z"
          },
          {
            "id": 4,
            "title": "Baca",
            "description": "Baca buku shoe dog",
            "status": "not done",
            "due_date": "2021-06-22T00:00:00.000Z",
            "createdAt": "2021-06-21T13:55:28.701Z",
            "updatedAt": "2021-06-21T13:55:28.701Z"
          }
        ]
        ```
* **Error Response:**
    * **Code:** 500 <br>
      **Content:**
      ```
      { 
        "name": "InternalServerError",
        "message" : "Internal server error" 
      }
      ```
      
---

## Show Todo
Returns json data about a todo based on id.
* **URL** <br>
/todos
* **Method** <br>
`GET`
* **URL Params** <br>
id
* **Data Params** <br>
None
* **Success Response**
	* **Code:** 200 <br>
		**Content:**
        ```
        {
          "id": 4,
          "title": "Baca",
          "description": "Baca buku shoe dog",
          "status": "not done",
          "due_date": "2021-06-22T00:00:00.000Z",
          "createdAt": "2021-06-21T13:55:28.701Z",
          "updatedAt": "2021-06-21T13:55:28.701Z"
        }
        ```
* **Error Response:**
    * **Code:** 403 <br>
      **Content:**
      ```
      { 
        "name": "ForbiddenError",
        "message" : "FORBIDDEN" 
      }
      ```

    * **Code:** 404 <br>
      **Content:**
      ```
      { 
        "name": "NotFoundError",
        "message" : "todo not found" 
      }
      ```

    * **Code:** 500 <br>
      **Content:**
      ```
      { 
        "name": "InternalServerError",
        "message" : "Internal server error" 
      }
      ```
      
---

## Add Todo
Add a todo and return json data about the created todo
* **URL** <br>
/todos
* **Method** <br>
`POST`
* **URL Params** <br>
None
* **Data Params** <br>
**Required:**
    ```
    {
        "title": "Lari",
        "description": "Lari pagi",
        "due_date": "2021-06-23",
    }
    ```
* **Success Response**
    * **Code:** 201 <br>
    **Content:** 
        ```
        {
          "id": 1,
          "title": "Lari",
          "description": "Lari pagi",
          "status": "not done",
          "due_date": "2021-06-23T00:00:00.000Z",
          "updatedAt": "2021-06-23T14:08:15.666Z",
          "createdAt": "2021-06-23T14:08:15.666Z"
        }
        ```
* **Error Response:**

  * **Code:** 400 <br>
    **Content:**
    ```
    { 
      "name": "SequelizeValidationError",
      "message" : "Sequelize validation error" 
    }
    ```

  * **Code:** 500<br>
    **Content:**
      ```
      { 
        "name": "InternalServerError",
        "message" : "Internal server error" 
      }
      ```

---

## Delete Todo
Delete a todo based on id
* **URL** <br>
/todos
* **Method** <br>
`DELETE`
* **URL Params** <br>
id
* **Data Params** <br>
None
* **Success Response**
    * **Code:** 200 <br>
      **Content:** 
          ```
          {
            "message": "todo success to delete"
          }
          ```
* **Error Response:**
  * **Code:** 403 <br>
    **Content:**
    ```
    { 
      "name": "ForbiddenError",
      "message" : "FORBIDDEN" 
    }
    ```

  * **Code:** 404 <br>
    **Content:**
    ```
    { 
      "name": "NotFoundError",
      "message" : "todo not found" 
    }
    ```

  * **Code:** 500<br>
    **Content:**
      ```
      { 
        "name": "InternalServerError",
        "message" : "Internal server error" 
      }
      ```

---

## Update Todo
Update a todo based on id and return the updated todo
* **URL** <br>
/todos
* **Method** <br>
`PUT`
* **URL Params** <br>
id
* **Data Params** <br>
**Required:**
    ```
    {
        "title": "Lari",
        "description": "Lari sore",
        "status": "not done",
        "due_date": "2021-06-23",
    }
    ```
* **Success Response**
    * **Code:** 200 <br>
    **Content:** 
        ```
        {
          "id": 1,
          "title": "Lari",
          "description": "Lari sore",
          "status": "not done",
          "due_date": "2021-06-23T00:00:00.000Z",
          "updatedAt": "2021-06-23T14:08:15.666Z",
          "createdAt": "2021-06-23T14:08:15.666Z"
        }
        ```
* **Error Response:**
  * **Code:** 403 <br>
    **Content:**
    ```
    { 
      "name": "ForbiddenError",
      "message" : "FORBIDDEN" 
    }
    ```

  * **Code:** 404 <br>
    **Content:**
    ```
    { 
      "name": "NotFoundError",
      "message" : "todo not found" 
    }
    ```

  * **Code:** 400 <br>
    **Content:**
    ```
    { 
      "name": "SequelizeValidationError",
      "message" : "Sequelize validation error" 
    }
    ```

  * **Code:** 500<br>
    **Content:**
      ```
      { 
        "name": "InternalServerError",
        "message" : "Internal server error" 
      }
      ```

---

## Update Todo Status
Update a todo status based on id and return the updated todo
* **URL** <br>
/todos
* **Method** <br>
`PATCH`
* **URL Params** <br>
id
* **Data Params** <br>
**Required:**
    ```
    {
        "status": "done",
    }
    ```
* **Success Response**
    * **Code:** 200 <br>
    **Content:** 
        ```
        {
          "id": 1,
          "title": "Lari",
          "description": "Lari sore",
          "status": "done",
          "due_date": "2021-06-23T00:00:00.000Z",
          "updatedAt": "2021-06-23T14:08:15.666Z",
          "createdAt": "2021-06-23T14:08:15.666Z"
        }
        ```
* **Error Response:**
  * **Code:** 403 <br>
    **Content:**
    ```
    { 
      "name": "ForbiddenError",
      "message" : "FORBIDDEN" 
    }
    ```

  * **Code:** 404 <br>
    **Content:**
    ```
    { 
      "name": "NotFoundError",
      "message" : "todo not found" 
    }
    ```

  * **Code:** 400 <br>
    **Content:**
    ```
    { 
      "name": "SequelizeValidationError",
      "message" : "Sequelize validation error" 
    }
    ```

  * **Code:** 500<br>
    **Content:**
      ```
      { 
        "name": "InternalServerError",
        "message" : "Internal server error" 
      }
      ```

---