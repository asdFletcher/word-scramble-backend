# word-scramble-backend
A back end repo for the word scramble app `Ocean Commotion`

This server uses a `Redis` database to store scores, and an `Express` server to connect to that database and serve up and save new score data to users on the front end.


## Running the server and database locally:

### Step 1: Start the `Redis` database:
1. open a new terminal
1. the active directory doesn't matter
1. Run command:
    ```
    redis-server
    ```
  - Note: success will have a message along the lines of: `Ready to accept connections`

### Step 2: Start the express server:
1. Make sure you have a .env file located in the root directory of `/word-cramble-backend` with the following contents (or whichever port you prefer):
    ```
    PORT=3001
    ```
1. open a new terminal
1. navigate to the directory `/word-cramble-backend`
1. Run command:
    ```
    npm start
    ```
  - Note: success will have a message along the lines of: `server is up and running on port: 3001`

### Step 3: Test the connection:


Get all scores from the database:
- from the terminal run: `http :3001/get-scores`
  - Note: requires httpie to be run from the terminal [httpie on npm](https://www.npmjs.com/package/httpie)

Manually remove the entire `Redis` table:
- from the terminal run: `redis-cli FLUSHDB`

Manually add a score to the database:
- from the terminal run: `echo '{"name":"king tut","score":80}' | http post :3001/save-score`


## Running the server and database on Heroku:

- Create the heroku project: `heroku create <name for backend app>`
- Verify the remote has bee added: `git remote -v`
- On the heroku UI set the app to update from Github automatically:
  - Deploy -> Github -> Enter repo name -> connect -> enable automatic deploys
- Provision a `Redis` database for your backend app on heroku:
  - Resource -> Search `Redis` -> select free tier