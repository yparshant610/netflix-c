import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-icons">
          <a href="https://www.youtube.com/@41_parshantyadav59" target="_blank">
            <img src={youtube_icon} alt="" />
          </a>
          <a href="https://www.instagram.com/pras_hant610?igsh=M2ozbGdzaWJ6NDV4" target="_blank">
            <img src={instagram_icon} alt="" />
          </a>
          <a href="https://x.com/Parshant4169569?s=09" target="_blank">
            <img src={twitter_icon} alt="" />
          </a>
          <a href="https://www.facebook.com/share/1G3LqABCX9/" target="_blank">
            <img src={facebook_icon} alt="" />
          </a>
        </div>
        <ul>
          <li>Audio Description</li>
          <li>Help Center</li>
          <li>Gift Cards</li>
          <li>Media Center</li>
          <li>Investor Relations</li>
          <li>Jobs</li>
          <li>Terms of Use</li>
          <li>Privacy</li>
          <li>Legal Notices</li>
          <li>Cookie Preferences</li>
          <li>Corporate Information</li>
          <li>Contact Us</li>
        </ul>
        <p className='copyright-text'>© 1997 - 2025 Netflix, Inc.</p>
    </div>
  )
}

export default Footer