import React, { Fragment, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { UseRides } from '../../Context/Rides.Context'
import { useUser } from '../../Context/User.context'
import RideDetails from '../Ride/RideDetails'
import style from '../RidesContainer/RidesContainer.module.css'
import axios from 'axios';
import * as BsIcons from 'react-icons/bs'
export default function RidesContainer() {
  const {user} = useUser()
  const [rides,setRides] = useState([])
  const [sortedRides,setSortedRides] = useState([])
  const [pastRidesNo,setPastRidesNo] = useState(0)
  const [filterClicked,setFilterClicked] = useState(true)
  const [selectedTab,setSelectedTab] = useState({
    nearestRides:true,
    upcomingRides:false,
    pastRides:false
  })
  const getAllRides = async()=>{
    const {data} = await axios.get("https://assessment.api.vweb.app/rides");
    setRides(data);
    setSortedRides(data)
    sortRidesHandler()
}
  let targetStationCode = user.station_code;
  const sortStations = (target,arr,val)=>{
    let min = 0;
    arr.sort((a,b)=>{
        return a-b;
    })
    for(let i = 0;i<arr.length;i++){
        if(arr[i]==target)
        {
            min = Math.abs(target - arr[i]); 
            val.minimum = min;
            // setSortedRides([...rides,{val}])
            break;
        }
        else if(arr[i]<target && arr[i+1]>target)
        {
            if(Math.abs(target - arr[i]) >= Math.abs(target - arr[i+1]))
            {
                min = Math.abs(target-arr[i+1]);
                val.minimum = min;
            }
            else
            {
                min = Math.abs(target-arr[i]);
                val.minimum = min;
            }
            break;
        }
        else if(arr[i]>target){
          min = Math.abs(target-arr[i]);
          val.minimum = min;
          break;
        }
    }
}
  const sortRidesHandler = ()=>{
    rides.map((val)=>{
      return sortStations(targetStationCode,val.station_path,val)
    })
   rides.sort((a,b)=>{
   return a.minimum - b.minimum;
    })
    setSortedRides(rides)
    console.log(sortedRides)
  }
  const getUpcomingRides = ()=>{
    const currentDate = new Date();
    const upcomingRides = rides.filter((element)=>{
       let d = new Date(element.date)
       return d.getMonth()>=currentDate.getMonth() && d.getDate()>currentDate.getDate()
    })
    console.log(upcomingRides)
    setSortedRides(upcomingRides)
  }
  const getPastRides = ()=>{
    const currentDate = new Date();
    const pastRides = rides.filter((element)=>{
       let d = new Date(element.date)
       return d.getMonth()<=currentDate.getMonth() && d.getDate()<currentDate.getDate()
    })
    console.log(pastRides)
    setPastRidesNo(pastRides.length)
    setSortedRides(pastRides)
  }
  useEffect(()=>{
    getAllRides()
  },[])
  const filterByStateHandler = (state)=>{
    const x = rides.filter((element)=>{
      return element.state == state 
    })
    setSortedRides(x)
    console.log(sortedRides)
    console.log(x)
  }
  return <Fragment>
      <Container className={style.ridesContainer}>
        <div className={style.navigators}>
          <div className={style.tabs}>
          <p className='text-white' onClick={sortRidesHandler}>Nearest Rides</p>
        <p className='text-white' onClick={getUpcomingRides}>Upcoming Rides</p>
        <p className='text-white' onClick={getPastRides}>Past Rides</p>
        <p className={'text-white '+style.filter}><BsIcons.BsFilterLeft size={32} onClick = {()=>setFilterClicked(!filterClicked)}/>Filter</p>
        <div className={filterClicked?style.filters:'d-none'}>
          <p className='text-white'>Filters</p>
          <select name="" id="" className='mb-3' onChange={(e)=>{
              filterByStateHandler(e.target.value)
            }}>
            <option value="0">State</option>
            {rides.map((element)=><option value = {element.state}>{element.state}</option>)}
          </select>
        </div>
        </div>

        {sortedRides.map((val,index)=>{
          return <RideDetails id = {val.id} 
          stationPath = {JSON.stringify(val.station_path)}
          originStation = {val.origin_station_code}
          date = {val.date}
          key = {index}
          distance = {val.minimum}
          city = {val.city}
          state = {val.state}/>
        })}
        </div>
      </Container>
  </Fragment>

}
