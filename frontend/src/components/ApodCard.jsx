import { useEffect, useState } from 'react';
import axios from 'axios';

function ApodCard() {
  const [apod, setApod] = useState(null);
  const [error, setError] = useState("");
  const [showFullText, setShowFullText] = useState(false);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/api/apod`)
      .then((res) => setApod(res.data))
      .catch(() => setError("Failed to load the NASA Picture of the Day."));
  }, [baseURL]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!apod) return <p>🌌 Loading space image...</p>;

  return (
    <div className="apod-card">
      <h2>📸 NASA Picture of the Day</h2>
      <h3>{apod.title}</h3>
      {apod.media_type === "image" ? (
        <img src={apod.url} alt={apod.title} className="apod-img" />
      ) : (
        <iframe src={apod.url} title="NASA Video" className="apod-img" />
      )}

      <p className={`apod-text ${showFullText ? "expanded" : ""}`}>
        {apod.explanation}
      </p>

      {apod.explanation.length > 300 && (
        <button
          className="apod-toggle"
          onClick={() => setShowFullText((prev) => !prev)}
        >
          {showFullText ? "Show Less ▲" : "Show More ▼"}
        </button>
      )}
    </div>
  );
}

export default ApodCard;
