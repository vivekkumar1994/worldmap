import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON,Marker, Popup} from 'react-leaflet';
import axios from 'axios';
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import {BiCurrentLocation} from "react-icons/bi";
import countries from "../country.json"



function BasicMap() {
    const [countryDetails, setCountryDetails] = useState("");
    const [setdisplaydata,setdata] = useState([])
    const [center,setcenter] = useState({lat:28.644800,lng:77.216721});
    const maprif = useRef()
    const markericons = new L.Icon({
      iconUrl:require("../img/download.png"),
      iconSize:[35,40],
      iconAnchor:[17,40],
      popupAnchor:[0,-46]
    });


    
  
    const handleCountryClick = async (e) => {
      // const countryCode = e.target.feature.properties.iso_a2;
      try {
        const response = await axios.get(`https://api.maptiler.com/maps/basic-v2/style.json?key=mtT8xk8Di0DPMvpJoEHf`);
      
        console.log(response.data);
       
      } catch (error) {
        console.error(error);
      }
    };
    
    return (
    <div style={{display:"flex",margin:"auto",width:"80%",height:"80%"}}>
        <MapContainer center={center} zoom={2} ref={maprif} style={{ height: '100vh', width: '100%' }}>
          <TileLayer url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=mtT8xk8Di0DPMvpJoEHf'}  attribution={'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'}/>
     
          {
            countries.map((result,id) =>(
              <Marker position={[result.lat,result.lng,result.country]}  icon={markericons} key={id}>
                
       
       
              <Popup>
                <b>
                  <div>

                   <span style={{color:"blue", margin:"10px"}}>country</span> <p>{result.country}</p>
                   <span style={{color:"blue", margin:"10px"}}>capital</span><p>{result.capital}</p>
                   <span style={{color:"blue", margin:"10px"}}>population</span> <p>{result.population}</p>
                    <span style={{color:"blue", margin:"10px"}}>currency</span><p>{result.currency}</p>
                    <span style={{color:"blue", margin:"10px"}}>language</span><p>{result.language}</p>
                   
                  </div>
                </b>
              </Popup>
           </Marker>
            ))
          }
          
       
        </MapContainer>
      
        </div>
      );
    }

    export default BasicMap;