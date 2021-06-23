# Todo_App

**Base URL**

http://localhost:3000

# Fancy Todo

***Add***
----
  Returns new todo.

* **URL**

  /todos
<!-- 
* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

   **Required:**
  ````
    {
      name: req.body.name,
      desc: req.body.desc
    }
  ````

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
        "id": 1,
        "name": "<movie name>",
        "desc": "<movie desc>",
        "updatedAt": "2020-03-30T06:02:31.794Z",
        "createdAt": "2020-03-30T06:02:31.794Z"
    }
    ```


* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```
    { error : "SequelizeValidationError" }
    ```

  OR

  * **Code:** 500 <br />

* **Sample Call:**

  ```javascript
    $.ajax({
      method: 'POST',
      url: `http://localhost:3000/movies`,
      headers: {
        token: localStorage.getItem('token')
      },
      data: {
        name, desc
      }
    })
  ```

----
***Display***
----
  Returns all movies.

* **URL**

  /movies

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
        "id": 1,
        "name": "<movie name>",
        "desc": "<movie desc>",
        "createdAt": "2020-03-30T05:56:08.893Z",
        "updatedAt": "2020-03-30T05:56:08.893Z"
      },
      {
        "id": 2,
        "name": "<movie name>",
        "desc": "<movie desc>",
        "createdAt": "2020-03-30T06:13:15.897Z",
        "updatedAt": "2020-03-30T06:13:15.897Z"
      }
    ]
    ```


* **Error Response:**

  * **Code:** 500 <br />


* **Sample Call:**

  ```javascript
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/movies',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  
  ``` -->