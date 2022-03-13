import React, { Fragment } from 'react'
import img from '../../Images/aa799fab158dcc9a6ade3b1f44df47ad.png'
import style from '../Ride/RideDetails.module.css'
export default function RideDetails({id,stationPath,originStation,date,distance}) {
  return <Fragment>
      <div className="rideContainer container">
          <div className={"row "+style.row}>
              <div className="col">
                  <img src={img}  className = {"img-fluid "+style.mapImg}alt="" />
            </div>
            <div className={"col-8 "+style.rideDetails}>
                <p>Ride Id : {id}</p>
                <p>Origin Station : {originStation}</p>
                <p>station_path: {stationPath}</p>
                <p>Date : {date}</p>
                <p>Distance : {distance}</p>
            </div>
        </div>
    </div>
  </Fragment>
}
