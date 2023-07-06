import Loader from './components/Loader'
import Background from './components/Background'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [style, setStyle] = useState(true)
  const [loader, getLoader] = useState(true)
  const [data, setData] = useState({})
  const [temp,changeTemp] = useState(true)
  useEffect(()=>{
    const movil={enebleHighAccuracy:true,timeout:10000,maximumAge:30000}
    navigator.geolocation.getCurrentPosition(getPosition,errorPetion,movil) 

  },[])

  const getPosition= (position)=>{

    const coords = position.coords
    const latitude = coords.latitude
    const longitude = coords.longitude
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b5074e7e8f29d9ee3bdb613b889d71a1&lang=es`
    axios
    .get(url)
    .then((res)=>{
      console.log(data)
      setData(res.data)
    })
    .catch((error)=>alert("hubo un error: "+error ))
    .finally(()=>getLoader(false))
  }
  function errorPetion(){
    alert("hubo un error al encontrar tu ubicacion")
  }
  
  return (
    <>
      <section className='total__container'>
        {loader&&<Loader/>}
        <Background style={style?"#D5F3FF 0%, #51B4E8 100%":"#53388f 0%, #2f2958 100%"}/>
        <div className='top__bar'>
          <h1>Weather app</h1>
          <button onClick={()=>setStyle(!style)} className={style?'desing dark top':'desing light top'}>{style?"Dark":"Light"}</button>
        </div>
        <article className={style?'container background__light':'container background__dark'}>
          <div className='top__container'>
              <h2>{temp?(data.main?.temp - 273.15).toFixed():((data.main?.temp * 9/5) - 459.67).toFixed()}{temp?"°C":"°F"}</h2>
              <img src={!loader?`/${data.weather[0]?.icon}.svg`:""} alt="" />
          </div>
          <div className='mid__container'>
            <h4>viento: {data.wind?.speed}m/s</h4>
            <h4>nubes: {data.clouds?.all}%</h4>
            <h4>Presion: {data.main?.pressure}hPa</h4>
          </div>
          
          <div className='bot__container'>
            <h2>{data.name}</h2>
            <h3>clima: {data.weather?.[0].description}</h3>
          </div>
          
       </article>
        <button onClick={()=>changeTemp(!temp)} className={style?'desing light bottom':'desing dark bottom'}>{temp?"Cambiar a °F":"Cambiar a °C"}</button>
      </section>
    </>
  )
}

export default App
