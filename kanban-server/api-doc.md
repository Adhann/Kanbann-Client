# Fancy - Task Rest API Documentation
This is api documentation for Rest API Kanban.
<br><br>

## Endpoint List
## 1. User (Authentication)
---
### Register
> Create new User.
- **URL** : `/users/register`
- **Method** : `POST`
- **Data Params** :
    ```
    name=string
    email=string
    password=string
    ```

    _Request Header_
    ```
    None
    ```
    
    _Request Body_
    ```json
    {
        "name": "Dhan",
        "email": "<user>@mail.com",
        "password": "<user-password>"
    }
    ```

- **Success Response**

    _Response(201 - Created)_
    ```json
    {
        "id": "<get auto by system>",
        "name": "dhan",
        "email": "<user>@mail.com"
    }
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        "error": [
            "Email already registered"
        ]
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```

### Login
> Login & get access token for client
- **URL** : `/users/login`
- **Method** : `POST`
- **Data Params** :
    ```
    email=string
    password=string
    ```

    _Request Header_
    ```
    None
    ```
    
    _Request Body_
    ```json
    {
        "email": "<user>@mail.com",
        "password": "<user-password>"
    }
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "access_token" : "<get-token-from-server>"
    }
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        "error": [
            "Invalid email or password"
        ]
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

## 2. Task
---
### Create Task
> Create new Task.

input format :

| key         | value                   |
|-------------|-------------------------|
| title       | req.body.title          |
| category    | req.body.category       |
| userId      | req.decoded.id          |


- **URL** : `/tasks/create`
- **Method** : `POST`
- **Data Params** :
    ```
    title = string,
    category = string
    
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```json
    {
        "title": "<title task>",
        "category": "<category task>",
    }
    ```

- **Success Response**

    _Response(201 - Created)_
    ```json
    {
        "id": "<given id by system>",
        "title": "<title task>",
        "category": "<category task>",
        "userId": "<user id who create Task>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
    }
    ```

- **Error Response**

    _Response(400 - Bad Request)_
    ```json
    {
        "error": [
            "The Title field is required",
        ]
    }
    ```

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>


### Show All Task
> Show All Task.

| key         | value                             |
|-------------|-----------------------------------|
| id          | auto increment primary key        |
| title       | title task (string)               |
| category    | category (string)                 |
| createdAt   | time when data was created (date) |
| updatedAt   | time when data was updated (date) |
| userId      | foreign key of User.id            |


- **URL** : `/tasks`
- **Method** : `GET`
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "1",
        "title": "<title task 1>",
        "category": "<category Task 1>",
        "userId": "<user id who create Task 1>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
    },
    {
        "id": "2",
        "title": "<title task 2>",
        "category": "<category Task 2>",
        "userId": "<user id who create Task 2>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
    },
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Show Task By Id
> Show one Task.

| key         | value                             |
|-------------|-----------------------------------|
| id          | auto increment primary key        |
| title       | title task (string)               |
| category    | category task (string)            |
| createdAt   | time when data was created (date) |
| updatedAt   | time when data was updated (date) |
| userId      | foreign key of User.id            |


- **URL** : `/tasks/:id`
- **Method** : `GET`
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "1",
        "title": "<title task 1>",
        "category": "<category Task 1>",
        "userId": "<user id who create Task 1>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Task Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Update Task
- **URL** : `/tasks/:id`
- **Method** : `PUT`
- **URL Params** : id=integer
- **Data Params** :
    ```
    title=string (required)
    category=string
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    "title": "<updated-title>",
    "category": "<updated-category>",
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "1",
        "title": "<title task 1>",
        "category": "<category Task 1>",
        "userId": "<user id who create Task 1>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(400 - Bad Request)_
    ```json
    {
        "errors": [
            "The Title field is required",
            "The Status field is required",
            "Date must be more than today"
        ]
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Task Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>

### Delete Task
- **URL** : `/tasks/:id`
- **Method** : `DELETE`
- **URL Params** : id=integer
- **Data Params** :
    ```
    None
    ```

    _Request Header_
    ```json
    {
        "access_token": "<your token>"
    }
    ```
    
    _Request Body_
    ```
    None
    ```

- **Success Response**

    _Response(200 - OK)_
    ```json
    {
        "id": "1",
        "title": "<title task 1>",
        "category": "<category Task 1>",
        "userId": "<user id who create Task 1>",
        "updatedAt": "2021-02-03T18:58:57.586Z",
        "createdAt": "2021-02-03T18:58:57.586Z",
    }
    ```

- **Error Response**

    _Response(401 - Unauthorized)_
    ```json
    {
        "error": "Invalid Token"
    }
    ```

    _Response(403 - Forbidden)_
    ```json
    {
        "error": "Access Denied!!"
    }
    ```

    _Response(404 - Not Found)_
    ```json
    {
        "error": "Task Not Found"
    }
    ```
    
    _Response(500 - Internal Server Error)_
    ```json
    {
        "error": "Internal Server Error"
    }
    ```
<br>
