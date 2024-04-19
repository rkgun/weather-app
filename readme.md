# Weather Application

This is a weather application that provides current weather information for cities using data from OpenWeatherMap. The application is developed with Vue.js for the frontend, Node.js and Express for the backend, and SQLite3 with Sequelize for the database. It also utilizes Tailwind CSS for styling and Mapbox for displaying maps.

## Installation

To use this application, follow these steps:

1. Clone this repository to your local machine:

git clone https://github.com/rkgun/weather-app.git

2. Navigate to the `frontend` directory and install dependencies:

```cd frontend```
```npm install```

3. Navigate to the `backend` directory and install dependencies:

```cd backend```
```npm install```

## Usage

1. Start the backend server:

```cd backend```
```node server```

2. Start the frontend Vue application:

```cd frontend```
```npm run dev```

3. Open your browser and start using the application

## Dependencies

### Frontend
- [Vue.js Documentation](https://vuejs.org/): JavaScript framework for building user interfaces
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)Tailwind CSS: Utility-first CSS framework
- Axios: Promise-based HTTP client for making requests to the backend
- [OpenWeatherMap API Documentation](https://openweathermap.org/api): Provides weather data for cities
- Mapbox: Platform for displaying maps

### Backend
- Node.js: JavaScript runtime environment
- Express: Web application framework for Node.js
- SQLite3: Embedded SQL database engine
- Sequelize: Promise-based ORM for Node.js
- Axios: Promise-based HTTP client for making requests to the OpenWeatherMap API