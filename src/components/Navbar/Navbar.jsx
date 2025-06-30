import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef();
  const searchRef = useRef();
  const navigate =useNavigate();

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={navRef} className={`navbar ${isScrolled ? 'nav-dark' : ''}`}>
      <div className="navbar-left">
        <img src={logo} alt="logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/category/TV Show">TV Show</Link></li>
          <li><Link to="/category/Movies">Movies</Link></li>
          <li><Link to="/category/New & Popular">New & Popular</Link></li>
          <li><Link to="/category/My List">My List</Link></li>
          <li><Link to="/category/Browse by Languages">Browse by Languages</Link></li>
        </ul>

      </div>

      <div className="navbar-right">
        <div
          ref={searchRef}
          className={`search-wrapper ${searchActive ? 'active' : ''}`}
        >
          <img
            src={search_icon}
            alt="search"
            className="icons search-icon"
            onClick={() => setSearchActive(true)}
          />
          <input
            type="text"
            className="search-input"
            placeholder="Titles, people, genres"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            onKeyDown={handleSearchSubmit}
          />
        </div>

        <p>Children</p>
        <img src={bell_icon} alt="notifications" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="profile" className="icprofile" />
          <img src={caret_icon} alt="dropdown" />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
