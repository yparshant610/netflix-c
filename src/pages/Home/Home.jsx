import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import daredevil_banner from '../../assets/Daredevil_banner.jpg'
import daredevil_title from '../../assets/daredevil_title1.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'



const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <div className="daredevil">
          <img src={daredevil_banner} alt="" className='banner-img'/>
          <div className="daredevil-caption">
            <img src={daredevil_title} alt="" className='caption-img'/>
            <p>Blinded in a childhood accident, attorney-at-law Matt Murdock protects Hell’s 
              Kitchen as the masked vigilante, Daredevil.</p>
            <div className="daredevil-btns">
              <button className='btn'><img src={play_icon} alt="" />Play</button>
              <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
            </div>
            <TitleCards/>
          </div>
        </div>
        <div className="more-cards">
          <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
          <TitleCards title={"Only on Netflix"} category={"popular"}/>
          <TitleCards title={"Upcoming"} category={"upcoming"}/>
          <TitleCards title={"Top Pics for You"} category={"now_playing"}/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home