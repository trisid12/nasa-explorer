import { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css";
import axios from "axios";
import AsteroidChart from "./components/AsteroidChart";
import AsteroidInsights from "./components/AsteroidInsights";
import ApodCard from "./components/ApodCard";


function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("2024-06-18");
  const [endDate, setEndDate] = useState("2024-06-20");
  const [error, setError] = useState("");
  const [showHazardousOnly, setShowHazardousOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  
    const fetchAsteroids = useCallback(async () => {
      setError("");
      setAsteroids([]);               //clear old asteroid data
 
      const start = new Date(startDate);
      const end = new Date(endDate);
      const today = new Date();

      //check if start date is after end date
      if(start > end){
        setError("Start date cannot be after end date..");
        return;
      }

      //check Future date
      if(start > today || end > today){
        setError("Dates cannot be in future..");
        return;
      }

      const dayDiff = (end - start) / (1000 * 60 * 60 * 24);
      if(dayDiff > 7){
        setError("Date range must be 7 days or less (NASA API LIMIT)..");
        return;
      }
      

      //proceed with fetch
      
      setLoading(true);

      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/asteroids?start_date=${startDate}&end_date=${endDate}`);
        const allObjects = Object.values(res.data.near_earth_objects).flat();

        if (allObjects.length === 0) {
          setError("No asteroids found for the selected date range.");
          setAsteroids([]);
          return;
        }


        setAsteroids(allObjects);
      } catch (err) {
        setError("Something went wrong. Please check the date range and try again");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },  [startDate, endDate]);

    useEffect(() => {
      fetchAsteroids();  //fetch default on load
    }, [fetchAsteroids]);

    const topAsteroids = useMemo(() => {
      console.log("🔁 topAsteroids recalculated");
      return asteroids.slice(0, 10);
    }, [asteroids]);


  return (
    <div className="container">
      <h1>🌠 Near-Earth Asteroids</h1>

      <ApodCard />

      <div className="filter-bar">
        <label>
          Start Date: 
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
        </label>
        <label style={{marginLeft: "1rem"}}>
          <input
          type="checkbox"
          checked={showHazardousOnly}
          onChange={(e) => setShowHazardousOnly(e.target.checked)}
          />
          Hazardous Asteroids
        </label>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "0.4rem", minWidth: "160px" }}
        />
        <button onClick={fetchAsteroids}>Search</button>
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p style={{ color:"red"}}>{error}</p>
      ) : (
        <>
        {!loading && asteroids.length > 0 && (
          <div style={{ marginBottom: "3rem" }}>
          <h2>📊 Asteroid Size (Top 10)</h2>
          <AsteroidChart data={topAsteroids} type="size" />
          <h2>🚀 Speed (km/h)</h2>
          <AsteroidChart data={topAsteroids} type="speed" />
          
          <h2>🌍 Miss Distance (km)</h2>
          <AsteroidChart data={topAsteroids} type="miss" />
          </div>
        )}

        {asteroids.length > 0 && <AsteroidInsights asteroids={asteroids} />}


        <div className="asteroid-grid">
          {asteroids.filter((a) => (!showHazardousOnly || a.is_potentially_hazardous_asteroid) && a.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((asteroid) => (
            <div 
              key={asteroid.id}
              className={`asteroid-card ${asteroid.is_potentially_hazardous_asteroid ? "hazardous" : ""}` }
              >
                <h2>{asteroid.name}</h2>
                <p>
                  <strong>Size:</strong>{" "}
                  {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
                </p>
                <p>
                  <strong>Speed:</strong>{" "}
                  {parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0)} km/h
                </p>
                <p>
                  <strong>Miss Distance:</strong>{" "}
                  {parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()}km
                </p>
                {asteroid.is_potentially_hazardous_asteroid && (
                  <p className="warning"> Potentially Hazardous</p>
                )}
              </div>
          ))}
        </div>
      </>
      )}
    </div>
  );
}

export default App;
