# Todos App

Base URL

http://localhost:3000

## **Show List Todos**
----
  Returns json data about all todos.

* **URL**

  /todos

* **Method**

  `GET`

* **URL PARAMS**

  None

* **Data Params**

  None

* **Success Response**

  * **Code:** 200 <br />
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

  * **Code:** 500 <br />


----
## **Add Todo**
----
  Returns json data about the created todo.

* **URL**

  /todos

* **Method**

  `POST`

* **URL PARAMS**

  None

* **Data Params**

  **Required:**
  ```
  {
    "title": "Lari",
    "description": "Lari pagi",
    "due_date": "2021-06-23",
  }
  ```

* **Success Response**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "id": 6,
      "title": "Baca",
      "description": "Baca buku shoe dog",
      "status": "not done",
      "due_date": "2021-06-22T00:00:00.000Z",
      "updatedAt": "2021-06-21T14:08:15.666Z",
      "createdAt": "2021-06-21T14:08:15.666Z"
    }
    ```

* **Error Response:**

  * **Code:** 400 <br />
    **Content:**
    ```
    { 
      "err" : "SequelizeValidationError" 
    }
    ```

  * **Code:** 500 <br />


----