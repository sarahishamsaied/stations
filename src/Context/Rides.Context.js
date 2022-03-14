import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './User.context';
const RidesContext = createContext()
export function RidesContextProvider({children}) {
    const [rides,setRides] = useState([]);
    const {user} = useUser()
    const getAllRides = async()=>{
        await axios.get("https://assessment.api.vweb.app/rides").then((resp)=>{
            console.log(resp)
            setRides(resp.data);
            sortRidesHandler()
            console.log(rides)
        });

    }
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
                console.log(`${target} - ${arr[i]} = ${Math.abs(target-arr[i])}`)
            }
            else if(arr[i]<target && arr[i+1]>target)
            {
                if(Math.abs(target - arr[i]) >= Math.abs(target - arr[i+1]))
                {
                    min = Math.abs(target-arr[i+1]);
                    val.minimum = min;
                    console.log(`${target} - ${arr[i]} = ${Math.abs(target-arr[i])}`)
                }
                else
                {
                    min = Math.abs(target-arr[i]);
                    val.minimum = min;
                    console.log(`${target} - ${arr[i]} = ${Math.abs(target-arr[i])}`)
                }
            }
            else if(arr[i]>target){
              min = Math.abs(target-arr[i]);
              val.minimum = min;
              console.log(`${target} - ${arr[i]} = ${Math.abs(target-arr[i])}`)
    
            }
        }
    }
    const sortRidesHandler = ()=>{
        rides.map((val)=>{
          return sortStations(user.station_code,val.station_path,val)
        })
       rides.sort((a,b)=>{
       return a.minimum - b.minimum;
        })
        setRides(rides)
        console.log(rides)
      }
    useEffect(()=>{
        getAllRides()
    },[])
  return <RidesContext.Provider value={{rides,getAllRides,sortStations,sortRidesHandler}}>
      {children}
  </RidesContext.Provider>
}
export const UseRides = ()=>{
    return useContext(RidesContext)
}
