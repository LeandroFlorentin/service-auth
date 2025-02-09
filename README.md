# Microservice Auth

This project was developed in NodeJS using typescript. It is a service that manages users and permits perform basic operations in this users how login, get data user, create, modify, and delete users.

#Table of contents:

- [Installation](#installation)
- [Authentication](#authentication)
- [API Reference](#api-reference)
- [Authors](#authors)

# Installation

Clone the Repository

Begin by cloning the repo to a local directory. Usually the content is installed in a folder called api where you will find the source code for the API.

Install Dependencies

You'll need to install the project dependencies in order to have the API up and running. To do this, use either npm or yarn to install them:

npm install or yarn install works.
Setting up the .env file and database
This Api is working with Sequelize, the DIALECT in the .env determines which database to use
You can see possiblees dialects in [API Sequelize](https://sequelize.org/docs/v6/getting-started/)
You'll need to setup a .env file at root directory with structure like this one:

```env
PORT        = <YOUR_PORT>;

DIALECT     = <YOUR_DIALECT>;
HOST        = <YOUR_HOST_DATABASE>;
USER        = <YOUR_USERNAME_DATABASE>;
PASSWORD    = <YOUR_PASSWORD_DATABASE>;
DATABASE    = <YOUR_DATABASE>;

JWT_SECRET  = <YOUR_JWT_SECRET>;

URL_GENERAL = <YOUR_DOMAIN>; //Example: http://localhost:

```

# Authentication

When you initialization app in this create a test user with the role ADMIN whose username John doe, and your password is J123456.

You use this user for login and get token.

At [API Reference](#api-reference) you will find that authentication will appear in some colors.

```diff
- Red is for not required authentication
+ Green is for required authentication
```

```http
  POST auth/login
```

**Body params**

| Parameter           | Type     | Description                                            |
| :------------------ | :------- | :----------------------------------------------------- |
| `username or email` | `string` | **Required**. A valid username or email                |
| `password`          | `string` | **Required**. At least have a number and a letter 5-30 |

You will get a response like this:

```json
{
  "status": 200,
  "message": "Succesfull Auth",
  "data": {
    "id": 1,
    "username": "John doe",
    "email": "JohnDoe@hotmail.com",
    "role": ["ADMIN"],
    "disabled": 0,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkpvaG4gZG9lIiwiZW1haWwiOiJKb2huRG9lQGhvdG1haWwuY29tIiwicm9sZSI6WyJBRE1JTiJdLCJkaXNhYmxlZCI6MH0sImlhdCI6MTczOTEzNzQ0NSwiZXhwIjoxNzM5MTQxMDQ1fQ.M4EwyTpk0mnTcW_mdHYptiSOOcMKx4LRPhiGmd3OrwQ"
  }
}
```

Once you have your accessToken, you may need to authorize every request you made from henceforth.
You will need to add an authorization header into your requests:

**Using fetch:**

```js
fetch('https://example.com/users/create', {
	method: 'GET', // POST PUT DELETE
	headers: {
		Authorization: `Bearer ${accessToken}`,
	},
}).then(...);
```

**Using axios:**

```js
axios.get('https://example.com/users/create', {
	//.post .put .delete request
	headers: {
		Authorization: `Bearer ${accessToken}`,
	},
}).then(...);
```

Once you get the token and your role user is ADMIN, you can create a user.

```http
  POST users/create
```

**Authorizacion params**

You set token in Authorization bearer token.

**Body params**

| Parameter  | Type        | Description                                            |
| :--------- | :---------- | :----------------------------------------------------- |
| `username` | `string`    | **Required**. A valid username or email                |
| `email`    | `string`    | **Required**.                                          |
| `password` | `string`    | **Required**. At least have a number and a letter 5-30 |
| `role`     | `string []` | Default value is ["USER"]                              |

You will get a response like this:

```json
{
  "status": 200,
  "message": "User John doe2 is succesfull created",
  "data": {
    "disabled": 0,
    "id": 2,
    "username": "John doe2",
    "email": "JohnDoe@hotmail.com.ar",
    "role": ["USER"]
  }
}
```

# Api Reference

- [Error Handling](#error-handling)
- [Authorization Endpoints](#authorization-endpoints)
  - [POST Login](#login)
- [Users Endpoints](#users-endpoints)
  - [GET Me](#me)
  - [POST Create](#create)
  - [UPDATE Update](#update)
  - [DELETE Delete](#delete)

## Error handling

Every error that occurs when you are trying to request somethin, you will get a response like this:

```json
{
  "status":"number",
  "message":"string",
  "data":{"...properties"}
}
```

## Authorization endpoints

#### Login

```diff
- Authentication is not required
```

This is the main method to login, which is used to get the **accessToken**. You can check the Authentication process [here](#authentication)

```http
  POST auth/login
```

**Body params**

| Parameter           | Type     | Description                                            |
| :------------------ | :------- | :----------------------------------------------------- |
| `username or email` | `string` | **Required**. A valid username or email                |
| `password`          | `string` | **Required**. At least have a number and a letter 5-30 |

**200 Response**

```json
{
  "status": 200,
  "message": "Succesfull Auth",
  "data": {
    "id": 1,
    "username": "John doe",
    "email": "JohnDoe@hotmail.com",
    "role": ["ADMIN"],
    "disabled": 0,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkpvaG4gZG9lIiwiZW1haWwiOiJKb2huRG9lQGhvdG1haWwuY29tIiwicm9sZSI6WyJBRE1JTiJdLCJkaXNhYmxlZCI6MH0sImlhdCI6MTczOTEzNzQ0NSwiZXhwIjoxNzM5MTQxMDQ1fQ.M4EwyTpk0mnTcW_mdHYptiSOOcMKx4LRPhiGmd3OrwQ"
  }
}
```

## Users endpoints

#### Me

```diff
+ Authentication is required
+ Allowed user types USER and ADMIN
```

```http
  GET users/me
```

**Query params**

| Parameter | Type     | Description                                       |
| :-------- | :------- | :------------------------------------------------ |
| `id`      | `string` | **Required**. Id user to request information from |

**200 Response**

```json
{
  "status": 200,
  "message": "Info OK",
  "data": {
    "id": 1,
    "username": "John doe",
    "email": "JohnDoe@hotmail.com",
    "role": ["ADMIN"],
    "disabled": 0,
    "createdAt": "2025-02-09T21:43:59.515Z",
    "updatedAt": "2025-02-09T21:43:59.515Z"
  }
}
```

#### Create

```diff
+ Authentication is required
+ Allowed user type ADMIN
```

```http
  POST users/create
```

**Body params**

| Parameter  | Type        | Description                                            |
| :--------- | :---------- | :----------------------------------------------------- |
| `username` | `string`    | **Required**. A valid username or email                |
| `email`    | `string`    | **Required**.                                          |
| `password` | `string`    | **Required**. At least have a number and a letter 5-30 |
| `role`     | `string []` | Default value is ["USER"]                              |

**200 Response**

```json
{
  "status": 200,
  "message": "User John doe2 is succesfull created",
  "data": {
    "disabled": 0,
    "id": 2,
    "username": "John doe2",
    "email": "JohnDoe@hotmail.com.ar",
    "role": ["USER"]
  }
}
```

#### Update

```diff
+ Authentication is required
+ Allowed user types USER and ADMIN. type USER modification only in your user.
```

**Query params**

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `id`      | `string` | **Required**. Id user to modification from |

**Body params**

| Parameter  | Type        | Description         |
| :--------- | :---------- | :------------------ |
| `username` | `string`    | Modification value. |
| `email`    | `string`    | Modification value. |
| `password` | `string`    | Modification value. |
| `role`     | `string []` | Modification value. |

**200 Response**

```json
{
{
  "status": 200,
  "message": "Succesfully upload user",
  "data": {
  }
}
}
```

### Delete

```diff
+ Authentication is required
+ Allowed user types USER and ADMIN. type USER delete only in your user.
```

**Query params**

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id user to delete from |

**200 Response**

```json
{
  "status": 200,
  "message": "Succesfully delete user",
  "data": {}
}
```

# Authors

[@LeandroFlorentin](https://www.linkedin.com/in/leandro-florentin/)
