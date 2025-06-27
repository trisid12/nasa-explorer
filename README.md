
# NASA Explorer 🚀

A full-stack web application that visualizes real-time data on near-Earth asteroids using NASA’s public APIs. This project was built as part of a graduate software engineering coding challenge with a focus on usability, interactivity, clean architecture, and performance.

---

## 🌟 Features

- Visualizes asteroid data from NASA’s NEO (Near-Earth Object) API
- Interactive filters: date range (max 7 days), name search, and hazardous toggle
- Dynamic charts for asteroid size, speed, and miss distance (Top 10)
- Smart “AI-style” summary insights (e.g. largest, fastest, most dangerous asteroid)
- NASA Astronomy Picture of the Day (APOD) displayed with image and explanation
- Responsive layout for mobile and desktop
- Graceful error handling for edge cases and API/network failures
- Frontend and backend testing included
- Performance optimizations with memoization and lazy loading

---

## 🧰 Tech Stack

- **Frontend**: React, Chart.js, Axios, React Testing Library
- **Backend**: Node.js, Express, Axios, Jest, Supertest
- **External APIs**: [NASA NEO Feed](https://api.nasa.gov), [NASA APOD](https://api.nasa.gov)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nasa-explorer.git
cd nasa-explorer
```

---

### 2. Setup and Run the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```
NASA_API_KEY=your_real_nasa_api_key_here
```

Then start the backend server:

```bash
node server.js
```

> This will run the backend on `http://localhost:5000`

---

### 3. Setup and Run the Frontend

```bash
cd ../frontend
npm install
npm start
```

> This will run the frontend on `http://localhost:3000`

---

## ✅ Running Tests

### Frontend tests

```bash
cd frontend
npm test
```

### Backend tests

```bash
cd backend
npm test
```

---

## 📁 Project Structure

```
nasa-explorer/
├── backend/         # Express API (asteroids + APOD)
│   ├── routes/
│   └── server.js
│   └── .env
├── frontend/        # React app (components, charts, filters)
│   ├── src/
│   │   └── components/
│   ├── App.js, App.css
│   └── ...
└── README.md
```

---

## 🔍 Key Implementation Notes

- NASA APOD API responses are cached for 1 hour to avoid hitting rate limits (429)
- Date validation ensures the user selects a max 7-day range (as per NASA API limitation)
- Insight summaries are generated on the frontend without additional AI APIs
- Component-based structure with reusable logic and clean state management
- Mobile responsive and keyboard-accessible UI

---

## 🧠 Bonus Features Implemented

- [x] Filters & search bar
- [x] Responsive design
- [x] AI-style asteroid summary
- [x] NASA APOD image integration
- [x] Performance optimization (`useMemo`, lazy loading)
- [x] Frontend and backend testing

---

## 👤 Author

**Siddant Tripathi**  
📧 Email available upon request  
🔗 [LinkedIn](https://www.linkedin.com/in/your-link) · [GitHub](https://github.com/your-username)

---

Thanks for reviewing this submission!
