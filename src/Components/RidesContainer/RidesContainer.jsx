import React, { Fragment, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { UseRides } from '../../Context/Rides.Context'
import { useUser } from '../../Context/User.context'
import RideDetails from '../Ride/RideDetails'
import style from '../RidesContainer/RidesContainer.module.css'
export default function RidesContainer() {
  const {user} = useUser()
  const {rides} = UseRides()
  return <Fragment>
      <Container className={style.ridesContainer}>
        <div className={style.navigators}>
        <h3 className='text-white'>Nearest Rides</h3>
        {rides.map((val,index)=>{
          return <RideDetails id = {val.id} 
          stationPath = {JSON.stringify(val.station_path)}
          originStation = {val.origin_station_code}
          date = {val.date}
          key = {index}
          distance = {val.minimum}/>
        })}
        </div>
      </Container>
  </Fragment>

}
