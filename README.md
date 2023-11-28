# A fullstack record store application

The backend and frontend are separated to different folders with respective names.

To run the backend:

```
cd backend 

npm install

npm run start
```

The backend will run on port 3001

For database connection you will need a .env file with the following variable, the value need to be changed to functioning one.

```
PGHOST="the-pg-host-key"
```


For the frontend:

You will need to create a file called .env.local in the root of the frontend folder, with contents:

REACT_APP_API_URL="http://localhost:3001"

```
cd frontend 

npm install

npm start
```

The frontend will run on port 3000

