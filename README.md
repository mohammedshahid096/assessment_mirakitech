# Assessment Mirakitech
## Installation :-


1. Clone the Repository First

```sh
git clone https://github.com/mohammedshahid096/assessment_mirakitech
```
---
2. Create a DataBase in the mongodb for locally running the porject and for testing purpose
Database Name : Assignment_mirakitech

there are 2 folders
1. backend
2. frontend
---
3. install the dependencies
- for Backend purpose
```sh
cd backend
npm install 
```
- for fontend purpose
```sh
cd frontend
npm install 
```
## To Start Development :-
### Note : 
- internet is connected initially to start the react server, as there is a "proxy"
- 1st start backend development and then start the frontend server

Backend Server:
```sh
npm start
```

Frontend Server:

```sh
npm start
```

## Testing :-
###Note : before starting the testing there should be a mongodb Database 
Database Name : Assignment_mirakitech
1. for Backend :
```sh
cd backend
npm test 
```
there are 6 test case
for register and login 
| variable name | Example |
| ------ | ------ |
| email | unitTesting1@gmail.com |
| password | 123456789 |
| name | unitTesting101|

## FrontEnd :-
### Features
Sure, here's a breakdown of the features you've described:

1. **Login Page:**
   - A dedicated page for users to log in to the application.
   - Input fields for username/email and password.
   - Login button to authenticate users.
2. **Signup Page:**
   - A separate page for new users to sign up for the application.
   - Input fields for username, email, password, and possibly additional information.
   - Signup button to create a new user account.

3. **Home Page:**
   - After logging in, users are directed to the home page.
   - Displays a list of all todo tasks.
   - Utilizes Material-UI's `SpeedDial` component for quick actions.

4. **Material-UI SpeedDial:**
   - A floating action button that expands into a set of related actions.
   - Two main options: "Login" and "Create Task".

5. **Create Task Action:**
   - Available within the SpeedDial menu.
   - On clicking "Create Task", a pop-up modal appears for task creation.

6. **Task Creation Modal:**
   - A dialog/modal that opens when the user clicks the "Create Task" option.
   - Contains input fields for:
     - Title: User can add a title for the todo task.
     - Description: User can provide a detailed description of the task.
   - "Save" button to finalize the task creation.


### Libraries Used
   - react-toastify
   - material ui
   - axios
   - jest
   - js-cookie
   - react-router-dom
   - redux , react-redux, redux-thunk
   - sass
   - webfontloader

## Backend :-
### Features

1. **JWT Token Usage:**
   - Upon successful user login or signup, a JSON Web Token (JWT) is generated.
   - The token contains user-specific information and a digital signature for verification.
   - This token is sent to the client and stored in cookies for secure storage.

2. **Cookies for Token Storage:**
   - The JWT token is stored in an HTTP-only cookie.
   - This cookie is sent with each subsequent request to the server, providing user authentication without exposing the token to JavaScript.

3. **Password Hashing with bcrypt:**
   - When users sign up or change their passwords, the provided passwords are not stored in plain text.
   - Instead, they are securely hashed using the bcrypt hashing algorithm before being stored in the database.
   - bcrypt includes a built-in salt mechanism to enhance security.

4. **Authorization:**
   - User actions, such as creating tasks or viewing the task list, are restricted based on user roles and permissions.
   - The JWT token includes information about the user's roles and permissions.
   - Middleware on the server validates the token and checks user permissions before allowing or denying access to specific routes or actions.

5. **Token Expiration and Renewal:**
   - JWT tokens can have expiration times to enhance security.
   - When a token is close to expiration, the client can request a new token using a refresh token.
   - The server verifies the refresh token and issues a new JWT token without requiring the user to log in again.
  


### Libraries Used
    - bcrypt
    - cookie-parser
    - cors
    - dotenv
    - express
    - http-errors
    - jsonwebtoken
    - mongoose
    





