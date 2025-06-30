import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import daredevil_banner from '../../assets/Daredevil_banner.jpg';
import daredevil_video from '../../assets/daredevil_trailer.mp4';
import daredevil_title from '../../assets/daredevil_title1.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const cardsRef = useRef(null);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = cardsRef.current?.offsetTop;
      if (window.scrollY >= triggerPoint / 2) {
        const video = videoRef.current;
        if (video && !video.muted) {
          video.muted = true;
          setIsMuted(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const handleMoreInfo = (movieData) => {
    setSelectedMovie(movieData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <div className='home'>
      <Navbar />
      <div className="daredevil">
        {!showVideo ? (
          <img src={daredevil_banner} alt="" className="banner-img" />
        ) : (
          <>
            <video
              ref={videoRef}
              className="banner-video"
              src={daredevil_video}
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
            <button className="volume-btn" onClick={toggleMute}>
              {isMuted ? '🔇' : '🔊'}
            </button>
          </>
        )}

        <div className="daredevil-caption">
          <img src={daredevil_title} alt="" className="caption-img" />
          <p>
            Blinded in a childhood accident, attorney-at-law Matt Murdock protects Hell’s
            Kitchen as the masked vigilante, Daredevil.
          </p>
          <div className="daredevil-btns">
            <button className="btn" onClick={() => navigate('/player/jAy6NJ_D5vU')}>
              <img src={play_icon} alt="" />
              Play
            </button>
            <button
              className="btn dark-btn"
              onClick={() =>
                handleMoreInfo({
                  title: 'Daredevil',
                  description:
                    'Blinded in a childhood accident, attorney-at-law Matt Murdock protects Hell’s Kitchen as the masked vigilante, Daredevil.',
                  video: daredevil_video,
                })
              }
            >
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
        </div>
      </div>

      <TitleCards title={'Popular on Netflix'} category={'now_playing'} customClass="padded-cards" />

      <div className="more-cards" ref={cardsRef}>
        <TitleCards title={'Blockbuster Movies'} category={'top_rated'} />
        <TitleCards title={'Only on Netflix'} category={'popular'} />
        <TitleCards title={'Upcoming'} category={'upcoming'} />
        <TitleCards title={'Top Picks for You'} category={'now_playing'} />
      </div>

      <Footer />

      {showModal && selectedMovie && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>✖</button>

            <video
              className="modal-video"
              src={selectedMovie.video}
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="modal-details">
              <h2>{selectedMovie.title}</h2>
              <p>{selectedMovie.description}</p>
              <div className="modal-actions">
                <button className="modal-play-btn" onClick={() => {
                  handleCloseModal();
                  navigate('/player/jAy6NJ_D5vU');
                }}>
                    <span>▶</span> Play
                </button>

                <button className="modal-list-btn">
                  <span>➕</span> My List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
