function AsteroidCard({ asteroid }) {
  return (
    <div>
      <h2>{asteroid.name}</h2>
      {asteroid.is_potentially_hazardous_asteroid && (
        <p>Potentially Hazardous</p>
      )}
    </div>
  );
}

export default AsteroidCard;
