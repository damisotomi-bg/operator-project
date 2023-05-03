## Project Description

- A backend project built in NodeJs containing all API endpoints to be consumed by a front end. The project was built to simulate BGs main workflow process

## Endpoints Available

### Authentication

User Signup - /auth/signup -POST METHOD

User login -/auth/login -POST METHOD

### Operators

Complete registration - /operators/me -POST METHOD <Token Expected. Gotten from login above>

Select Product & seed type - /operators/selectProductSeedType -POST METHOD <Token Expected Gotten from login above>

### States and LGAs

Get all states -/states/ -GET METHOD

Get a states lgas -/states/{state_id}/lgas -GET METHOD

## How to run the app

-Clone the repo
-Open cloned folder and run `npm install`

- Create a new database in postgres called `Operator-db`.

  -All other details for the db can be found in the .env file. Ensure password '2004' is replaced with your db password in the .env file

  -Run `npx db-migrate up` to run the migration

  -Run `npm run dev` to run the scripts and start the server. After running this the first time, you can now run `npm start` going forward instead

  -Use a postman tool to interact with the endpoints. Visit any of the endpoints above with the correct request method
