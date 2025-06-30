import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TitleCards = ({ title, category, customClass }) => {
  const [apiData, setApiData] = useState([]);
  const wrapperRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_TMDB_BEARER_TOKEN
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    wrapperRef.current.scrollLeft += event.deltaY;
  };

  const scroll = (direction) => {
    const distance = 400;
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft += direction === 'left' ? -distance : distance;
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category || 'now_playing'}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    if (wrapperRef.current) {
      wrapperRef.current.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title || 'Popular on Netflix'}</h2>
      <div className="scroll-container">
        <button className="scroll-btn left" onClick={() => scroll('left')}>
          <ChevronLeft size={32} />
        </button>

        <div className="card-wrapper" ref={wrapperRef}>
          <div className={`card-list ${customClass || ''}`}>
            {apiData.map((card, index) => (
              <Link to={`/player/${card.id}`} className="card" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.original_title}
                />
                <p>{card.original_title}</p>
              </Link>
            ))}
          </div>
        </div>

        <button className="scroll-btn right" onClick={() => scroll('right')}>
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default TitleCards;
