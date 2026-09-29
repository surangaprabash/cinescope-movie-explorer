# CineScope

CineScope is a movie discovery web app built with React and the TMDb API. You can search for movies, explore trending titles, browse by genre, view movie details, watch trailers, and save favorite movies.

**Live Demo:** https://cinescope-movie-explorer-kohl.vercel.app/

![CineScope home page](root/screenshot/homescreen.png)

## Why I built this

I wanted to build a small but complete front-end project using a real-world API instead of static data.

The project focuses on reusable React components, API integration, routing, state management, responsive design, loading states, error handling, and a clean user experience.

## Features

* Demo login with username and password
* Protected routes for Home, Movie Details, and Favorites
* Search movies by title with debounce
* Weekly trending movies
* Browse movies by genre
* Movie cards with poster, title, release year, and rating
* Movie details with overview, genres, runtime, cast, and trailer
* Favorites saved using `localStorage`
* Light and dark mode
* Loading skeletons
* Empty states
* Friendly API error messages
* 404 page
* Responsive mobile-first layout

## Demo Login

CineScope uses a simple front-end demo login without a backend authentication system.

Use the following credentials to access the application:

```text
Email: test@gmail.com
Password: 12345678
```

> This is only a demo login. No real authentication or user account system is implemented.

## Tech Stack

| Area             | Technology        |
| ---------------- | ----------------- |
| Framework        | React 18          |
| Project Setup    | Create React App  |
| Routing          | React Router v6   |
| HTTP Client      | Axios             |
| Styling          | Tailwind CSS v3   |
| State Management | React Context API |
| Movie Data       | TMDb API          |
| Deployment       | Vercel            |

## TMDb API

CineScope uses the [TMDb API](https://developer.themoviedb.org/reference/getting-started) to retrieve movie information.

The application uses the TMDb API for:

* Trending movies
* Movie search
* Movie discovery
* Genre lists
* Movie details
* Cast information
* Movie trailers

### Getting a TMDb API Key

1. Create an account at [The Movie Database](https://www.themoviedb.org/).
2. Verify your email address.
3. Go to your account settings and open the **API** section.
4. Create a developer API key.
5. Copy the **API Key (v3 auth)**.

You can test your API key with:

```bash
curl "https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_KEY"
```

A successful request returns JSON containing a `results` array.

## Getting Started

### Prerequisites

* Node.js 18 or newer
* npm
* A TMDb API key

### Installation

```bash
git clone https://github.com/surangaprabash/cinescope-movie-explorer.git
cd cinescope-movie-explorer
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_key_here
```

Create React App requires the `REACT_APP_` prefix for custom environment variables.

After changing the `.env` file, restart the development server.

### Run the App

```bash
npm start
```

The application will run at:

```text
http://localhost:3000
```

Use the demo credentials above to log in.

## Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm start`     | Start the development server |
| `npm run build` | Create a production build    |
| `npm test`      | Run tests                    |

## Project Structure

```text
src/
├── api/
│   └── tmdb.js                # Axios instance and TMDb API requests
├── components/
│   ├── common/                # Reusable common components
│   ├── layout/                # Navbar and theme controls
│   └── movies/                # Movie-related components
├── context/                   # React Context providers
├── hooks/                     # Custom React hooks
├── pages/                     # Application pages
├── routes/
│   └── ProtectedRoute.jsx     # Protects authenticated routes
├── utils/
│   └── helpers.js             # Utility functions
├── App.js
├── index.css
└── index.js
```

## API Layer

All TMDb requests are handled through the shared Axios client in:

```text
src/api/tmdb.js
```

| Function              | TMDb Endpoint          | Purpose                         |
| --------------------- | ---------------------- | ------------------------------- |
| `getTrending()`       | `/trending/movie/week` | Weekly trending movies          |
| `searchMovies()`      | `/search/movie`        | Search movies                   |
| `discoverMovies()`    | `/discover/movie`      | Browse and filter movies        |
| `getGenres()`         | `/genre/movie/list`    | Movie genres                    |
| `getMovieDetails(id)` | `/movie/{id}`          | Movie details, cast, and videos |

Movie details use TMDb's `append_to_response` feature to retrieve cast and video information together.

## State Management

CineScope uses React Context API for shared application state.

### ThemeContext

Manages the current light/dark theme and saves the preference in `localStorage`.

### AuthContext

Manages the demo login state. Since there is no backend authentication, only the demo user's login state is stored.

### FavoritesContext

Manages favorite movies and stores them in `localStorage`.

### MovieContext

Manages movie-related state such as search, filters, results, and pagination.

## Search and Movie Discovery

The application uses two main TMDb endpoints:

* `/search/movie` for movie title searches
* `/discover/movie` for browsing and filtering movies

Search input uses a debounce delay to avoid sending an API request for every keystroke.

## Error Handling

API errors are converted into simple messages before being displayed to the user.

| Situation        | Message                                                        |
| ---------------- | -------------------------------------------------------------- |
| Timeout          | The request took too long. Please try again.                   |
| Connection error | Can't reach the movie service. Check your internet connection. |
| 401              | The movie service rejected our API key.                        |
| 404              | We couldn't find what you were looking for.                    |
| 429              | Too many requests. Please wait a moment and try again.         |
| 5xx              | The movie service is having problems. Try again shortly.       |

## Security Notes

* React automatically escapes rendered API content.
* Raw Axios errors are not displayed directly in the UI.
* Movie IDs are validated before being used in requests.
* Search values are handled through Axios request parameters.
* Trailer URLs use YouTube's privacy-enhanced domain.
* `localStorage` values are validated when read.
* `.env` is excluded from Git using `.gitignore`.
* `.env.example` can be committed without exposing the actual API key.

### Important

The TMDb API key is used by the React frontend, so a `REACT_APP_` environment variable is included in the browser build and **cannot be considered a secret**.

For a production application requiring a private API key, TMDb requests should be handled through a backend or server-side proxy.

## Deployment

### Vercel

1. Import the repository into Vercel.
2. Add the following environment variable:

```text
REACT_APP_TMDB_API_KEY=your_tmdb_key
```

3. Select the appropriate deployment environment.
4. Deploy the project.

After changing an environment variable, create a new deployment so the React application is rebuilt with the updated value.

## Future Improvements

* Backend API proxy
* Real authentication
* Unit and integration tests
* Watchlist functionality
* Personal movie ratings
* More advanced movie filters

## Credits

This product uses the TMDb API but is not endorsed or certified by TMDb.

## Author

**Suranga Prabash**
GitHub   : [https://github.com/surangaprabash](https://github.com/surangaprabash)
LinkedIn : [https://linkedin.com/in/surangaprabash](https://www.linkedin.com/in/surangaprabash/)
