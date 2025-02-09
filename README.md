<div>
  <h1>Microservice Auth</h1>
  <h4>This project was developed in NodeJS using typescript. It is a service that manages users and permits perform basic operations in this users how login, get data user, create, modify, and delete users via API, their documentation for the test is developed in Swagger.</h4>
  <p>Configure your credentials in file .env, for example:</p>

  <p>When you configure your credentials, then execute npm install in the project after that npm run dev, and finally you have the project running.</p>
  <pre>
    PORT = 3000
    DIALECT = postgres
    HOST = localhost
    USER = postgres
    PASSWORD = password
    DATABASE = postgres
    JWT_SECRET = secret
    URL_GENERAL = http://localhost:
  </pre>
  <p>API endpoints:</p>
  <ul>
    <li>Authentication
      <ul>
        <li>Login</li>
      </ul>
    </li>
    <li>Users
      <ul>
        <li>Me</li>
        <li>Create</li>
        <li>Update</li>
        <li>Delete</li>
      </ul>
    </li>
  </ul>
</div>
