<div>
  <h1>Microservice Auth</h1>
  <h3>This project was developed in NodeJS using typescript. It is a service that manages users and permits perform basic operations in this users how login, get data user, create, modify, and delete users..</h3>
  <h1>Table of contents:</h1>
  <ul>
    <li><a href="#installation">Installation</a></li>
    <li><a>Authentication</a></li>
    <li><a>API Reference</a></li>
    <li><a>Authors</a></li>
  </ul>
  <div id="installation">
    <h1>Installation</h1>
    <h5>Clone the Repository</h5>
    <p>Begin by cloning the repo to a local directory. Usually the content is installed in a folder called api where you will find the source code for the API.</p>
    <h5>Install Dependencies</h5>
    <p>You'll need to install the project dependencies in order to have the API up and running. To do this, use either npm or yarn to install them:</p>
    <p>npm install or yarn install works.</p>
    <h5>Setting up the .env file and database</h5>
    <p>This Api is working with Sequelize, the DIALECT in the .env determines which database to use</p>
    <p>You can see possiblees dialects in <a href="https://sequelize.org/docs/v6/getting-started/">API Sequelize</a></p>
    <p>You'll need to setup a .env file at root directory with structure like this one:</p>
    <style>
  pre {
    background-color: black; /* Fondo negro */
    padding: 10px;
    color: white;
    font-family: monospace;
  }
  .key {
    color: violet; /* Color violeta para las claves */
  }
  .value {
    color: yellow; /* Color amarillo para los valores */
  }
</style>
    <pre>
      <span class="key">PORT</span> = <span class="value">&lt;YOUR_PORT&gt;</span>
      <span class="key">DIALECT</span> = <span class="value">&lt;YOUR_DIALECT&gt;</span>
      <span class="key">HOST</span> = <span class="value">&lt;YOUR_HOST_DATABASE&gt;</span>
      <span class="key">USER</span> = <span class="value">&lt;YOUR_USERNAME_DATABASE&gt;</span>
      <span class="key">PASSWORD</span> = <span class="value">&lt;YOUR_PASSWORD_DATABASE&gt;</span>
      <span class="key">DATABASE</span> = <span class="value">&lt;YOUR_DATABASE&gt;</span>
      <span class="key">JWT_SECRET</span> = <span class="value">&lt;YOUR_JWT_SECRET&gt;</span>
      <span class="key">URL_GENERAL</span> = <span class="value">&lt;YOUR_DOMAIN&gt;</span> //Example: http://localhost:
    </pre>
  </div>
</div>
