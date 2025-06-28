
function AsteroidInsights({ asteroids }) {
  if (!asteroids || asteroids.length === 0) return null;

  const largest = [...asteroids].sort(
    (a, b) =>
      b.estimated_diameter.kilometers.estimated_diameter_max -
      a.estimated_diameter.kilometers.estimated_diameter_max
  )[0];

  const fastest = [...asteroids].sort(
    (a, b) =>
      parseFloat(b.close_approach_data[0].relative_velocity.kilometers_per_hour) -
      parseFloat(a.close_approach_data[0].relative_velocity.kilometers_per_hour)
  )[0];

  const hazardousCount = asteroids.filter((a) => a.is_potentially_hazardous_asteroid).length;

  return (
    <div className="insights-card">
      <h3>🤖 AI Insights</h3>
      <p>🪨 Largest: <strong>{largest.name}</strong> at {largest.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km wide</p>
      <p>🚀 Fastest: <strong>{fastest.name}</strong> at {parseFloat(fastest.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString()} km/h</p>
      <p>⚠️ Hazardous: <strong>{hazardousCount}</strong> out of <strong>{asteroids.length}</strong> asteroids are potentially hazardous</p>
    </div>
  );
}

export default AsteroidInsights;
