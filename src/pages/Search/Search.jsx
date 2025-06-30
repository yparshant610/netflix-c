import React, { useEffect, useState } from 'react';
import './Search.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const TMDB_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

  useEffect(() => {
    if (!query) return;

    // Fetch results
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization: `${TMDB_TOKEN}`,
          accept: 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setResults(data.results || []));

    // Fetch keywords
    fetch(`https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`, {
      headers: {
        Authorization: `${TMDB_TOKEN}`,
        accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setKeywords(data.results || []));
  }, [query]);

  const handleKeywordClick = (keyword) => {
    navigate(`/search?q=${keyword}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="search-page">
      <button className="back-button" onClick={handleBack}>← Back to Home</button>
      <h2>More to explore:</h2>

      <div className="keyword-tags">
        {keywords.map((kw) => (
          <span
            key={kw.id}
            className="keyword-tag"
            onClick={() => handleKeywordClick(kw.name)}
          >
            {kw.name}
          </span>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="no-results">No results found for "{query}".</p>
      ) : (
        <div className="search-grid">
          {results.map((item) => {
            const title = item.title || item.name;
            const image = item.poster_path || item.backdrop_path;
            return (
              image && (
                <div key={item.id} className="search-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${image}`}
                    alt={title}
                  />
                  <p>{title}</p>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
