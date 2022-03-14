import React, { Fragment } from 'react'
import img from '../../Images/aa799fab158dcc9a6ade3b1f44df47ad.png'
import style from '../Ride/RideDetails.module.css'
export default function RideDetails({id,stationPath,originStation,date,distance,state,city}) {
  return <Fragment>
      <div className="rideContainer container">
          <div className={style.row}>
              <div>
                  <img src={img}  className = {"img-fluid "+style.mapImg}alt="" />
            </div>
            <div className={style.rideDetails}>
                <p>Ride Id : {id}</p>
                <p>Origin Station : {originStation}</p>
                <p>station_path: {stationPath}</p>
                <p>Date : {date}</p>
                <p>Distance : {distance}</p>
            </div>
            <div className={style.stateCity}>
                <span>{state}</span>
                <span>{city}</span>
            </div>
        </div>
    </div>
  </Fragment>
}
