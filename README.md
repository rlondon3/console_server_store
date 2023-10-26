# POSTGRES CONSOLE, NODE SERVER BACKEND 
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/rlondon3/console_server_store/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/rlondon3/console_server_store/tree/main)

                          This is a Postgres Console & Node/Express REST API Application.

        • This application is in a Circleci CI/CD Pipeline w/unit test using Mocha •
      
                                        DEVELOPMENT TECHNOLOGY
        Node.js| Express| Typescript| Mocha | Chai | PostgreSQL | JSON Webtoken | Supertest | Bcrypt | DB-Migrate 
 ___________________________________________________________________

OVERVIEW
---------------------------
This project is running on localhost:3051.

• **_Start PostgreSQL_**

•**_Create 2 databases:_** In postgres SQL shell you will create 1 database for development and the other for testing. 
  <br>Example: <br> CREATE DATABASE node_app_dev; CREATE DATABSE node_app_test;

• **_Connect to the database:_** <br> \c node_app_dev

• **_Create user and password:_**
<br>Example: <br>CREATE USER full_stack_user WITH PASSWORD 'password123';

• **_Grant user privileges to use the database:_** 
<br>Example: <br> GRANT ALL PRIVILEGES ON DATABASE node_app_dev TO full_stack_user;
         <br> GRANT ALL PRIVILEGES ON DATABASE node_app_test TO full_stack_user;
         
Be sure to check that all databases and user is working. <br> Enter \l to list databases, and \du to display users.
<br> No tables have been created; therefore, \dt will return "No relations found."

Below are the environmental variables that needs to be set in a .env file:
<br> *Note that the values are not the same as the provided examples given above. 

POSTGRES_HOST=127.0.0.1
<br>POSTGRES_DB=postres
<br>POSTGRES_TEST_DB=node_app_test
<br>POSTGRES_USER=postgres
<br>POSTGRES_PASSWORD=password123
<br>ENV=test
<br>PEPPER=ren-and-stimpy-happy-joy
<br>SALT_ROUNDS=10
<br>TOKEN_SECRET=mchammertime987
<br>SPEC_TEST_PASSWORD=0123456789

SCRIPTS
---------------------------
"start": will start the application build file, 'server.js, <br/>
"watch": will set the ENV to dev and run tsc watch,<br/>
"test": will run db-migrate to create database tables for testing, run mocha test, and finally drop the tables.<br/>
"build": will build javascript files from typescript and save them to the build folder,<br/>
"watch-console": will set the ENV to console, and allow user to directly interact with postgres database<br/>

