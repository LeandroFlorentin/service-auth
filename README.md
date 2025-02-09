# Microservice Auth

This project was developed in NodeJS using typescript. It is a service that manages users and permits perform basic operations in this users how login, get data user, create, modify, and delete users.

#Table of contents:

- [Installation](#installation)
- [Authentication](#authentication)
- API Reference
- Authors

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

DIALECT = <YOUR_DIALECT>;
HOST = <YOUR_HOST_DATABASE>;
USER = <YOUR_USERNAME_DATABASE>;
PASSWORD = <YOUR_PASSWORD_DATABASE>;
DATABASE = <YOUR_DATABASE>;

JWT_SECRET = <YOUR_JWT_SECRET>;

URL_GENERAL = <YOUR_DOMAIN>; //Example: http://localhost:

```

#Authentication

When you initialization app in this create a test user whose username John doe, and your password is 123456.

You use this user for login and get token
