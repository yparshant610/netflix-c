import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODc0ZDdhZDBlOWZhY2FhNmJjMGI5MzMzYjI1NTUyZSIsIm5iZiI6MTc1MDk1ODQ2NC4yNTIsInN1YiI6IjY4NWQ4MTgwZDdiNDU4MTcyYTdlY2I5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RwrT2sM6ToWgh__Kfjt8iznyDbWhXAYCWh_amaxRju8'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));

  },[])
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}
       title='trailer' frameborder="0" allowFullScreen></iframe>
       <div className="player-info">
        <p>{apiData?.published_at?.slice(0, 10) || "Unknown date"}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
       </div>
        
    </div>
  )
}

export default Player