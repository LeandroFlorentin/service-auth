<div>
  <h1>Microservice Auth</h1>
  <hr/>
  <h3>This project was developed in NodeJS using typescript. It is a service that manages users and permits perform basic operations in this users how login, get data user, create, modify, and delete users..</h3>
  <h1>Table of contents:</h1>
  <hr/>
  <ul>
    <li href="#installation">Installation</li>
    <li>Authentication</li>
    <li>API Reference</li>
    <li>Authors</li>
  </ul>
  <div id="installation">
    <h1>Installation</h1>
    <hr/>
    <h5>Clone the Repository</h5>
    <p>Begin by cloning the repo to a local directory. Usually the content is installed in a folder called api where you will find the source code for the API.</p>
    <h5>Install Dependencies</h5>
    <p>You'll need to install the project dependencies in order to have the API up and running. To do this, use either npm or yarn to install them:</p>
    <p>npm install or yarn install works.</p>
    <h5>Setting up the .env file and database</h5>
    <p>This Api is working with Sequelize, the DIALECT in the .env determines which database to use</p>
    <p>You can see possiblees dialects in <a href="https://sequelize.org/docs/v6/getting-started/">API Sequelize</a></p>
    <p>You'll need to setup a .env file at root directory with structure like this one:</p>
    <pre>
        PORT = <YOUR_PORT>
        DIALECT = <YOUR_DIALECT>
        HOST = <YOUR_HOST_DATABASE>
        USER = <YOUR_USERNAME_DATABASE>
        PASSWORD = <YOUR_PASSWORD_DATABASE>
        DATABASE = <YOUR_DATABASE>
        JWT_SECRET = <YOUR_JWT_SECRET>
        URL_GENERAL = <YOUR_DOMAIN> //Example: http://localhost:
    </pre>
  </div>
</div>
