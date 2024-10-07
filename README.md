# `Posts App`

This repository contains a CRUD application for managing posts. The application is built with React (using Vite and Tailwind CSS for the frontend) and Express (using the fs module for backend data storage).

## `Prerequisites`

Before you begin, ensure you have the following installed on your machine:

- Node.js `(v14 or later)`
- npm `(v6 or later)`

## `Cloning the Repository`

To get started with this project, clone the repository to your local machine:

```bash
git clone https://github.com/hamzalodhi2023/post-app.git
cd post-app
```

## `Backend Setup`

### `Install Dependencies`

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

### `Run the Server`

Start the Express server (runs on port `3000` by default):

```bash
npm run server
```

The backend server should now be running.

## `Frontend Setup`

### `Install Dependencies`

Open a new terminal window/tab and navigate to the `frontend` directory:

```bash
cd ../frontend
npm install
```

## `Start the Development Server`

Run the following command to start the Vite development server for the frontend (runs on port `5173` by default):

```bash
npm run dev
```

The frontend development server should now be running.

## `Accessing the Application`

Open your web browser and navigate to `http://localhost:5173` to view the Posts App. The frontend interacts with the backend API running on `http://localhost:3000`.

## `Project Structure`

- `backend/`: Contains the Express server code.
- `frontend/`: Contains the React (Vite + Tailwind CSS) frontend code.
- `README.md`: This file.

## `Additional Notes`

- The backend uses the `fs` module for storing data locally. For production use, consider using a database like MongoDB or PostgreSQL.

- Ensure both backend and frontend servers are running simultaneously for full application functionality during development.

## `Contributing`

Feel free to fork this repository, create pull requests, and suggest improvements. Contributions are welcome!


## `License`
This project is licensed under the `MIT License`.
