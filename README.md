# Michael's Music Wishlist

To run locally:

1. Install nodejs and npm
2. Run `npm install`
3. Create a new file in the root of the repo named `.env` and fill out the variables described in `default.env`
4. Run `npm start` to start the react app
5. Run `npm run server` to start the nodejs backend server

To deploy:

1. Install nodejs and npm
2. Run npm install
3. Create a new file in the root of the repo named `.env` and fill out the variables described in `default.env` (make sure to use proper production DBs and URLs to the api server)

```
SQL_HOST: IP or hostname of the SQL server
SQL_USER: SQL user to perform DB operations on
SQL_PASSWORD: Password of the SQL user
SQL_DATABASE: DB with the wanted music table
SQL_WANT_TABLE: Wanted music table
REACT_APP_API_SERVER_URL: URL of the NodeJS backend server
```

4. Run `npm run build` to build the react app
5. Serve the `build` folder over a web server (NGINX, Apache) to `/`
6. Run `npm run server` to start the NodeJS backend, point a reverse proxy endpoint to `http://localhost:3001/` to redirect requests (eg. `/api`, note that this is what you'll need to set the `REACT_APP_API_SERVER_URL` in the .env file to, eg. `REACT_APP_API_SERVER_URL=http://mysite/api`)
