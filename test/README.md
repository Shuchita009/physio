# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Backend (FastAPI) – Setup & Deploy

### Local setup

1. Install Python 3.12
2. Create and activate venv in `backend/`
3. Install deps: `pip install -r backend/requirements.txt`
4. Set env vars (create `backend/.env`):

```
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-host>/<db>?retryWrites=true&w=majority
DB_NAME=physio_app
ALLOWED_ORIGINS=*
```

5. Run: `uvicorn backend.server:app --reload`

Open API docs at `http://localhost:8000/docs`

### Deploy on Render (recommended)

1. Commit the repo to GitHub
2. Connect repo on Render and select `render.yaml`
3. Set env vars in the Render dashboard:
   - `MONGO_URL`
   - `DB_NAME=physio_app`
   - `ALLOWED_ORIGINS=your-frontend-domain`

The service will build using `backend/Dockerfile` and run on port 8000.

## Frontend – Build & Hosting

### Configure API URL

Create `.env` in project root with:

```
REACT_APP_BACKEND_URL=https://<your-backend-host>
```

Then:

```
npm install
npm run build
```

Host the `build/` folder on Netlify, Vercel, or any static host. Ensure CORS `ALLOWED_ORIGINS` on backend allows your frontend domain.

## 100% Free Hosting Plan

### Database (Free)
- Create a free MongoDB Atlas cluster (M0)
- Get your connection string `MONGO_URL`

### Backend (Free)
- Use the included `render.yaml` to deploy the FastAPI backend on Render's free plan
- Set env vars on Render: `MONGO_URL`, `DB_NAME`, `ALLOWED_ORIGINS`

### Frontend on Vercel (Free)
- Import this repo into Vercel
- Add environment variable: `REACT_APP_BACKEND_URL=https://<your-render-backend>`
- Build command: `npm run build` (default)
- Output directory: `build`

The testimonials section now loads live data from `/api/testimonials` and supports new submissions via `POST /api/testimonials`.
